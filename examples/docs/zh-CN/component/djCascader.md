<script>
  export default {
    data() {
      return {
        data: ['11', '1121', '112132'],
        apiArray: [
          [
            {
              label: 'aa',
              value: '11',
            },
            {
              label: 'ab',
              value: '12',
            },
            {
              label: 'ac',
              value: '13',
            },
          ],
          [
            {
              label: 'ba',
              value: '21',
            },
            {
              label: 'bb',
              value: '22',
            },
            {
              label: 'bc',
              value: '23',
            },
          ],
          [
            {
              label: 'ca',
              value: '31',
            },
            {
              label: 'cb',
              value: '32',
            },
            {
              label: 'cc',
              value: '33',
            },
          ]
        ].map(item => (val) => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve(item.map(ket => ({...ket, value: val ? val + ket.value : ket.value})));
            }, 100)
          })
        })
      }
    }
  }
</script>
## djCascader
联级选择器

### 联级选择器
:::demo
```html
<template>
  <div>
    <dj-cascader :api-array="apiArray" v-model="data" :props="{ checkStrictly: false }"></dj-cascader>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        data: ['11', '1121', '112132'],
        apiArray: [
          [
            {
              label: 'aa',
              value: '11',
            },
            {
              label: 'ab',
              value: '12',
            },
            {
              label: 'ac',
              value: '13',
            },
          ],
          [
            {
              label: 'ba',
              value: '21',
            },
            {
              label: 'bb',
              value: '22',
            },
            {
              label: 'bc',
              value: '23',
            },
          ],
          [
            {
              label: 'ca',
              value: '31',
            },
            {
              label: 'cb',
              value: '32',
            },
            {
              label: 'cc',
              value: '33',
            },
          ]
        ].map(item => (val) => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve(item.map(ket => ({...ket, value: val ? val + ket.value : ket.value})));
            }, 100)
          })
        })
      }
    }
  }
</script>
```
:::


### 组件传入参数
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| v-model | 绑定值 | any | - | null |
| width | 组件输入框长度 | Number | - | 200 |
| api-array | 传入的api数组,api反参格式需要为([{label: any, value: any}]) | Array | - | null |
| --- | 参考element属性 | String | - | label |

### 事件
| 事件名称 | 说明 | 回调参数 |
| single-select | checkStrictly为false时获取选中项节点事件 | --- |
| select | true | --- |
| --- | 参考element事件 | --- |
