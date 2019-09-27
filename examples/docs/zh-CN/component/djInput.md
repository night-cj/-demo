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
        inputConfig: {
          key: 'input',
          type: 'input',
        },
        passwordConfig: {
          key: 'password',
          type: 'password',
        },
        numberConfig: {
          label: '数字',
          key: 'number',
          type: 'number',
        },
        floatConfig: {
          label: '两位小数',
          key: 'float',
          type: 'float',
        },
        textareaConfig: {
          key: 'textarea',
          type: 'textarea',
          height: 100
        },
        serviceInputConfig: {
          label: '远程搜索',
          key: 'serviceInput',
          type: 'service',
          service: () => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve(options);
              }, 1000);
            })
          },
          render: (h, {props: {item}}) => {
            return (
              <div>
                <div style={{'float': 'left'}}>{ item.label }</div>
                <span style={{'float': 'right'}}>{ item.value }</span>
              </div>
            )
          }
        },
        regConfig: {
          label: '数字',
          key: 'reg',
          type: 'input',
          reg: /^\d*$/
        },
        data: {
          input: '',
          number: '',
          float: '',
          reg: '',
          textarea: '',
          password: '',
          serviceInput: '',
        }
      }
    },
  }
</script>
## djInput
输入控件组件

### 输入框
:::demo
```html
<template>
  <dj-input v-bind="inputConfig" v-model="data[inputConfig.key]"></dj-input>
</template>

<script>
  export default {
    data() {
      return {
        inputConfig: {
          key: 'input',
          type: 'input',
        },
        data: {
          input: ''
        }
      }
    }
  }
</script>
```
:::

### 密码框
:::demo
```html
<template>
  <dj-input v-bind="passwordConfig" v-model="data[passwordConfig.key]"></dj-input>
</template>

<script>
  export default {
    data() {
      return {
        passwordConfig: {
          key: 'password',
          type: 'password',
        },
        data: {
          password: ''
        }
      }
    }
  }
</script>
```
:::

### 数字框
:::demo
```html
<template>
  <dj-input suffix-label="mm" v-bind="numberConfig" v-model="data[numberConfig.key]"></dj-input>
</template>

<script>
  export default {
    data() {
      return {
        numberConfig: {
          label: '数字',
          key: 'number',
          type: 'number',
        },
        data: {
          number: ''
        }
      }
    }
  }
</script>
```
:::

### 小数框
:::demo
```html
<template>
  <dj-input v-bind="floatConfig" v-model="data[floatConfig.key]"></dj-input>
</template>

<script>
  export default {
    data() {
      return {
        floatConfig: {
          label: '小数',
          key: 'float',
          type: 'float',
        },
        data: {
          float: ''
        }
      }
    }
  }
</script>
```
:::

### 正则输入框
:::demo
```html
<template>
  <dj-input v-model="data[regConfig.key]" v-bind="regConfig"></dj-input>
</template>

<script>
  export default {
    data() {
      return {
        regConfig: {
          label: '数字',
          type: 'input',
          key: 'reg',
          reg: /^\d*$/
        },
        data: {
          reg: ''
        }
      }
    }
  }
</script>
```
:::

### 文本域
:::demo
```html
<template>
  <dj-input v-bind="textareaConfig" v-model="data[textareaConfig.key]"></dj-input>
</template>

<script>
  export default {
    data() {
      return {
        textareaConfig: {
          label: '富文本编辑',
          key: 'textarea',
          type: 'textarea',
          height: 200
        },
        data: {
          textarea: ''
        }
      }
    }
  }
</script>
```
:::

### 远程搜索
从服务端搜索数据，并且自定义模板
:::demo
```html
<template>
  <dj-input v-bind="serviceInputConfig" v-model="data[serviceInputConfig.key]"></dj-input>
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
        serviceInputConfig: {
          label: '远程搜索',
          key: 'serviceInput',
          type: 'service',
          service: (val) => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve(options);
              }, 1000);
            })
          },
          render: (h, {props: {item}}) => {
            return (
              <div>
                <div style={{'float': 'left'}}>{ item.label }</div>
                <span style={{'float': 'right'}}>{ item.value }</span>
              </div>
            )
          }
        },
        data: {
          serviceInput: ''
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
| default | 元素默认值 | String | - | null |
| type | 元素类型 | String | number / float / input / textarea | input / service |
| width | 组件输入框长度 | Number | - | 200 |
| subscript | textarea是否有下标字数 | Boolean | true/false | true |
| reg | 正则表达式限制输入 | RegExp | - | - |
| render | 自定义模板，写法参考table自定义列配置(当 type 为 service 时) | - | - |
| service | 远程获取枚举项api(当 type 为 service 时) | - | - |
| value-key | 配置项中绑定值的key名 | String | - | value |
| suffix-label | 设置输入框的后缀文本，一般用于展示输入框值的单位 | String | - | - |
| - | 参考element配置 | - | - | - |

### 事件
| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| - | 参考element事件 | - |



