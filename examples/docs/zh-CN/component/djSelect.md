<style>
.demo-select .el-select {
  width: 232px;
}
</style>
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
  let options2 = [
    {
      name: '黄金糕',
      id: 'gold'
    },
    {
      name: '双皮奶',
      id: 'double'
    },
    {
      name: '蚵仔煎',
      id: 'dog'
    },
    {
      name: '这是一种名字非常非常长的食物',
      id: 'food'
    },
    {
      name: '龙须面',
      id: 'long'
    },
    {
      name: '北京烤鸭',
      id: 'beijinkaoya'
    },
  ];
  export default {
    data() {
      return {
        singleConfig: {
          key: 'single',
          type: 'single',
          options
        },
        singleConfig2: {
          key: 'single2',
          type: 'single',
          keyMap: {
            label: 'name',
            value: 'id'
          },
          options: options2
        },
        multipleConfig: {
          key: 'multiple',
          type: 'multiple',
          options
        },
        multipleConfig2: {
          key: 'multiple2',
          type: 'multiple',
          'collapse-tags': true,
          options
        },
        singleServiceConfig: {
          key: 'singleService',
          type: 'singleService',
          service: this.getOptions
        },
        singleOffFormatConfig: {
          key: 'offFormat',
          type: 'offFormat',
          autoFormat: false,
          service: this.getOptions
        },
        bindObjectConfig: {
          key: 'bindObject',
          type: 'single',
          bindObject: true,
          options
        },
        bindObjectConfig2: {
          key: 'bindObject2',
          type: 'single',
          bindObject: true,
          keyMap: {
            value: 'id',
            label: 'name'
          },
          options: options2
        },
        bindObjectConfig3: {
          key: 'bindObject3',
          type: 'single',
          bindObject: true,
          options: ['aaa', 'bbb', 'ccc']
        },
        data: {
          single: '',
          single2: '',
          multiple: '',
          singleService: '',
          offFormat: '',
          bindObject: {},
          bindObject2: {},
          bindObject3: ''
        }
      }
    },
    methods: {
      getValue(value) {
        console.log(value);
      },
      getOptions() {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(options);
          }, 2000)
        });
      },
      selectItem(selected) {
        console.log(selected);
      }
    }
  }
</script>
## djSelect
选择控件组件

### 单选框
:::demo
```html
<template>
  <div>
    <dj-select v-bind="singleConfig" v-model="data[singleConfig.key]"></dj-select>
    <div style="margin: 15px 0;"></div>
    <dj-select v-bind="singleConfig2" v-model="data[singleConfig2.key]"></dj-select>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        singleConfig: {
          key: 'single',
          type: 'single',
          options: [
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
          ]
        },
        singleConfig2: {
          key: 'single2',
          type: 'single',
          keyMap: {
            label: 'name',
            value: 'id'
          },
          options: [
            {
              name: '黄金糕',
              id: 'gold'
            },
            {
              name: '双皮奶',
              id: 'double'
            },
            {
              name: '蚵仔煎',
              id: 'dog'
            },
            {
              name: '这是一种名字非常非常长的食物',
              id: 'food'
            },
            {
              name: '龙须面',
              id: 'long'
            },
            {
              name: '北京烤鸭',
              id: 'beijinkaoya'
            },
          ]
        },
        data: {
          single: '',
          single2: ''
        }
      }
    }
  }
</script>
```
:::

### 多选框
:::demo 名字过长时，将自动省略后半部分内容
```html
<template>
  <div>
    <dj-select v-bind="multipleConfig" v-model="data[multipleConfig.key]"></dj-select>
    <div style="margin: 15px 0;"></div>
    <dj-select v-bind="multipleConfig2" v-model="data[multipleConfig2.key]" :collapse-tags="true"></dj-select>
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
  ]
  export default {
    data() {
      return {
        multipleConfig: {
          key: 'multiple',
          type: 'multiple',
          options
        },
        multipleConfig2: {
          key: 'multiple',
          type: 'multiple',
          'collapse-tags': true,
          options
        },
        data: {
          multiple: '',
          multiple2: '',
        }
      }
    }
  }
</script>
```
:::

