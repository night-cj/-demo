## permission
路由权限（路由守卫）

### 作用 
拦截用户没有权限访问的路由

### 流程图 
![]( static/permission.svg)  

### 用法
 提供permission方法，传入配置项就能完成路由权限的设置,其中router、login、getPermission、isLogin、asyncRouter属性是必传项。
 
### 例子
```javascript
import { Loading } from 'element-ui';
/**
 * 获取权限路由，需要返回所有有权限的路由路径
 * getPermission方法必须返回一个Promise,Promise内返回权限路由
 * @returns {Promise<any>}
 */
function getPermission() {
  return new Promise(resolve => {
    let permissionMenu = ['/home', 'index', 'searchTest'];
    //如果是开发者状态，获取全部权限
    if (process.env.NODE_ENV === 'development') {
      const getPer = (routes, menu) => {
        routes.forEach(route => {
          menu.push(route.path);
          if (route.children) {
            getPer(route.children, menu);
          }
        });
      };
      getPer(asyncRouter, permissionMenu);
    }
    resolve(permissionMenu);
  });
}

/**
 * 登录方法，需要返回登录成功和登录失败时跳转的路由，不设置登录失败的跳转地址时自动跳到/500路由
 * login需要返回一个Promise，Promise返回登录成功时跳转的路由，permission也会去接收Promise的catch信息，如果信息是一个路径，则会跳到对应的路由
 * @param to
 * @returns {Promise<any>}
 */
function login() {
  return new Promise((resolve) => {
    setCookiesItem('userName', 'gw');
    // reject();
    resolve('/home');
  });
}

/**
 * 判断是否登录的方法
 * @returns {boolean}
 */
function isLogin() {
  return getCookiesItem('userName') !== undefined;
}
permission({
    router, //路由实例
    //某些有权限路由的特殊限制，传入一个对象，key为路由路径，value为特殊限制的方法,法需要返回一个将要跳转的路由地址或true和false
    limit: {
        '/home/index':()=>{
            if(特殊判断) {
                return true
            } else {
                return false;
            }
        }
    },
    whiteListing: ['/404', '/500', '/login'],
    routeCallBack(to) { //拦截路由跳转方法
        return to;
    },
    login, //登录方法,需要返回一个promise,promise返回的值是一个路径
    getPermission, //获取权限方法
    isLogin, //判断是否登录的方法
    asyncRouter, //所有权限路由
    animate: { //路由跳转的动画,在start上设置动画开启，在end上设置动画关闭，end的方法上的第一个参数为start方法返回的变量
       start: ()=>{
         return Loading.service();
       },
       end: (loading)=>{
         loading.close();
       }
    }
});
```

### permission 配置对象属性
| 名称 | 说明 | 类型 | 参数 | 默认值 |
| --- | --- | --- | --- | --- |
| router | 项目的路由实例 | Router | - | - |
| isLogin | 判断是否登录的方法 | Function | to(将要跳转的路由对象) | - |
| login | 登录方法,需要返回一个promise,promise返回的值是一个路径 | Function | to(将要跳转的路由对象) | - |
| getPermission | 获取权限方法 | Function | - | - |
| asyncRouter | 所有权限路由 | Array / Object | - | - |
| whiteListing | 白名单（不需要登录和权限就能进的页面） | Array | - | ['/500', '/400'] |
| limit | 某些有权限路由的特殊限制，传入一个对象，key为路由路径，value为特殊限制的方法,需要返回一个将要跳转的路由地址或true和false | Object | - | - |
| animate | 路由跳转的动画设置 | Object | - | - |
| routeCallBack | 拦截路由跳转 | Function | to(将要跳转的路由对象) | - |
