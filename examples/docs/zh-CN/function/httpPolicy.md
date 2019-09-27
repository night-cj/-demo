## httpPolicy
组件内的http取消策略

### 要求
1.httpPolicy目前必须配合djweb-templates项目的api使用，否则无效   
2.djweb-templates项目在编写api方法时，只能接收一个参数，该参数必须直接作为http请求的参数使用。  
***
userApi.js
```javascript
import {user} from '../base-service/service';
export default {
  // 正确写法
  getUserInfo(params) {
    return user('/getUserInfo.do', params);
  },
  // 错误写法，这种api方法可以正常发送请求，但无法设置取消功能
  getUserInfo2(id) {
    return user('/getUserInfo.do', {id});
  }
};

```

### 作用
1.连续发送相同地址的请求时，只会发送一个请求。  
2.在上一个同地址的请求未结束时，发送新请求，上个请求将被取消。  
3.在组件销毁时未结束的请求也会被取消。  

### 用法
通过vue的mixins混入组件中，再通过提供的‘dj_api_extend’方法发送请求，第一个参数传api方法，第二个及之后的参数与api方法需要传的参数一致。

### 例子
直接调用api发送请求：  

userManage.vue
```vue
<template>
  <p>userManage</p>
</template>
<script>
  import userApi from './userApi';
  import { httpPolicy } from 'djweb';
  export default {
    name: 'userManage',
    //使用mixins混入后才能使用httpPolicy的方法
    mixins: [httpPolicy],
    created() {
      //正常使用api方法
      userApi.getUserInfo({id: 1});
      //使用httpPolicy策略的api方法
      this.dj_api_extend(userApi.getUserInfo, {id: 1}).then(res=>{});
      setTimeout(()=>{
        //上面的getUserInfo请求会被取消，并重新发送一个getUserInfo请求
        this.dj_api_extend(userApi.getUserInfo, {id: 1}).then(res=>{});
      }, 0);
    }
  };
</script>
```

### httpPolicy 方法
| 名称 | 说明 | 参数 |
| --- | --- | --- |
| dj_api_extend | 发起可取消的http请求 | api(api方法)，params(api方法需要传的参数) |
| cancel_token | 取消特定的http请求 | api(api方法) |
| cancel_all_request | 取消所有http请求 | - |
