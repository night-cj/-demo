// import Vue from 'vue';
// import Router from 'vue-router';
// import Table from '@/components/Table';
// import Tab from '@/components/Tab';
// import apiService from '@/components/apiService';
// import dialogs from '@/components/dialogs';
// import footTab from '@/components/footTab';
// import djMultipleCheckbox from '@/components/djMultipleCheckbox';
// import numberValidator from '@/components/numberValidator';
// import djPaging from '@/components/djPaging';
// import timePicker from '@/components/timePicker';
// import wmsForm from '@/components/wmsForm';
//
// Vue.use(Router);
//
// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'Table',
//       component: Table
//     }, {
//       path: '/tab',
//       name: 'Tab',
//       component: Tab
//     }, {
//       path: '/apiService',
//       name: 'apiService',
//       component: apiService
//     }, {
//       path: '/dialogs',
//       name: 'dialogs',
//       component: dialogs
//     }, {
//       path: '/footTab',
//       name: 'footTab',
//       component: footTab
//     }, {
//       path: '/djMultipleCheckbox',
//       name: 'djMultipleCheckbox',
//       component: djMultipleCheckbox
//     }, {
//       path: '/numberValidator',
//       name: 'numberValidator',
//       component: numberValidator
//     }, {
//       path: '/djPaging',
//       name: 'djPaging',
//       component: djPaging
//     }, {
//       path: '/timePicker',
//       name: 'timePicker',
//       component: timePicker
//     }, {
//       path: '/wmsForm',
//       name: 'wmsForm',
//       component: wmsForm
//     }
//   ]
// });

import navConfig from '../nav.config.json';
import langs from '../i18n/route.json';

const LOAD_MAP = {
  'zh-CN': name => {
    return () => import(`../pages/zh-CN/${name}.vue`);
    // return r => require.ensure([], () =>
    //     r(require(`../pages/zh-CN/${name}.vue`)),
    //   'zh-CN');
  },
  // 'en-US': name => {
  //   return r => require.ensure([], () =>
  //       r(require(`../pages/en-US/${name}.vue`)),
  //     'en-US');
  // },
  // 'es': name => {
  //   return r => require.ensure([], () =>
  //       r(require(`../pages/es/${name}.vue`)),
  //     'es');
  // }
};
//获取页面组件
const load = function(lang, path) {
  return LOAD_MAP[lang](path);
};

const LOAD_DOCS_MAP = {
  'zh-CN': path => {
    return () => import(`../docs/zh-CN${path}.md`);
    // return r => require([], () =>
    //     r(require(`../docs/zh-CN${path}.md`)),
    //   'zh-CN');
  },
  // 'en-US': path => {
  //   return r => require.ensure([], () =>
  //       r(require(`../docs/en-US${path}.md`)),
  //     'en-US');
  // },
  // 'es': path => {
  //   return r => require.ensure([], () =>
  //       r(require(`../docs/es${path}.md`)),
  //     'es');
  // }
};
//获取组件实例组件
const loadDocs = function(lang, path) {
  return LOAD_DOCS_MAP[lang](path);
};

const registerRoute = (navConfig) => {
  let route = [];
  Object.keys(navConfig).forEach((lang, index) => {
    let navGroup = navConfig[lang];
    Object.keys(navGroup).forEach(key=>{
      let navs = navGroup[key];
      let rootRoute = {
        path: `/${ lang }/${key}`,
        redirect: `/${ lang }/${key}/${key === 'function' ? 'import' : 'installation'}`,
        component: load(lang, key),
        children: []
      };
      route.push(rootRoute);
      navs.forEach(nav => {
        if (nav.href) return;
        if (nav.groups) {
          nav.groups.forEach(group => {
            group.list.forEach(nav => {
              addRoute(nav, rootRoute, lang, key, index);
            });
          });
        } else if (nav.children) {
          nav.children.forEach(nav => {
            addRoute(nav, rootRoute, lang, key, index);
          });
        } else {
          addRoute(nav, rootRoute, lang, key, index);
        }
      });
    });
  });
  function addRoute(page, rootRoute, lang, key, index) {
    const component = page.path === '/changelog'
      ? load(lang, 'changelog')
      : loadDocs(lang, '/' + key + page.path);
    let child = {
      path: page.path.slice(1),
      meta: {
        title: page.title || page.name,
        description: page.description,
        lang
      },
      name: key + '-' + lang + (page.title || page.name),
      component: component.default || component
    };

    rootRoute.children.push(child);
  }

  return route;
};

let route = registerRoute(navConfig);

const generateMiscRoutes = function(lang) {
  // let guideRoute = {
  //   path: `/${ lang }/guide`, // 指南
  //   redirect: `/${ lang }/guide/design`,
  //   component: load(lang, 'guide'),
  //   children: [{
  //     path: 'design', // 设计原则
  //     name: 'guide-design' + lang,
  //     meta: { lang },
  //     component: load(lang, 'design')
  //   }, {
  //     path: 'nav', // 导航
  //     name: 'guide-nav' + lang,
  //     meta: { lang },
  //     component: load(lang, 'nav')
  //   }]
  // };

  // let resourceRoute = {
  //   path: `/${ lang }/resource`, // 资源
  //   meta: { lang },
  //   name: 'resource' + lang,
  //   component: load(lang, 'resource')
  // };
  let changeLogRoute = {
    path: `/${ lang }/changeLog`, // 更新日志
    meta: { lang },
    name: 'changeLog' + lang,
    component: load(lang, 'changeLog')
  };

  let indexRoute = {
    path: `/${ lang }`, // 首页
    meta: { lang },
    name: 'home' + lang,
    component: load(lang, 'index')
  };

  // return [guideRoute, resourceRoute, indexRoute];
  return [indexRoute, changeLogRoute];
};

langs.forEach(lang => {
  route = route.concat(generateMiscRoutes(lang.lang));
});

// route.push({
//   path: '/play',
//   name: 'play',
//   component: require('./play/index.vue')
// });

// let userLanguage = localStorage.getItem('LANGUAGE') || window.navigator.language || 'en-US';
let userLanguage = 'zh-CN';
let defaultPath = '/en-US';
if (userLanguage.indexOf('zh-') !== -1) {
  defaultPath = '/zh-CN';
} else if (userLanguage.indexOf('es') !== -1) {
  defaultPath = '/es';
}

route = route.concat([{
  path: '/',
  redirect: defaultPath
}, {
  path: '*',
  redirect: defaultPath
}]);

export default route;
