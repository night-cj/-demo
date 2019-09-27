//创建一个getter方法
function createGetter(rootKey, subKey) {
  return (state) => state[rootKey][subKey];
}

//获得默认getters方法
function getDefaultGetters(modules) {
  let getters = {};
  if (Object.prototype.toString.call(modules) === '[object Object]') {
    Object.keys(modules).forEach(rootKey => {
      if (Object.prototype.toString.call(modules[rootKey].state) === '[object Object]') {
        Object.keys(modules[rootKey].state).forEach(subKey => {
          getters[subKey] = createGetter(rootKey, subKey);
        });
      }
    });
  }
  return getters;
}

// 获得最终getters
function getGetters(config) {
  let {modules, getters} = config;
  return Object.assign({}, getDefaultGetters(modules), getters);
}

/**
 * 自动生成getters映射
 */
const DjStore = (Vuex, config = {}) => {
  return new Vuex.Store(Object.assign({}, config, {getters: getGetters(config)}));
};

export default DjStore;
