/**
 * 基于el-table封装的基础表格组件，增加了自动适应宽度，多选，拖拽，树结构的功能
 */
const baseTable = require('./src/main.vue').default;
const elementMethods = require('./src/elementMethods').default;
// const ElTreeGrid = require('element-tree-grid');
// const ElTreeGrid = require('./src/table-tree-column');
const {
  Checkbox,
  CheckboxGroup,
  // Table,
  TableColumn,
  Popover,
  Loading
} = require('element-ui');

baseTable.install = function (Vue) {
  Vue.component(baseTable.name, baseTable);
  // Vue.component(ElTreeGrid.name, ElTreeGrid);
  Vue.use(Checkbox);
  Vue.use(CheckboxGroup);
  Vue.use(TableColumn);
  Vue.use(Popover);
  Vue.use(Loading.directive);
};
baseTable._mixinsMethods = elementMethods;
module.exports = baseTable;
