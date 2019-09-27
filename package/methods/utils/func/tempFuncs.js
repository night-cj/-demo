//路由懒加载方法
// const _import = (file, name) => () => {
//   let com = import('@/' + file + '.vue');
//   return com.then(res=>{
//     name && (res.default.name = name); //重新配置name，防止出现路由name与组件name不符导致无法缓存页面的问题
//     return res;
//   });
// };
//
// //前端路由扁平化，适配后端权限
// const _loopRoutes = (routes, parentPath = '', map = {}) => {
//   let addList = [];
//   let removeList = [];
//   routes.push({
//     path: '*',
//   });
//
//   routes.forEach((route, index) => {
//     route.path = route.path.startsWith('/') ? route.path : '/' + route.path;
//     route.path = (parentPath + route.path).replace('//', '/');
//     if (route.redirect) {
//       route.redirect = parentPath + (route.redirect.startsWith('/') ? route.redirect : '/' + route.redirect);
//     }
//     route.name = route.path.split('/').filter(item => item).map((item, index) => {
//       if (index !== 0) {
//         item = item.slice(0, 1).toUpperCase() + item.slice(1);
//         item = item.replace(':', '');
//       }
//       return item;
//     }).join('');
//     if (route.component && (Object.prototype.toString.call(route.component) === "[object String]")) {
//       route.component = _import(route.component, route.name);
//     }
//     if (route.children) {
//       _loopRoutes(route.children, route.path, map);
//       if (!route.component) {
//         addList.push(...route.children);
//         if (!route.redirect) {
//           removeList.push(index);
//         } else {
//           delete route.children;
//         }
//       }
//     }
//     map[route.path] = route;
//   });
//   removeList.reverse().forEach(index => {
//     routes.splice(index, 1);
//   });
//   routes.unshift(...addList);
//   // 将路由长的放在前面，短的放在后面，避免通配符路径较短的排在前面
//   // routes.sort((a, b) => b.path.split('/').length - a.path.split('/').length);
//   routes.sort(function (a, b) {
//     const BPathSplit = b.path.split('/');
//     const APathSplit = a.path.split('/');
//     let splitLength = BPathSplit.length - APathSplit.length;
//     if (splitLength === 0) {
//       let nameResult = APathSplit[1].localeCompare(BPathSplit[1]);
//       if (nameResult === 0) {
//         const _indexOf = APathSplit.indexOf('*') - BPathSplit.indexOf('*');
//         return _indexOf;
//       }
//       return nameResult;
//     }
//     return splitLength;
//   });
//
//   return map;
// };

const loopRoutes = (importFun)=>{
  //前端路由扁平化，适配后端权限
  const _loopRoutes = (routes, parentPath = '', map = {}) => {
    let addList = [];
    let removeList = [];
    routes.push({
      path: '*',
    });

    routes.forEach((route, index) => {
      route.path = route.path.startsWith('/') ? route.path : '/' + route.path;
      route.path = (parentPath + route.path).replace('//', '/');
      if (route.redirect) {
        route.redirect = parentPath + (route.redirect.startsWith('/') ? route.redirect : '/' + route.redirect);
      }
      route.name = route.path.split('/').filter(item => item).map((item, index) => {
        if (index !== 0) {
          item = item.slice(0, 1).toUpperCase() + item.slice(1);
          item = item.replace(':', '');
        }
        return item;
      }).join('');
      if (route.component && (Object.prototype.toString.call(route.component) === "[object String]")) {
        route.component = importFun(route.component, route.name);
      }
      if (route.children) {
        _loopRoutes(route.children, route.path, map);
        if (!route.component) {
          addList.push(...route.children);
          if (!route.redirect) {
            removeList.push(index);
          } else {
            delete route.children;
          }
        }
      }
      map[route.path] = route;
    });
    removeList.reverse().forEach(index => {
      routes.splice(index, 1);
    });
    routes.unshift(...addList);
    // 将路由长的放在前面，短的放在后面，避免通配符路径较短的排在前面
    // routes.sort((a, b) => b.path.split('/').length - a.path.split('/').length);
    routes.sort(function (a, b) {
      const BPathSplit = b.path.split('/');
      const APathSplit = a.path.split('/');
      let splitLength = BPathSplit.length - APathSplit.length;
      if (splitLength === 0) {
        let nameResult = APathSplit[1].localeCompare(BPathSplit[1]);
        if (nameResult === 0) {
          const _indexOf = APathSplit.indexOf('*') - BPathSplit.indexOf('*');
          return _indexOf;
        }
        return nameResult;
      }
      return splitLength;
    });

    return map;
  };
  return _loopRoutes;
}

export {
  loopRoutes
}
