import { hasValue_arr } from "../../utils/methods";
export default class Subject {
  constructor() {
    this.list = {};
  }
  listen = (key, callback) => {
    if (!this.list[key]) {
      this.list[key] = [];
    }
    this.list[key].push(callback);
  };
  trigger = (key, ...value) => {
    if (!this.list[key]) return;
    this.list[key].forEach(callback => {
      callback(...value);
    });
  };
  remove = (key, fn) => {
    let fns = this.list[key];
    if (!fns) {
      return false;
    }
    if (!fn) {
      fns && (fns.length = 0);
    } else {
      for (let i = fns.length - 1; i >= 0; i--) {
        let _fn = fns[i];
        if (_fn === fn) {
          fns.splice(i, 1);
        }
      }
    }
  };
  hasListen = (key) => {
    return hasValue_arr(this.list[key]);
  };
  getList = () => {
    return this.list;
  }
}
