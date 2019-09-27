<script>
  export default {
    data() {
      return {
        data: {
          switch: ''
        }
      }
    }
  }
</script>
## djSwitch
选择控件组件

### 基础开关
:::demo
```html
<template>
  <div>
    <dj-switch v-model="data.switch"></dj-switch>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        data: {
          switch: ''
        }
      }
    }
  }
</script>
```
:::


### 组件传入参数
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| value / v-model | 绑定值 | any | - | null |
| default | 元素默认值 | Boolean | - | null |
| - | 参考element配置 | - | - | - |

### 事件
| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| - | 参考element事件 | - |


