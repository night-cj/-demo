
import search from './main.vue';

search.install = function (Vue) {
  Vue.component(search.name, search);
};

export default search;
