import djDialog from './components/djDialog';
import djMenu from './components/djMenu';
import djSearch from './components/djSearch';
import baseTable from './components/baseTable';
import djTable from './components/djTable';
import djPaging from './components/djPaging';
import djButton from './components/djButton';
import djPicturePreview from './components/djPicturePreview';
import djForm from './components/djForm';
import controls from './components/controls';
import container from './components/container';
import djMultipleCheckbox from './components/djMultipleCheckbox';
import httpPolicy from './methods/mixins/httpPolicy';
import listenerPolicy from './methods/mixins/listenerPolicy';
import renderBase from './methods/mixins/renderBase';
import methods from './methods/utils/methods';
import permissionMethods from './methods/utils/permissionMethods';
import permission from './methods/permission';
import DjStore from './methods/djStore';
import djService from './methods/httpFactory/djService';
import HttpFactory from './methods/httpFactory/httpFactory';
import Subject from './methods/customClass/Subject';
import Websocket from './methods/customClass/Websocket';
import djIcon from './components/djIcon';

// import dataCache from './initModule/commonDataSource';

const components = {
  djDialog,
  djMenu,
  djSearch,
  baseTable,
  djTable,
  djPaging,
  djPicturePreview,
  djForm,
  djMultipleCheckbox,
  ...controls,
  ...container,
  djIcon,
  djButton
};
const install = function(Vue) {
  Object.keys(components).forEach(key => {
    Vue.use(components[key]);
  });
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

module.exports = {
  //todo 后续进行分离，变成各自单独的模块进行打包
  httpPolicy,
  djService,
  HttpFactory,
  permission,
  permissionMethods,
  Subject,
  Websocket,
  // ------
  install,
  listenerPolicy,
  renderBase,
  DjStore,
  methods,
  ...components,
  // dataCache
};
// module.exports.default = module.exports;
