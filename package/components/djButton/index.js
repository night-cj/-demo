import djButton from './src/main';
const {
  Button
} = require('element-ui');

djButton.install = function (Vue) {
  Vue.component(djButton.name, djButton);
  Vue.use(Button);
};
export default djButton;
