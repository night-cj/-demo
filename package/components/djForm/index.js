import djForm from './src/main';
import rules from './src/rules';
// import wordsCount from './src/wordsCount';
const {
  Form,
  FormItem
} = require('element-ui');

djForm.install = function (Vue) {
  Vue.component(djForm.name, djForm);
  // Vue.component(wordsCount.name, wordsCount);
  Vue.use(Form);
  Vue.use(FormItem);
};
djForm.rules = rules;
export default djForm;
