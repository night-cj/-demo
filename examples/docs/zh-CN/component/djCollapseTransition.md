<script>
  export default {
    data() {
      return {
        visiable: false
      }
    },
  }
</script>
<style>
.test {
  width: 100px;
}
</style>
## djCollapseTransition
展开折叠(横向)

### 展开折叠(横向)
:::demo
```html
<template>
  <div>
    <el-button @click="visiable = !visiable">折叠</el-button>
    <dj-collapse-transition :visiable="visiable">
      <div class="test">
        折叠测试
      </div>
    </dj-collapse-transition>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        visiable: true
      }
    }
  }
</script>
```
:::
### 方法
| 方法名称 | 说明 | 参数 |
| --- | --- | --- |
| update | 更新dom | - |

### 组件传入参数
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| visiable | 是否收起折叠 | Boolean | - | false |
