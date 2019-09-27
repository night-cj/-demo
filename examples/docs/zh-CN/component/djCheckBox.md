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
              label: 'rap',
            },
            {
              label: '篮球'
            },
          ]
        },
        data: {
          switch: ['唱']
        }
      }
    }
  }
</script>
## djCheckBox
多选控件组件

### 控件
:::demo
```html
<template>
  <div>
    <dj-check-box v-model="data.switch" v-bind="config"></dj-check-box>
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
          switch: ['唱']
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
    <dj-check-box v-model="data.switch" v-bind="config1"></dj-check-box>
  </div>
</template>

<script>
  export default {
    data() {
      return {
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
              label: 'rap',
            },
            {
              label: '篮球'
            },
          ]
        },
        data: {
          switch: ['唱']
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
| 其他属性 | 参考element组件属性 | - | - | - |

### keyMap Attributes
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| label | 配置项元素的标签key | String | - | label |
| value | 配置项元素的值key | String | - | value |

### 事件
| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| input | 当元素绑定的值发生改变时触发 | 接收value参数 |
