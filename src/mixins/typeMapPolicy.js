import controls from '../../package/components/controls/index';
import { handleComponent } from '../utils';
const DEFAULT_TYPE_MAP = {
  input: 'dj-input',
  select: 'dj-select',
  date: 'dj-time-picker',
  checkbox: 'dj-check-box',
  radio: 'dj-radio',
  switch: 'dj-switch'
};
// function handleComponent(obj) {
//   let {component, render} = obj;
//   if (render) {
//     return {
//       functional: true,
//       render
//     };
//   } else {
//     return component;
//   }
// }
export default {
  props: {
    typeMap: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    _typeMap() {
      return Object.assign({}, DEFAULT_TYPE_MAP, this.typeMap);
    }
  },
  methods: {
    getComponent(obj = {}) {
      let {type} = obj;
      return type === 'custom' && handleComponent(obj) || this._typeMap[type] || type;
    },
    isExistType(type) {
      return Boolean(this._typeMap[type]);
    }
  },
  components: {
    ...controls
  }
};