### 服务枚举框
:::demo
```html
<template>
  <dj-select v-bind="singleServiceConfig" v-model="data[singleServiceConfig.key]"></dj-select>
  <div style="margin: 15px 0;"></div>
  <el-button type="primary" size="mini" @click="() => this.$refs.offFormat.getOptions()">获取选项</el-button>
  <dj-select ref="offFormat" v-bind="singleOffFormatConfig" v-model="data[singleOffFormatConfig.key]"></dj-select>
</template>

<script>
  export default {
    data() {
      return {
        singleServiceConfig: {
          key: 'singleService',
          type: 'single',
          service: this.getOptions
        },
        singleOffFormatConfig: {
          key: 'offFormat',
          type: 'single',
          autoFormat: false,
          service: this.getOptions
        },
        data: {
          singleService: ''
          offFormat: ''
        }
      }
    },
    methods: {
      getOptions() {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(options);
          }, 2000)
        });
      }
    }
  }
</script>
```
:::

### 绑定对象
:::demo 设置`bindObject`为`true`后，v-model绑定的值将变成数组中的一项，而不是数组中一项的某个属性。
```html
<template>
  <div>
    <dj-select v-bind="bindObjectConfig" v-model="data[bindObjectConfig.key]" @change="getValue"></dj-select>
    <div style="margin: 15px 0;"></div>
    <dj-select v-bind="bindObjectConfig2" v-model="data[bindObjectConfig2.key]" @change="getValue"></dj-select>
    <div style="margin: 15px 0;"></div>
    <dj-select v-bind="bindObjectConfig3" v-model="data[bindObjectConfig3.key]" @change="getValue"></dj-select>
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
  let options2 = [
    {
      name: '黄金糕',
      id: 'gold'
    },
    {
      name: '双皮奶',
      id: 'double'
    },
    {
      name: '蚵仔煎',
      id: 'dog'
    },
    {
      name: '这是一种名字非常非常长的食物',
      id: 'food'
    },
    {
      name: '龙须面',
      id: 'long'
    },
    {
      name: '北京烤鸭',
      id: 'beijinkaoya'
    },
  ];
  export default {
    data() {
      return {
        bindObjectConfig: {
          key: 'bindObject',
          type: 'single',
          bindObject: true,
          options
        },
        bindObjectConfig2: {
          key: 'bindObject2',
          type: 'single',
          bindObject: true,
          keyMap: {
            value: 'id',
            label: 'name'
          },
          options: options2
        },
        bindObjectConfig3: {
          key: 'bindObject3',
          type: 'single',
          bindObject: true,
          options: ['aaa', 'bbb', 'ccc']
        },
        data: {
          bindObject: {},
          bindObject2: {},
          bindObject3: '',
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
| options | 枚举的配置项 | Array | - | [] |
| service | 若传入该属性，则作为获取枚举项的服务，替换默认options | Function | - | null |
| type | 单选或多选 | String | single/multiple |  |
| auto-format | 自否自动获取配置项 | Boolean | false/true | true |
| bind-object | 是否开启绑定对象 | Boolean | false/true | false |
| width | 组件输入框长度 | Number | - | 200 |
| key-map | 修改元素下拉选项(options)键值对 | Object | - | - |
| listeners | el-select绑定事件函数数组 | Array | - | - |
| sub-atrrs | el-option默认属性对象配置 | Object | - | - |
| - | 参考element配置 | - | - | - |

### keyMap Attributes
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| label | 配置项元素的标签key | String | - | label |
| value | 配置项元素的值key | String | - | value |

### 事件
| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| select-item | 当元素绑定的值发生改变时触发 | 接收当前选择项(单选为对象，多选为对象数组) |

### 方法
| 方法名称 | 说明 | 参数 |
| --- | --- | --- |
| getOptions | 若有service方法属性传入，则重新获取枚举项数据 | 接收一个枚举服务入参 |


