/**
 * 修改、增加el-table组件部分方法
 */
// import Table from './el-table@2.9.2/table'; //2.9.2
import { Table } from 'element-ui'; //2.9.2
import {reTableBody} from './reTableBody';
// import TableStore from './table-store';
import TableLayout from './table-layout';
import { createStore } from './store/helper';
const _Table = Object.assign({}, Table);
delete _Table.data;
export let reTable = {
  extends: _Table,
  computed: {
    fixedHeight() {
      if (this.maxHeight) {
        if (this.showSummary) {
          return {
            bottom: 0
          };
        }
        return {
          bottom: (this.layout.scrollX && this.data.length) ? this.layout.gutterWidth + 'px' : ''
        };
      } else {
        //源代码
        // if (this.showSummary) {
        //   return {
        //     height: this.layout.tableHeight ? this.layout.tableHeight + 'px' : ''
        //   };
        // }
        // return {
        //   height: this.layout.viewportHeight ? this.layout.viewportHeight + 'px' : ''
        // };
        //现代码，解决有横向滚动条时悬浮列的高度短了一个滚动条的高度
        return {
          height: this.layout.tableHeight ? this.layout.tableHeight + 'px' : ''
        };
      }
    },
    // tableBody组件内部多套了一层div，所以宽度的计算方式要改变
    bodyWidth() {
      const { bodyWidth } = this.layout;
      return bodyWidth ? bodyWidth + 'px' : '';
    },
    // 控制table是否滚动加载
    isScrollLoad() {
      return this.scrollLoad && (this.height || this.maxHeight) && this.data && this.data.length > 50;
    }
  },
  props: {
    //控制是否可以拖拽
    isDraggable: {
      type: Boolean,
      default: false
    },
    // 表格是否需要设置resize监听
    noresize: {
      type: Boolean,
      default: false
    },
    //控制是否开启滚动加载
    scrollLoad: {
      type: Boolean,
      default: false
    },
    //可视窗口外上下各预留多少行
    reserveNum: {
      type: Number,
      default: 10,
      validator: function (value) {
        return value >= 1;
      }
    }
  },
  data() {
    //暂时不用
    // const { hasChildren = 'hasChildren', children = 'children' } = this.treeProps;
    const store = createStore(this, {
      rowKey: this.rowKey,
      defaultExpandAll: this.defaultExpandAll,
      selectOnIndeterminate: this.selectOnIndeterminate,
      // // TreeTable 的相关配置
      // indent: this.indent,
      // lazy: this.lazy,
      // lazyColumnIdentifier: hasChildren,
      // childrenColumnName: children,
      isDraggable: this.isDraggable,
      scrollLoad: this.scrollLoad,
      indexList: [],
      reserveNum: this.reserveNum
    });
    const layout = new TableLayout({
      store,
      table: this,
      fit: this.fit,
      showHeader: this.showHeader
    });
    return {
      store,
      layout,
      isHidden: false,
      renderExpanded: null,
      resizeProxyVisible: false,
      resizeState: {
        width: null,
        height: null
      },
      // 是否拥有多级表头
      isGroup: false,
      scrollPosition: 'left'
    };
  },
  components: {
    TableBody: reTableBody
  }
};
