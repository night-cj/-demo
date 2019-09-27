<template>
  <div class="base-table table-container" ref="tableContainer" :style="{height: $attrs.height}">
    <re-table :data="data" ref="eltable"
              :row-class-name="rowClassName"
              v-loading="loading"
              v-bind="tableBind"
              v-on="$listeners"
              @header-dragend="headerDragEnd"
              @drag-start="handleDragStart"
              @drag-end="handleDragEnd"
              @drag="handleDrag"
              @drag-enter="handleDragEnter"
              @drag-over="handleDragOver"
              @row-click="rowClick">
      <loop-column v-for="(tp, index) in typesColumns" :key="index" :col="tp.props" :type="tp.type">
        <template v-if="tp.type === 'expand'" slot="expand" slot-scope="props">
          <slot v-bind="props" name="expand"></slot>
        </template>
      </loop-column>
      <loop-column v-for="col in realColumns" :key="col.prop" :col="col"></loop-column>
      <template slot="append">
        <slot name="append"></slot>
        <div v-if="lazyRemote" class="loading-wrap">
          <i v-if="isLoadingData" class="el-icon-loading"></i>
          <span v-if="lazyTotal <= data.length" class="loading-wrap__message">没有更多数据了</span>
        </div>
      </template>
      <template slot="empty">
        <i class="cl-common- dj-common-Nodata"></i><span>暂无数据</span>
      </template>
    </re-table>
    <!--'scroll-hasY': isTableHasY ,-->
    <fixed-scrollbar v-if="fixedScrollbar" ref="fixedScrollbar" v-bind="$attrs"></fixed-scrollbar>
  </div>
</template>

