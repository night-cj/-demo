<script>
  export default {
    data() {
      return {
        isLoading: false
      }
    },
    methods: {
      changeLoading() {
        this.isLoading = !this.isLoading;
      },
      handleClick(cancelLoading) {
        setTimeout(()=>{
          cancelLoading();
        }, 3000);
      }
    }
  }
</script>

## djButton
基础按钮组件，基于el-button封装，支持el-button的所有功能（属性，事件，插槽等）

### 防止连续点击
:::demo 可以通过djButton默认的加载规则来控制按钮的加载动画，也可以像el-button一样通过loading属性控制加载动画，loading具有更高的优先级
```html
<template>
  <div>
    <dj-button type="primary" @click="handleClick">button</dj-button>
    <dj-button type="primary" :loading="isLoading" @click="changeLoading">button</dj-button>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        isLoading: false
      }
    },
    methods: {
      changeLoading() {
        this.isLoading = !this.isLoading;
      },
      handleClick(cancelLoading) {
        setTimeout(()=>{
          cancelLoading();
        }, 3000);
      }
    }
  }
</script>
```
:::

### djButton methods
| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| click | 点击事件 | callback(Function:返回一个用于解除加载动画的方法) |
