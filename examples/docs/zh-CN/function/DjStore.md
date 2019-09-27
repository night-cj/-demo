## DjStore
封装Vuex

### 作用
通过模块引入的数据自动生成getters映射

### 例子
```javascript
import Vue from 'vue';
import Vuex from 'vuex';
import DjStore from './djStore';
import tagsView from './modules/tagsView';
Vue.use(Vuex);
/**
 * DjStore对象已做自动getters映射,如果没有特殊需求不需要传getters
 */
const store = new DjStore(Vuex, {
  modules: {
    tagsView
  }
});
```
