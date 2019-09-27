<script>
  let options = [
    {
      label: '黄金糕',
      value: 'gold'
    },
    {
      label: '双皮奶',
      value: 'double'
    },
    {
      label: '蚵仔煎',
      value: 'dog'
    },
    {
      label: '这是一种名字非常非常长的食物',
      value: 'food'
    },
    {
      label: '龙须面',
      value: 'long'
    },
    {
      label: '北京烤鸭',
      value: 'beijinkaoya'
    },
  ];
  export default {
    data() {
      return {
        configs: [
          {
            label: '数字',
            key: 'number',
            type: 'input',
            labelWidth: 100,
            attrs: {
              type: 'number',
              width: 300,
            },
          },
          {
            label: '小数',
            key: 'float',
            type: 'input',
            labelWidth: 100,
            labelPosition: 'right',
            attrs: {
              type: 'float',
              width: 300
            },
          },
          {
            label: '食物',
            key: 'select',
            type: 'select',
            labelWidth: 100,
            attrs: {
              options,
              width: 300
            },
          },
        ],
        data: {
          number: '',
          float: '',
          select: '',
        }
      }
    },
  }
</script>
## djItemBox
输入块组件

### 应用
:::demo
```html
<template>
  <div>
    <div v-for="item in configs" :key="item.key">
      <dj-item-box v-bind="item" v-model="data[item.key]"></dj-item-box>
      <div style="margin: 15px 0;"></div>
    </div>
  </div>
</template>

<script>
  let options = [
    {
      label: '黄金糕',
      value: 'gold'
    },
    {
      label: '双皮奶',
      value: 'double'
    },
    {
      label: '蚵仔煎',
      value: 'dog'
    },
    {
      label: '这是一种名字非常非常长的食物',
      value: 'food'
    },
    {
      label: '龙须面',
      value: 'long'
    },
    {
      label: '北京烤鸭',
      value: 'beijinkaoya'
    },
  ];
  export default {
    data() {
      return {
        configs: [
          {
            label: '数字',
            key: 'number',
            type: 'input',
            labelWidth: 100,
            attrs: {
              type: 'number',
              width: 300,
            },
          },
          {
            label: '小数',
            key: 'float',
            type: 'input',
            labelWidth: 100,
            labelPosition: 'right',
            attrs: {
              type: 'float',
              width: 300
            },
          },
          {
            label: '食物',
            key: 'select',
            type: 'select',
            labelWidth: 100,
            labelPosition: 'right',
            attrs: {
              options,
              width: 300
            },
          },
        ],
        data: {
          number: '',
          float: '',
          select: '',
        }
      }
    },
  }
</script>
```
:::


### djItemBox 属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| type(必填) | 类型（直接写组件名也能渲染出对应的组件） | String | input / select / checkbox / radio / switch / date / custom | - |
| label | 元素的标签名 | String | - | null |
| label-suffix | 补充说明 | String | - | '' |
| label-width | label宽度 | Number | - | null |
| label-position | label对其方式 | String | left / right / center | right |
| value | 传入元素的值 | any | - | null |
| attrs | 当前输入组件需要绑定的属性配置 | Object | - | - |
| component | 自定义组件对象（type为'custom'时生效） | Object | 参考基础组件 | baseInput |
| render | 自定义函数化组件方法（type为'custom'时生效，优先级比component高） | Function | - | - |
| type-map | 修改type的值对应使用的组件名称 | Object | - | - |

