// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import routes from './router';
import element from 'element-ui';
import djweb from '../package/index';
import constant from './util/constant';
import '../package/components/theme-element/src/index.scss';
import '../package/components/theme-chalk/src/index.scss';
import '../package/components/theme-chalk/src/djIcon.scss';
import demoBlock from './components/baseCom/demo-block.vue';
import MainFooter from './components/baseCom/footer.vue';
import MainHeader from './components/baseCom/header.vue';
import SideNav from './components/baseCom/side-nav';
import FooterNav from './components/baseCom/footer-nav';
Vue.component('demo-block', demoBlock);
Vue.component('main-footer', MainFooter);
Vue.component('main-header', MainHeader);
Vue.component('side-nav', SideNav);
Vue.component('footer-nav', FooterNav);

Vue.use(VueRouter);
const router = new VueRouter({
  mode: 'hash',
  // base: __dirname,
  routes
});
Vue.use(element);
Vue.use(djweb);
Vue.config.productionTip = false;
Vue.prototype.$const = constant;
export default new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
