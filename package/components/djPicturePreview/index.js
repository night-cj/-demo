
import picturePreview from './main.vue';

picturePreview.install = function (Vue) {
  Vue.component(picturePreview.name, picturePreview);
};

export default picturePreview;
