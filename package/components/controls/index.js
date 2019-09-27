import djSwitch from './djSwitch';
import djInput from './djInput';
import djSelect from './djSelect';
import djCheckbox from './djCheckbox';
import djRadio from './djRadio';
import djTimePicker from './djTimePicker';
import djCascader from './djCascader';

const components = {
  djSwitch,
  djInput,
  djSelect,
  djCheckbox,
  djRadio,
  djTimePicker,
  djCascader,
};
Object.keys(components).forEach(key => {
  components[key].install = function (Vue) {
    Vue.component(components[key].name, components[key]);
  };
});

export default {
  ...components
};
