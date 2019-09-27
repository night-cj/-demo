import djContentBox from './djContentBox';
import djItemBox from './djItemBox';
import djScrollBox from './djScrollBox';
import djSelectBox from './djSelectBox';
import djWaterfallBox from './djWaterfallBox';
import djGridBox from './djGridBox';
import djCollapseTransition from './djCollapseTransition';

const components = {
  djContentBox,
  djItemBox,
  djScrollBox,
  djSelectBox,
  djWaterfallBox,
  djGridBox,
  djCollapseTransition
};
Object.keys(components).forEach(key => {
  components[key].install = function (Vue) {
    Vue.component(components[key].name, components[key]);
  };
});

export default {
  ...components,
};
