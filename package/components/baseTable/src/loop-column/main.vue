<template>
  <el-table-column v-if="col.children&&col.children.length"
                   v-bind="getColBind(col)">
    <loop-column v-for="_col in col.children" v-if="_col" :key="_col.prop" :col="_col"></loop-column>
  </el-table-column>
  <table-tree-column v-else-if="type === 'tree'"
                     v-bind="getColBind(col)">
  </table-tree-column>
  <el-table-column v-else-if="type === 'expand'"
                   v-bind="getColBind(col)"
                   :type="type">
    <template slot-scope="props">
      <slot name="expand" v-bind="props"></slot>
    </template>
  </el-table-column>
  <el-table-column v-else-if="type === 'index'"
                   v-bind="getColBind(col)">
    <template slot-scope="scope">
      {{pageSize * ( pageNo - 1 ) + Number(scope.$index) + 1}}
    </template>
  </el-table-column>
  <el-table-column v-else-if="type === 'selection'"
                   :type="type"
                   v-bind="getColBind(col)">
  </el-table-column>
  <el-table-column v-else-if="col.component"
                   v-bind="getColBind(col)">
    <template slot-scope="scope">
      <component :is="col.component"
                 v-bind="getCptBind(scope, col)"
                 v-on="col.listeners">
      </component>
    </template>
  </el-table-column>
  <el-table-column v-else v-bind="getColBind(col)"></el-table-column>
</template>
<script>
  import tableTreeColumn from '../table-tree-column';
  const {TableColumn} = require('element-ui');
  const COLUMN_PROPS = {
    align: 'left',
    showOverflowTooltip: true,
    headerAlign: "left"
    // component: Text
  };
  export default {
    name: 'loop-column',
    inject: ['djTable'],
    props: {
      type: String,
      col: {
        type: Object,
        default: () => ({})
      }
    },
    computed: {
      pageSize() {
        return this.djTable.pageSize;
      },
      pageNo() {
        return this.djTable.pageNo;
      },
      data() {
        return this.djTable.data;
      }
    },
    data: function () {
      return {};
    },
    methods: {
      getColBind(col) {
        const bind = Object.assign({}, COLUMN_PROPS, col);
        if (this.djTable.$attrs['scroll-load']) {
          bind.showOverflowTooltip = true;
        }
        delete bind.component;
        delete bind.listeners;
        delete bind.propsHandler;
        return bind;
      },
      getCptBind({row, column, $index}, col) {
        let index = $index;
        let length = this.data.length;
        let cur = row[col.prop];
        let page = {
          pageNo: this.pageNo,
          pageSize: this.pageSize
        };
        const props = {row, col, column, index, length, page, cur};
        const handler = col.propsHandler;
        return handler && handler(props) || props;
      },
    },
    components: {elTableColumn: TableColumn, tableTreeColumn}
  };
</script>
<style lang="less" scoped>

</style>
