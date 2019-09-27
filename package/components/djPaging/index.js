const djPaging = require('./src/main.vue').default;
const {Pagination} = require('element-ui');

djPaging.install = function (Vue) {
  Vue.component(djPaging.name, djPaging);
  Vue.use(Pagination);
};
module.exports = djPaging;
