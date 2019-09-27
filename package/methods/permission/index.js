import { formatCheck, checkPermissionList } from "./formateCheck";
import { NOT_FINED_URL, SERVICE_ERROR_URL, _whiteListing, _isLogin, _login} from './defaultConfig';
// const NOT_FINED_URL = '/404';
// const SERVICE_ERROR_URL = '/500';
let realAsyncRouter;
let specialReg = [];
let permissionList_cache;

const hasOwnProperty = (obj, key) => {
  return obj && obj.hasOwnProperty(key);
};

const isBoolean = function (data) {
  return Object.prototype.toString.call(data) === '[object Boolean]';
};

// 将普通return改为promise
const callbackPromise = function (result) {
  return new Promise(resolve => {
    resolve(result);
  });
};

/**
 * 有权限的特殊路由匹配 如：/user/:id
 * @param route
 */
function judgeSpecialRoute(route) {
  if (/\/:[\S]+$/.test(route.path)) {
    let reg = new RegExp(route.path.replace(/\/:[\S]+$/g, '/[\\S]+'));
    specialReg.push(reg);
  }
}

/**
 * 判断当前url是否需要先选择仓库才能进入
 * @param url
 * @returns {boolean}
 */
const judgeAuthUrl = function (url, permissionMenu) {
  if (url) {
    return permissionMenu.some(per=>per === url || per === url.replace(/\/:[\S]+$/, '')) || specialReg.some(reg=>reg.test(url));
  }
};

/**
 * 判断该路由是否被需要
 * @param permissionList
 * @param currentRouter
 * @returns {boolean}
 */
function isNeedRoute(permissionList, currentRouter) {
  // if (permissionList.includes(currentRouter.path) || permissionList.includes(currentRouter.redirect) || permissionList.includes(currentRouter.path.replace(/\/:[\S]+$/, ''))) {
  //   return true;
  // }
  if (judgeAuthUrl(currentRouter.path, permissionList) || judgeAuthUrl(currentRouter.redirect, permissionList)) {
    return true;
  }
  if (currentRouter.children) {
    for (let route of currentRouter.children) {
      // console.log('route', route);
      if (isNeedRoute(permissionList, route)) {
        return true;
      }
    }
  }
  return false;
}
/**
 * 解析动态路由（权限路由）
 * @param permissionList 有权限的路由地址集合
 * @param currentRouter 需要匹配权限的路由
 * @param parentRouter 用来存放最后生成权限路由
 */
function handleAsyncRouter(permissionList, currentRouter, parentRouter) {
  if (Object.prototype.toString.call(currentRouter) === '[object Array]') {
    parentRouter.children = [];
    currentRouter.forEach(item => {
      if (!item.path.startsWith('/') && parentRouter.path) {
        item.path = parentRouter.path + item.path;
      }
      if (isNeedRoute(permissionList, item)) {
        parentRouter.children.push(Object.assign({}, item));
        judgeSpecialRoute(item);
      }
      // if (permissionList.includes(item.path) || permissionList.includes(item.redirect)) {
      //
      // }
    });
    parentRouter.children.forEach(asyncRouter => {
      if (asyncRouter && asyncRouter.children && Array.isArray(asyncRouter.children)) {
        handleAsyncRouter(permissionList, asyncRouter.children, asyncRouter);
      }
    });
  }
  if (Object.prototype.toString.call(currentRouter) === '[object Object]') {
    parentRouter.children = [currentRouter];
    if (currentRouter.children && Array.isArray(currentRouter.children)) {
      handleAsyncRouter(permissionList, parentRouter.children, parentRouter);
    }
  }
}

/**
 * 处理有权限的路由地址集合，增加有权限的路由的依赖路径
 * @param permissionList
 * @returns {Array}
 */
