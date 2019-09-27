<script>
  export default {
    data() {
      return {
        config: {
          options: [
            {
              label: '唱'
            },
            {
              label: '跳'
            },
            {
              label: 'rap'
            },
            {
              label: '篮球'
            },
          ]
        },
        config1: {
          options: [
            {
              label: '唱',
              disabled: true
            },
            {
              label: '跳',
              disabled: true
            },
            {
              label: 'rap'
            },
            {
              label: '篮球'
            },
          ]
        },
        data: {
          radio: '唱'
        }
      }
    }
  }
</script>
## djRadio
单选控件组件

### 控件
:::demo
```html
<template>
  <div>
    <dj-radio v-model="data.radio" v-bind="config"></dj-radio>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        config: {
          options: [
            {
              label: '唱'
            },
            {
              label: '跳'
            },
            {
              label: 'rap'
            },
            {
              label: '篮球'
            },
          ]
        },
        data: {
          radio: ''
        }
      }
    }
  }
</script>
```
:::

### 禁用控件
:::demo
```html
<template>
  <div>
    <dj-radio v-model="data.radio" v-bind="config1"></dj-radio>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        config: {
          options1: [
            {
              label: '唱',
              disabled: true
            },
            {
              label: '跳',
              disabled: true
            },
            {
              label: 'rap'
            },
            {
              label: '篮球'
            },
          ]
        },
        data: {
          radio: '唱'
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
| value | 传入元素的值 | any | - | null |
| default | 元素默认值 | String | - | null |
| options | 枚举的配置项 | Array | - | [] |
| key-map | 修改元素选项(options)键值对 | Object | - | - |
| sub-atrrs | el-radio默认属性对象配置 | Object | - | - |
| - | 参考element配置 | - | - | - |

### keyMap Attributes
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| label | 配置项元素的标签key | String | - | label |
| value | 配置项元素的值key | String | - | value |

### 事件
| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| input | 当元素绑定的值发生改变时触发 | 接收value参数 |
