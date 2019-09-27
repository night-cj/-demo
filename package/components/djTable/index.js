/**
 * 该组件是对baseTable的进一步封装，增加了分页，隐藏列，列配置项缓存的功能
 */
const djTable = require('./src/main').default;
const paging = require('../djPaging/index');
const {
  Popover,
  CheckboxGroup,
  Checkbox
} = require('element-ui');
djTable.install = function (Vue) {
  Vue.component(djTable.name, djTable);
  Vue.use(Popover);
  Vue.use(CheckboxGroup);
  Vue.use(Checkbox);
  Vue.use(paging);
};
module.exports = djTable;
