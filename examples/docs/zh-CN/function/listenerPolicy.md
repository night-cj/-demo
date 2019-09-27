## listenerPolicy
组件内的事件监听策略

### 作用
在不必要的时候自动注销监听。  
1.在组件的生命周期到达beforeDestroy和deactivated（即组件销毁前和被缓存的组件不活动）时将取消该组件上的所有事件监听。  
2.当组件生命周期到达activated（即组件激活）时，在给所有元素自动加上之前的事件监听。

### 用法
通过vue的mixins混入组件中，再通过提供的‘addListener’方法设置事件监听

### 例子
```vue
<template>
  <p>userManage</p>
</template>
<script>
  import { listenerPolicy } from 'djweb';
  export default {
    name: 'userManage',
    //使用mixins混入后才能使用listenerPolicy的方法
    mixins: [listenerPolicy],
    created() {
      //正常事件监听，该监听在当前组件销毁时不会注销监听
      window.addEventListener('resize', this.resize);
      //含listenerPolicy策略的事件监听
      this.addListener(window, 'resize', this.resize);
    },
    methods: {
      resize() {
        console.log('resize');
      }
    }
  };
</script>
```

### listenerPolicy 方法
| 名称 | 说明 | 参数 |
| --- | --- | --- |
| setTimeRange | 设置默认限流时间(默认限流时间默认值为50,即50毫秒) | num(Number类型) |
| addListener | 增加事件监听 | element(dom元素), event（事件名）, handler（处理方法）, num(限流时间, 选填)|
| removeListener | 取消监听事件 | element(dom元素), event（事件名）, handler（处理方法）|
| escapeAllListener | 取消所有监听事件 | - |