function handlePermission(permissionList) {
  let arr = [];
  permissionList.forEach(path => {
    if (path) {
      arr.push(path);
      var res = path.match(/\/[\s\S]*\//g);
      if (res) {
        res = res.map(item => {
          return item.substr(0, item.length - 1);
        });
        arr = arr.concat(handlePermission(res));
      }
    }
  });
  return arr;
}

/**
 * 获得最终有权限的路由地址集合(去重)
 * @param permissionList
 * @returns {any[]}
 */
function getPermissionList(permissionList) {
  return Array.from(new Set(handlePermission(permissionList)));
}

/**
 * 生成基础路由路径的集合
 * @param routes
 * @returns {Array}
 */
function getBaseRoutes(routes = []) {
  let arr = [];
  routes.forEach(route => {
    arr.push(route.path);
    if (route.children && Array.isArray(route.children)) {
      arr = arr.concat(getBaseRoutes(route.children));
    }
  });
  return arr;
}

/**
 * 获得首页路由
 * @param routes
 * @returns {*}
 */
function getHomeRoute(routes = []) {
  for (let i = 0; i < routes.length; i++) {
    if (routes[i].meta && routes[i].meta.homeRoute) {
      return routes[i].path;
    }
    if (routes[i].children && Array.isArray(routes[i].children)) {
      return getHomeRoute(routes[i].children);
    }
  }
}

/**
 * 判断变量是否是一个路径格式
 */
function isPath(val) {
  return Object.prototype.toString.call(val) === '[object String]' && /^\//.test(val);
}

/**
 * 对带*的path的插入重定向路径
 * @param routes 所有权限路由
 * @param permissionMenu 有权限路由路径数组
 */
function addRedirect(routes, permissionMenu = [], routesMap) {
  routes.forEach(route => {
    if (/\/\*$/.test(route.path) && !route.redirect) {
      let res = route.path.replace(/\*$/, '');
      // let reg = new RegExp(`^${res.replace(/\//g, '\\/')}([^/])+$`);
      let reg = new RegExp(`^${res.replace(/\//g, '\\/')}`);
      permissionMenu.some((path)=>{
        if (path.match(reg) && routesMap[path] && !routesMap[path].children) {
          // console.log(route.path + '->' + path);
          route.redirect = path;
          return true;
        }
      });
    }
    if (Array.isArray(route.children) && route.children.length) {
      addRedirect(route.children, permissionMenu, routesMap);
    }
  });
}
/**
 * 生成路由映射表
 * @param routes 所有权限路由
 * @param map 路由映射表
 */
function getRoutesMap(routes, map = {}) {
  routes.forEach(route => {
    if (route.path) {
      map[route.path] = route;
    }
    if (Array.isArray(route.children) && route.children.length) {
      getRoutesMap(route.children, map);
    }
  });
  return map;
}

/**
 * 生成路由守卫的方法
 * @param config
 */
function permission(config) {
  let {
    router, //router: vue-router的实例
    whiteListing = _whiteListing, //whiteListing: 白名单 不需要权限,不需要登录就能访问的路由 例如：['/welcome', '/404']
    limit, //limit: 路由特殊限制 结构： {'/welcome': (to)=>{return true/false}}
    routeCallBack, //routeCallBack: 路由重定向的函数
    login = _login, //登陆方法
    getPermission, //获取权限的方法
    isLogin = _isLogin, //判断是否登陆方法
    asyncRouter, //动态权限路由
    animate //跳转动画
  } = config;

  //格式校验
  if (!formatCheck({...config, login, isLogin, whiteListing})) {
    return;
  }

  const { start, end } = animate || {};
  const home_route = getHomeRoute(router.options.routes) || (router.options.routes && router.options.routes[0].path);
  const baseRoutes = getBaseRoutes(router.options.routes);

  function routePermission(to) {
    if (whiteListing.includes(to.path)) {
      return callbackPromise(true);
    }
    //判断登录状态
    if (!isLogin(to) || hasOwnProperty(to.query, 'oncetoken')) {
      // let res = login(to);
      // if (res) {
      //   return res.catch(()=>falseCallBack ? falseCallBack(NOT_FINED_URL) : NOT_FINED_URL);
      // }
      return login(to).catch((path)=> {
        if (isPath(path)) {
          return path;
        }
        return SERVICE_ERROR_URL;
      });
    }
    if (baseRoutes.includes(to.path)) {
      return callbackPromise(true);
    } else {
      return (permissionList_cache && permissionList_cache.length ? Promise.resolve(permissionList_cache) : getPermission()).then(permissionList => {
        if (!checkPermissionList(permissionList)) {
          return Promise.reject();
        }
        permissionList_cache = permissionList;
        if (!realAsyncRouter && asyncRouter) {
          addRedirect(asyncRouter, permissionList, getRoutesMap(asyncRouter));
          let routerWrap = {};
          handleAsyncRouter(getPermissionList(permissionList), asyncRouter, routerWrap);
          realAsyncRouter = routerWrap.children;
          // 动态创建route的路由地址
          router.addRoutes(realAsyncRouter);
          return to.path;
        }
        if (judgeAuthUrl(to.path, permissionList)) {
          //路由权限判断
          if (limit && limit[to.path]) {
            return limit[to.path]();
          }
          return true;
        } else {
          return NOT_FINED_URL;
        }
      }).catch((e)=>{
        if (isPath(e)) {
          return e;
        } else if (e) {
          console.error(e);
        }
        return SERVICE_ERROR_URL;
      });
    }
  }

  /**
   * 路由判断Fn
   */
  let loadingInstance;
  const runRoutePermission = (() => {
    let permission = (to, nextFn, from) => {
      // 页面跳转过度动画
      // let loadingInstance;
      start && !loadingInstance && (loadingInstance = start());

      // 结束页面跳转过度动画
      function afterNext() {
        end && loadingInstance && end(loadingInstance);
        loadingInstance = null;
      }

      // 待修改
      return routePermission(to)
        .then(result => {
          routeCallBack && (result = routeCallBack(result));
          if (isBoolean(result) || from.path === result) {
            afterNext();
          }
          if (isBoolean(result)) {
            //无仓库下，直接在地址栏输入需要仓库模块的路由地址，页面会空白，故手动跳转到主页
            let lastResult = !result && from.path === '/' && home_route ? home_route : result;
            nextFn(lastResult);
          } else {
            // 重定向时
            if (to.path === result) {
              nextFn(Object.assign({}, to, {path: result, replace: true}));
            } else {
              nextFn({path: result, replace: true});
            }
          }
        })
        .catch(e => {
          console.error(e);
          afterNext();
          // Message({message: e.message || e, type: 'error', showClose: true});
        });
    };
    return permission;
  })();

  router.beforeEach((to, from, next) => {
    runRoutePermission(to, next, from);
  });
}

export default permission;
