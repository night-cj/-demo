import { checkType } from "../../package/methods/utils/methods";

const DEFAULT_OPTION = {
  configs: 'formOptions',
  key: 'formItem.prop'
};

function insertThis(arr, key) {
  let _arr = arr;
  if (!Array.isArray(arr)) {
    _arr = [arr];
  }
  return _arr.map(fn=>{
    return (...argv) => {
      let com = this.$refs[key];
      com = Array.isArray(com) ? com[0] : com;
      fn.bind(com)(...argv, com);
    };
  });
}

function insertFn(map, prop, eventName, callback) {
  if (!map[prop]) {
    map[prop] = {};
  }
  if (!map[prop][eventName]) {
    map[prop][eventName] = [];
  }
  if (checkType(callback, 'Array')) {
    map[prop][eventName].push(...callback);
  } else if (checkType(callback, 'Function')) {
    map[prop][eventName].push(callback);
  }
}

export default (options) => {
  let { configs, key } = {...DEFAULT_OPTION, ...options};
  return {
    computed: {
      listenersMap() {
        let map = {};
        this[configs].forEach((op, index)=>{
          let linkListeners = op.linkListeners;
          let listeners = op.listeners;
          let key = this.getKey(op, index);
          if (linkListeners) {
            Object.keys(linkListeners).forEach(prop => {
              Object.keys(linkListeners[prop]).forEach(eventName => {
                let lis = linkListeners[prop][eventName];
                insertFn(map, prop, eventName, insertThis.bind(this)(lis, key));
              });
            });
          }
          if (listeners) {
            Object.keys(listeners).forEach(eventName => {
              insertFn(map, key, eventName, insertThis.bind(this)(listeners[eventName], key));
            });
          }
        });
        return map;
      }
    },
    methods: {
      getKey(obj, index) {
        let _key = key.split('.').reduce((_obj, _key) =>{
          return _obj[_key];
        }, obj);
        return _key !== undefined ? _key : index;
      }
    }
  };
};
