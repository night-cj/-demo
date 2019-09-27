<template>
  <div class="dj-table-container" :style="{height: $attrs.height === '100%' ? $attrs.height : ''}">
    <div class="over-table clearfix">
      <div class="left-item fl"><slot name="btn"></slot></div>
      <div class="right-item fr">
        <dj-paging
          v-if="isNeedPage"
          :total="realTotal"
          :page-no="pageNo"
          :page-size="pageSize"
          :page-size-list="pageSizeList"
          @change-page="changePage"
          @change-size="changeSize"
        ></dj-paging>
      </div>
    </div>
    <div class="under-table">
      <set-button :default-filtered-column="filteredColumn"
                  :column-options="columnOptions"
                  :scroll-load="this.tableBind['scroll-load']"
                  @confirm-filter="confirmFilter"
                  @changeScrollLoad="changeScrollLoad"
      ></set-button>
      <base-table
        ref="baseTable"
        :data="staticData"
        v-bind="tableBind"
        v-on="$listeners"
        :columns="showColumns"
        @change-column="saveCacheColumns"
      ></base-table>
    </div>
  </div>
</template>

<script>
  const {getLocalStorageItem, setLocalStorageItem} = require('../../../methods/utils/methods');
  import exportChildComponent from '../../../methods/mixins/exportChildComponent';
  import setButton from './setButton';
  const COLUMN_KEY_MAP = {
    label: 'label',
    prop: 'prop'
  };
  const DEFAULT_PAGESIZE = 15;
  const DEFAULT_PAGENO = 1;
  export default {
    name: 'djTable',
    mixins: [exportChildComponent],
    props: {
      data: {
        type: Array,
        default: ()=>[]
      },
      total: {
        type: Number,
        default: 0
      },
      staticPaging: {
        type: Boolean,
        default: false
      },
      columnKeyMap: Object,
      columns: {
        type: Array,
        default: []
      },
      isCacheColumns: {
        type: Boolean,
        default: false
      },
      cacheColumnsName: {
        type: String,
        default: 'table'
      },
      // pageOption: {
      //   type: Object,
      //   default: {}
      // },
      pageSizeList: {
        type: Array
      },
      defaultPageSize: {
        type: Number,
        default: DEFAULT_PAGESIZE
      },
      isNeedPage: {
        type: Boolean,
        default: true
      },
      // defaultPageSize: {
      //   type: Number,
      //   default: DEFAULT_PAGESIZE
      // }
    },
    data() {
      return {
        pageNo: DEFAULT_PAGENO,
        pageSize: this.defaultPageSize || DEFAULT_PAGESIZE,
        filteredColumn: [],
        columnOptions: [],
        extraAttrs: {},
        staticData: [],
        staticTotal: 0
      };
    },
    computed: {
      realTotal() {
        return this.staticPaging ? this.staticTotal : this.total;
      },
      tableBind() {
        return Object.assign({}, {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          columnKeyMap: this.columnKeyMap
        }, this.$attrs, this.extraAttrs);
      },
      // pageSizeList() {
      //   return this.pageOption.pageSizeList;
      // },
      // total() {
      //   return this.pageOption.total || 0;
      // },
      column_key_Map() {
        return Object.assign({}, COLUMN_KEY_MAP, this.columnKeyMap);
      },
      showColumns() {
        return this.columns.filter(item => this.filteredColumn.includes(item[this.column_key_Map.prop]));
      }
    },
    created() {
      this.initOption();
      this.initStaticPaingOption();
    },
    methods: {
      initStaticPaingOption(){
        this.staticTotal = this.data.length;
        this.updateStaticData();
      },
      updateStaticData() {
        if (this.staticPaging) {
          this.staticData = this.data.slice((this.pageNo - 1) * this.pageSize, this.pageNo * this.pageSize);
        } else {
          this.staticData = this.data;
        }
      },
      changeScrollLoad(val) {
        this.$set(this.extraAttrs, 'scroll-load', val);
      },
      confirmFilter(filteredColumn) {
        this.columns.map(item => {
          if (filteredColumn.includes(item[this.column_key_Map.prop])) {
            item.initialShow = true;
          } else {
            item.initialShow = false;
          }
        });
        this.filteredColumn = filteredColumn;
        this.saveCacheColumns();
      },
      saveCacheColumns() {
        if (this.isCacheColumns) {
          let columns = this.columns.map(item => {
            let obj = this.getColBind(item);
            // if (this.filteredColumn.includes(item[this.column_key_Map.prop])) {
            //   obj.initialShow = true;
            // } else {
            //   obj.initialShow = false;
            // }
            return obj;
          });
          setLocalStorageItem(this.cacheColumnsName, columns);
        }
      },
      handleCacheColumns() {
        if (this.isCacheColumns) {
          let updateCol;
          let cacheColumns = getLocalStorageItem(this.cacheColumnsName);
          //按本地存储的配置修改columns
          cacheColumns && (updateCol = (col) => {
            let _col = cacheColumns.filter(obj=>obj[this.column_key_Map.prop] === col[this.column_key_Map.prop] && obj[this.column_key_Map.label] === col[this.column_key_Map.label])[0];
            if (_col) {
              Object.assign(col, _col);
            }
          });
          for (let item of this.columns) {
            updateCol && updateCol(item);
          }
        }
      },
      getColBind(col) {
        const bind = Object.assign({}, col);
        delete bind.component;
        delete bind.listeners;
        delete bind.propsHandler;
        return bind;
      },
      initOption() {
        this.handleCacheColumns();
        let _filteredColumn = [];
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
      },
      // tableBind() {
      //   return Object.assign({}, {
      //     pageNo: this.pageNo,
      //     pageSize: this.pageSize,
      //     columnKeyMap: this.columnKeyMap
      //   }, this.$attrs);
      // },
      changePage(pageNo, bool, ...argv) {
        this.pageNo = pageNo;
        if (!bool) {
          this.updateStaticData();
          this.updateData(...argv);
        }
        // this.total !== 0 && this.updateData();
      },
      changeSize(pageSize, ...argv) {
        this.pageSize = pageSize;
        if (this.pageSize * (this.pageNo - 1) < this.total || this.total === 0) {
          this.updateStaticData();
          this.updateData(...argv);
        }
      },
      updateData(...argv) {
        if (!this.staticPaging) {
          this.$emit('update-data', {
            pageNo: this.pageNo,
            pageSize: this.pageSize
          }, ...argv);
        }
      }
    },
    watch: {
      data() {
        this.initStaticPaingOption();
      }
    },
    components: {
      setButton
    }
  };
</script>
