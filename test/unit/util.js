import Vue from "@/vuePackage";
import store from "@/store/index";

let id = 0;
const delay = 100;

const createElm = function() {
  const elm = document.createElement("div");

  elm.id = "app" + ++id;
  document.body.appendChild(elm);

  return elm;
};

const setVmStore = function(vm) {
  let dataSource = {
    appname: null,
    department: null,
    departmentId: null,
    email: null,
    id: "e44f70bd06454e6c9fd49a30e498daf2",
    ip: null,
    oarea: "鹿城区",
    ocity: "温州市",
    ocode: "3303",
    oname: "温州东诚包装有限公司",
    oprovince: "浙江省",
    password: null,
    phone: null,
    sex: null,
    ucompany: "400",
    uemail: "1@1.com",
    uids: "4000109",
    uname: "最高管理员"
  };
  vm.$store.commit("SET_UNAME", dataSource.uname);
  vm.$store.commit("SET_UID", dataSource.uids);
  vm.$store.commit("SET_COMPANY", {
    id: dataSource.ucompany,
    name: dataSource.oname
  });
  vm.$store.commit("SET_CITY", {
    cityName: dataSource.ocity,
    cityCode: parseInt(dataSource.ocode, 10),
    provinceName: dataSource.oprovince,
    provinceCode: parseInt(dataSource.ocode.substr(0, 2), 10)
  });
  vm.$store.commit("SET_PROVINCE", {
    provinceName: dataSource.oprovince,
    provinceCode: parseInt(dataSource.ocode.substr(0, 2), 10)
  });
};

exports.testPromise = function(fn) {
  return new Promise(resolve => {
    setTimeout(() => {
      fn();
      resolve();
    }, delay);
  });
};

/**
 * 回收 vm
 * @param  {Object} vm
 */

exports.destroyVM = function(vm) {
  vm.$destroy && vm.$destroy();
  vm.$el && vm.$el.remove();
  // vm.$el.parentNode &&
  // vm.$el.parentNode.removeChild(vm.$el);
};

/**
 * 创建一个 Vue 的实例对象
 * @param  {Object|String}  Compo   组件配置，可直接传 template
 * @param  {Boolean=false} mounted 是否添加到 DOM 上
 * @return {Object} vm
 */
exports.createVue = function(Compo, mounted = false) {
  if (Object.prototype.toString.call(Compo) === "[object String]") {
    Compo = { template: Compo };
  }
  return new Vue(Compo).$mount(mounted === false ? null : createElm());
};

/**
 * 创建一个测试组件实例
 * @link http://vuejs.org/guide/unit-testing.html#Writing-Testable-Components
 * @param  {Object}  Compo          - 组件对象
 * @param  {Object}  propsData      - props 数据
 * @param  {Boolean=false} mounted  - 是否添加到 DOM 上
 * @return {Object} vm
 */
exports.createTest = function(Compo, propsData = {}, mounted = false) {
  if (propsData === true || propsData === false) {
    mounted = propsData;
    propsData = {};
  }
  const elm = createElm();
  //阻止请求数据
  Compo.mounted = function() {};
  //阻止post请求
  Vue.prototype.$http.djPost = function() {
    if (process.env.NODE_ENV === 'testing') {
      return Promise.reject('testing');
    }
  };
  const Ctor = Vue.extend(Compo);
  let vm = new Ctor({ propsData, store });
  setVmStore(vm);
  return vm.$mount(mounted === false ? null : elm);
};

/**
 * 触发一个事件
 * mouseenter, mouseleave, mouseover, keyup, change, click 等
 * @param  {Element} elm
 * @param  {String} name
 * @param  {*} opts
 */
exports.triggerEvent = function(elm, name, ...opts) {
  let eventName;

  if (/^mouse|click/.test(name)) {
    eventName = "MouseEvents";
  } else if (/^key/.test(name)) {
    eventName = "KeyboardEvent";
  } else {
    eventName = "HTMLEvents";
  }
  const evt = document.createEvent(eventName);

  evt.initEvent(name, ...opts);
  elm.dispatchEvent ? elm.dispatchEvent(evt) : elm.fireEvent("on" + name, evt);

  return elm;
};

/**
 * 触发 “mouseup” 和 “mousedown” 事件
 * @param {Element} elm
 * @param {*} opts
 */
exports.triggerClick = function(elm, ...opts) {
  exports.triggerEvent(elm, "mousedown", ...opts);
  exports.triggerEvent(elm, "mouseup", ...opts);

  return elm;
};

/**
 * 触发 keydown 事件
 * @param {Element} elm
 * @param {keyCode} int
 */
exports.triggerKeyDown = function(el, keyCode) {
  const evt = document.createEvent("Events");
  evt.initEvent("keydown", true, true);
  evt.keyCode = keyCode;
  el.dispatchEvent(evt);
};
