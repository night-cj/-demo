export default class Store {
  state = {
    menus: [],
    favoriteMenu: [],
    unitMenus: [],
    observeList: []
  }
  setCacheMenus() {
    localStorage.setItem('favoriteMenu', JSON.stringify(this.state.favoriteMenu));
  }
  getMenus(menus = []) {
    this.state.menus = menus;
    this.state.unitMenus = this.state.menus.reduce((sum, item) => {
      sum = sum.concat(item.children || []);
      return sum;
    }, []);
    this.getCacheMenus();
  }
  getCacheMenus() {
    let cacheMenus = JSON.parse(localStorage.getItem('favoriteMenu')) || [];
    cacheMenus.forEach(menu => {
      let temp = this.state.unitMenus.find(item => item.path === menu.path);
      if (temp) {
        temp.collected = true;
        this.state.favoriteMenu.push(temp);
      }
    });
    this.setCacheMenus();
  }
  update(val) {
    this.state.observeList.forEach(fn => fn(val));
  }
  subscribe(fn) {
    this.state.observeList.push(fn);
  }
  unsubscribe(fn) {
    let deleteFnIndex = this.state.observeList.findIndex(_fn => _fn === fn);
    this.state.observeList.splice(deleteFnIndex, 1);
  }
  deleteMenu({menu, index}) {
    menu.collected = false;
    if (index !== 0) {
      index = index || this.state.favoriteMenu.findIndex(item => item.path === menu.path);
    }
    this.state.favoriteMenu.splice(index, 1);
    this.update();
    this.setCacheMenus();
  }
  addMenu(menu) {
    menu.collected = true;
    this.state.favoriteMenu.push(menu);
    this.update();
    this.setCacheMenus();
  }
}
