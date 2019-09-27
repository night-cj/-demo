<script>
  export default {
    data() {
      return {
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        data: [{
          label: '1',
          children: [
            {
              label: '1-1',
              children: [{label: '1-1-1'},{label: '1-1-2'},{label: '1-1-3'},{label: '1-1-4'}]
            },
            {
              label: '1-2',
              children: [{label: '1-2-1'},{label: '1-2-2'},{label: '1-2-3'},{label: '1-2-4'},{label: '1-2-5'}]
            },
            {
              label: '1-3',
              children: [{label: '1-3-1'},{label: '1-3-2'}]
            }
          ]
        }]
      }
    }
  }
</script>  

<style lang="less" scoped>
  .dj-scroll-box-wrap1 {
    height: 100px;
    border: 1px solid #dcdfe6;
    p {
      padding-left: 20px;
    }
  }
  .dj-scroll-box-wrap2 {
    border: 1px solid #dcdfe6;
    /deep/ .dj-scroll-box {
      .el-scrollbar {
        position: relative;
        .el-scrollbar__wrap {
          max-height: 200px;
          overflow-x: scroll;
        }
      }
    }
  }
</style>

## djScrollBox
自定义滚动条容器组件。

### 固定高度
:::demo 在`dj-scroll-box`组件外层套一层设定了固定高度的元素，当内容超出时就会产生自定义滚动条。
```html
<template>
  <div class="dj-scroll-box-wrap1">
    <dj-scroll-box>
      <p v-for="n in 100">{{n}}</p>
    </dj-scroll-box>
  </div>
</template>

<style lang="less" scoped>
  .dj-scroll-box-wrap1 {
    height: 100px;
    border: 1px solid #dcdfe6;
    p {
      padding-left: 20px;
    }
  }
</style> 
```
:::

### 设置最大高度
:::demo 想要实现设置最大高度的功能，关键需要将容器元素下类名为`el-scrollbar__wrap`的元素设置最大高度，在容器外层设置最大高度是没有用的。
```html
<template>
  <div class="dj-scroll-box-wrap2">
    <dj-scroll-box>
      <el-tree :data="data" :props="defaultProps"></el-tree>
    </dj-scroll-box>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        data: [{
          label: '1',
          children: [
            {
              label: '1-1',
              children: [{label: '1-1-1'},{label: '1-1-2'},{label: '1-1-3'},{label: '1-1-4'}]
            },
            {
              label: '1-2',
              children: [{label: '1-2-1'},{label: '1-2-2'},{label: '1-2-3'},{label: '1-2-4'},{label: '1-2-5'}]
            },
            {
              label: '1-3',
              children: [{label: '1-3-1'},{label: '1-3-2'}]
            }
          ]
        }]
      }
    }
  }
</script>

<style lang="less" scoped>
  .dj-scroll-box-wrap2 {
    border: 1px solid #dcdfe6;
    /deep/ .dj-scroll-box {
      .el-scrollbar {
        position: relative;
        .el-scrollbar__wrap {
          max-height: 200px;
          overflow-x: scroll;
        }
      }
    }
  }
</style> 
```
:::

### djScrollBox 属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| is-on-resize | 是否监听resize事件 | Boolean | true/false | true |

### djScrollBox 方法

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| moveToTarget | 容器滚到可以显示目标元素的位置 | el |