<script>
  import elementMethods from './elementMethods';
  import dragPolicy from './dragPolicy';
  import { handleComponent } from '../../../../src/utils';
  const { dealDataSource, hasValue_arr, deepClone } = require('../../../methods/utils/methods');
  import { reTable } from './reTable/reTable';
  import fixedScrollbar from './fixedScrollbar/main.vue';
  import listenerPolicy from '../../../methods/mixins/listenerPolicy';
  import exportChildComponent from '../../../methods/mixins/exportChildComponent';
  import { columnsValidator, mergeColumnsValidator } from './formatCheck';
  import loopColumn from './loop-column/main';
  //生成树结构获取子节点的方法
  function remoteFactory(_promise, cb) {
    return (row, callback) => {
      if (_promise) {
        _promise(row).then((data) => {
          dealDataSource(data);
          callback(data);
          cb && cb();
        }).catch(() => {
          callback();
        });
      } else {
        callback();
      }
    };
  }

  const DEFAULT_BOOLEAN_KEYS = {
    'highlight-current-row': '',
    'fit': false
  };

  const TYPES = ['tree', 'selection', 'expand', 'index'];

  const TYPE_COLUMN_OPTION = {
    selection: {
      fixed: 'left',
      width: 55,
      reserveSelection: false
    },
    expand: {
      fixed: 'left',
      width: 48
    },
    index: {
      fixed: 'left',
      width: 80,
      label: '序号'
    },
    tree: {
      fixed: 'left',
      expandAll: false,
      treeKey: 'id',
      fileIcon: 'el-icon-document',
      levelKey: 'baseTable_level',
      childNumKey: 'child_num',
      folderIcon: '',
      // parentKey: 'parent_id',
      width: 48
    }
  };

  const COLUMN_KEY_MAP = {
    label: 'label',
    prop: 'prop'
  };

  export default {
    name: 'baseTable',
    provide() {
      return {
        djTable: this
      };
    },
    mixins: [elementMethods, listenerPolicy, exportChildComponent, dragPolicy],
    props: {
      borderWidth: {
        type: Number,
        default: 1
      },
      data: {
        type: Array,
        default: () => []
      },
      loading: {
        type: Boolean,
        default: false
      },
      pageNo: { // 当前页码 控制序号
        type: Number,
        default: 1
      },
      pageSize: { // 当前页数据最多展示数量 控制序号
        type: Number,
        default: 20
      },
      columns: {
        type: Array,
        default: () => [],
        validator: columnsValidator
      },
      columnType: Array,
      // 特殊列，自定义配置
      columnTypeProps: {
        type: Object,
        default: () => ({})
      },
      columnKeyMap: Object,
      columnsProps: Object,
      columnsSchema: Object,
      columnsHandler: Function,
      resizeObserver: {
        type: Boolean,
        default: true
      },
      lazyRemote: {
        type: Function
      },
      lazyTotal: {
        type: Number,
        default: 0
      },
      fixedScrollbar: {
        type: Boolean,
        default: false
      },
      mergeColumns: {
        type: Array,
        default: ()=>[],
        validator: mergeColumnsValidator
      }
    },
    components: {
      reTable,
      fixedScrollbar,
      loopColumn},
    data() {
      return {
        showColumns: [], // 计算完成后的每列的配置
        column_key_Map: {}, // 列键值对配置
        columnOptions: [], // 列的所有键值对
        minColunmWidth: 100,
        filteredColumn: [],
        isLoadingData: false //控制懒加载动画
      };
    },
    computed: {
      // 特殊功能列配置
      typesColumns() {
        const {columnType: type, columnTypeProps} = this;
        let typeColumns = [];
        if (Array.isArray(type)) {
          typeColumns = type.filter(it => ~TYPES.indexOf(it));
        }
        const map = columnTypeProps || {};
        return typeColumns.map(type => {
          let typeOption = map[type] || {};
          const _options = Object.assign(
            {},
            TYPE_COLUMN_OPTION[type],
            typeOption
          );
          if (type === 'tree') {
            // 重新判断是否需要'悬浮'横向滚动条
            _options.remote = remoteFactory(typeOption['remotePromise'], this.judgeScrollFixed);
          }
          if (type === 'selection' && typeColumns.includes('tree')) {
            _options.reserveSelection = true;
          }
          return {
            type,
            props: _options
          };
        });
      },
      // 处理 $attrs 里面 Boolean 类型的 prop 和统一 prop 命名
      tableBind() {
        return Object.assign({}, DEFAULT_BOOLEAN_KEYS, this.$attrs);
      },
      columnsMap() {
        return this.showColumns.reduce((map, col)=>{
          map[col.prop] = col;
          return map;
        }, {});
      },
      realColumns() {
        let _columns = [];
        let existMap = {};
        let mergeColumns = deepClone(this.mergeColumns, ['children']);
        let mergeColumnsMap = mergeColumns.reduce((map, col)=>{
          map[col.prop] = col;
          return map;
        }, {});
        let map = mergeColumns.reduce((_map, col = {})=>{
          if (!Array.isArray(col.children)) {
            col.children = [];
          }
          let props = col.merge || [];
          props.forEach(prop=>{
            _map[prop] = col;
            col.children.push(this.columnsMap[prop] || mergeColumnsMap[prop]);
          });
          return _map;
        }, {});
        this.showColumns.forEach(col=>{
          if (map[col.prop]) {
            let _col = map[col.prop];
            while (map[_col.prop] !== undefined) {
              _col = map[_col.prop];
            }
            if (!existMap[_col.prop]) {
              existMap[_col.prop] = true;
              _columns.push(_col);
            }
          } else {
            _columns.push(col);
          }
        });
        return _columns;
      }
    },
    methods: {
      //处理表头拉伸
      headerDragEnd() {
        var tableColumns = this.$refs.eltable.store.states.columns;
        this.columns.forEach(obj => {
          var tableColumn = tableColumns.filter(col => col.property === obj.prop)[0];
          tableColumn && (obj.width = tableColumn.width);
        });
        this.$emit('change-column');
        this.createScroll();
      },
      //清除树结构数据缓存
      clearTreeExpandedCache() {
        let table = this.$refs.eltable;
        if (table) {
          table.store.states._treeCachedExpanded = [];
          table.store.states._treeInitedExpanded = [];
          table.store.states._treeRowExpanded = [];
          table.store.states._treeRowLoading = [];
        }
      },
      // 设置初始选择值
      setInitColumn() {
        let _filteredColumn = [];
        // key值转换
        this.column_key_Map = Object.assign({}, COLUMN_KEY_MAP, this.columnKeyMap);
        for (let item of this.columns) {
          if (item.initialShow !== false && item[this.column_key_Map.prop]) {
            _filteredColumn.push(item[this.column_key_Map.prop]);
          }
        }
        this.filteredColumn = _filteredColumn;
        this.columnOptions = this.columns.map(item => {
          return {
            label: item[this.column_key_Map.label],
            prop: item[this.column_key_Map.prop]
          };
        });
        // return {_filteredColumn, map, _column};
      },
      renderNormalColumns: (() => {
        let tag = false;
        return function () {
          tag && this._renderNormalColumns();
          tag = true;
        };
      })(),
      _renderNormalColumns() {
        this.$nextTick(() => {
          let _tableContainer = this.$refs.tableContainer;
          if (_tableContainer) {
            const {
              columns,
              columnsHandler,
              filteredColumn,
              columnsProps: props,
              columnsSchema: schema
            } = this;
            // console.log('_renderNormalColumns() **** _tableContainer.clientWidth = ', _tableContainer.clientWidth);
            // 筛选要展示的列
            let _column = columns.filter(item => filteredColumn.includes(item[this.column_key_Map.prop]));
            let renderColumns = _column.map(col => {
              const mix = schema && schema[col[this.column_key_Map.label]] || {};
              const it = Object.assign({}, props, col, mix);
              it.label = it[this.column_key_Map.label];
              it.prop = it[this.column_key_Map.prop];
              it.component = handleComponent(it);
              return it;
            });
            let _tempColumns = columnsHandler && columnsHandler(renderColumns) || renderColumns;
            this.showColumns = this.calculateColumnsWidth(_tempColumns);
            this.createScroll();
          }
        });
      },
      // table计算列宽
      calculateColumnsWidth(_column) {
        let tableWidthMinWidth = 0;// 预测table最小宽度
        let typesColumnsWidth = 0; // 特殊列总宽度
        if (hasValue_arr(this.columnType)) {
          for (let key of this.columnType) {
            typesColumnsWidth += (Object.assign({}, TYPE_COLUMN_OPTION[key] || {}, this.columnTypeProps[key] || {})).width;
          }
        }
        //开启border属性时，需要减去一个border宽度的距离
        let borderWidth = this.tableBind.border ? this.borderWidth : 0;
        let { scrollY, gutterWidth} = this.$refs.eltable.layout;
        let containerWidth = this.$refs.eltable.$el.clientWidth - typesColumnsWidth - borderWidth - (scrollY ? gutterWidth : 0);
        for (let item of _column) {
          if (item.width && !isNaN(Number(item.width))) {
            item.width = Number(item.width);
            tableWidthMinWidth += item.width;
          } else {
            item.width = this.minColunmWidth;
            tableWidthMinWidth += this.minColunmWidth;
          }
        }
        if (containerWidth >= tableWidthMinWidth) {
          let length = _column.length;
          let averageWidth = Math.floor((containerWidth - tableWidthMinWidth) / length);// 平均增加宽度
          let extraWidth = (containerWidth - tableWidthMinWidth) % length; // 加上‘平均增加宽度’后剩下的宽度
          for (let item of _column) { //给每个字段补充宽度
            if (extraWidth !== 0) {
              item.width += averageWidth + 1;
              extraWidth--;
            } else {
              item.width += averageWidth;
            }
          }
        } else {
          for (let item of _column) {
            if (this.needSetColumn(item)) {
              item.width = 100 + '';
            }
          }
        }
        return _column;
      },
      // 判断是否需要重新设置列宽
      needSetColumn(data) {
        return data.width === 'auto' || !data.width;
      },
      // windowResize触发事件
      resize() {
        this.renderNormalColumns();
        this.$refs.eltable.layout.updateElsHeight();
      },
      resizeListener() {
        // this.addListener(window, 'resize', this.resize);
        this.resizeObserver && this.addListener(this.$refs.eltable.$el, 'resizeObserver', this.resize);
      },
      // 判断是否滚动到底
      judgeScrollBottom() {
        if (Math.abs(this.scrollContent.scrollTop + this.scrollContent.clientHeight - this.scrollContent.scrollHeight) < 5) {
          this.$emit('scroll-to-bottom');
          this.addLazyData();
        }
      },
      //新增懒加载数据
      addLazyData() {
        if (this.lazyRemote && !this.isLoadingData && this.lazyTotal > this.data.length) {
          this.isLoadingData = true;
          this.$nextTick(()=>this.$refs.eltable.layout.updateElsHeight());
          this.lazyRemote().then(res=>{
            this.data.push(...res);
          }).finally(()=>{
            this.isLoadingData = false;
            this.$nextTick(()=>this.$refs.eltable.layout.updateElsHeight());
          });
        }
      },
      // 重新判断是否需要'悬浮'横向滚动条
      judgeScrollFixed() {
        this.fixedScrollbar && this.$refs.fixedScrollbar.judgeScrollFixed();
      },
      // 更新'悬浮'横向滚动条
      createScroll() {
        this.fixedScrollbar && this.$refs.fixedScrollbar.createScroll();
      }
    },
    created() {
      this.setInitColumn();
    },
    activated() {
      this.resize();//解决被缓存的子页面在切换回来时table宽度缩水的问题
    },
    mounted() {
      this.$nextTick(() => {
        this.renderNormalColumns();
        if (this.$listeners['scroll-to-bottom'] || this.lazyRemote) {
          this.scrollContent = this.$refs.eltable.$refs.bodyWrapper;
          this.addListener(this.scrollContent, 'scroll', this.judgeScrollBottom);
          this.$nextTick(() => {
            this.judgeScrollBottom();
          });
        }
        this.resizeListener();
      });
    },
    watch: {
      columns: {
        immediate: true,
        handler: function () {
          // 列改变后重新设置列相关配置，重新渲染普通列
          this.setInitColumn();
          this.renderNormalColumns();
        }
      },
      data(val) {
        if (hasValue_arr(val)) {
          this.clearTreeExpandedCache();
          dealDataSource(val);
          // if (this.showScroll) {
          //   setTimeout(() => {
          //     this.renderNormalColumns();
          //   }, 0);
          // }
        }
        this.judgeScrollFixed();
      }
    }
  };
</script>
