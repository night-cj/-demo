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
        inputSearchConfig: [
          {
            label: '输入框：',
            key: 'input',
            type: 'input'
          },
          {
            label: '数字框：',
            key: 'number',
            type: 'input',
            attrs: {
              type: 'number'
            }
          },
          {
            label: '小数框：',
            key: 'float',
            type: 'input',
            attrs: {
              type: 'float'
            }
          },
        ],
        timeSearchConfig: [
          {
            label: '时间范围：',
            key: 'timerange',
            type: 'date',
            attrs: {
              type: 'timerange'
            }   
          },
          {
            label: '日期（月）：',
            key: 'month',
            type: 'date',
            attrs: {
              type: 'month'
            }   
          },
          {
            label: '日期范围（精确到日）：',
            key: 'daterange',
            type: 'date',
            attrs: {
              type: 'daterange',
              'default': [ "2019-06-05 00:00:00", "2019-06-05 23:59:59" ]
            }  
          },
          {
            label: '日期范围（精确到秒）：',
            key: 'datetimerange',
            type: 'date',
            attrs: {
              type: 'datetimerange',
              default: [ "2019-06-05 00:00:00", "2019-06-05 23:59:59" ]
            }  
          },
          {
            label: '日期范围组件（拆分成两个）：',
            key: 'datedup',
            type: 'date',
            attrs: {
              type: 'datedup',
              default: [ "2019-06-05 00:00:00", "2019-06-05 23:59:59" ]
            }  
          },
        ],
        selectSearchConfig: [
          {
            label: '单选：',
            key: 'single',
            type: 'select',
            attrs: {
              type: 'single',
              options
            },
            listeners: {
              'select-item': item => {
                console.log(item);
              }
            }
          },
          {
            label: '多选：',
            key: 'multiple',
            type: 'select',
            attrs: {
              type: 'multiple',
              'collapse-tags': true,
              options
            }  
          },
          {
            label: '服务枚举：',
            key: 'serviceSingle',
            type: 'select',
            attrs: {
              type: 'single',
              service: this.getBaseOptions
            }
          },
        ],
        othersSearchConfig: [
          {
            label: '复选：',
            key: 'checkbox',
            type: 'checkbox',
            attrs: {
              default: [ "跳", "rap", "篮球" ],
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
                }
              ]
            }
          },
          {
            label: '多选：',
            key: 'radio',
            type: 'radio',
            attrs: {
              default: '唱',
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
                }
              ]
            }
          }
        ],
        customConfig: [
          {
            label: '自定义组件：',
            key: 'custom',
            type: 'custom',
            render: (h, {props}) => {
              return (
                <div>
                  <div>拿到的type: {props.type}</div>
                  <div>拿到的value: {props.value}</div>
                  <div>拿到的label: {props.label}</div>
                </div>
              )
            },
            options: options
          },
        ],
        listenerSearchConfig: [
          {
            key: 'aaa',
            label: 'A',
            type: 'input',
            linkListeners: {
              bbb: {
                input: (val, com) => {
                  console.log('aaa-', val);
                  console.log('aaa-', com);
                }
              }
            }
          }, {
            key: 'bbb',
            label: 'B',
            type: 'input',
            linkListeners: {
              bbb: {
                input: (val, com) => {
                  console.log('bbb-', val);
                  console.log('bbb-', com);
                }
              }
            }
          }
        ]
      }
    },
    methods: {
      getBaseOptions() {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(options);
          }, 4000)
        });
      }
    }
  }
</script>
<style lang="less" scoped>
.search {
  &-1, &-2, &-3, &-4 {
    position: relative;
    overflow: hidden;
  }
  &-1 {
    height: 150px;
  }
  &-2 {
    height: 300px;
  }
  &-3 {
    height: 200px;
  }
  &-4 {
    height: 200px;
  }
}
</style>
## djSearch
搜索组件

### 输入项
:::demo
```html
<template>
  <div class="search-1">
    <dj-search :config="inputSearchConfig"></dj-search>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        inputSearchConfig: [
          {
            label: '输入框：',
            key: 'input',
            type: 'input'
          },
          {
            label: '数字框：',
            key: 'number',
            type: 'input',
            attrs: {
              type: 'number'
            }
          },
          {
            label: '小数框：',
            key: 'float',
            type: 'input',
            attrs: {
              type: 'float'
            }
          },
        ],
      }
    }
  }
</script>
<style lang="less" scoped>
  .search-1 {
    position: relative;
    height: 150px;
    overflow: hidden;
  }
</style>
```
:::

### 时间选择项
:::demo
```html
<template>
  <div class="search-2">
    <dj-search :config="timeSearchConfig"></dj-search>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        timeSearchConfig: [
          {
            label: '时间范围：',
            key: 'timerange',
            type: 'date',
            attrs: {
              type: 'timerange'
            }   
          },
          {
            label: '日期（月）：',
            key: 'month',
            type: 'date',
            attrs: {
              type: 'month'
            }   
          },
          {
            label: '日期范围（精确到日）：',
            key: 'daterange',
            type: 'date',
            attrs: {
              type: 'daterange',
              default: [ "2019-06-05 00:00:00", "2019-06-05 23:59:59" ]
            }  
          },
          {
            label: '日期范围（精确到秒）：',
            key: 'datetimerange',
            type: 'date',
            attrs: {
              type: 'datetimerange',
              default: [ "2019-06-05 00:00:00", "2019-06-05 23:59:59" ]
            }  
          },
          {
            label: '日期范围组件（拆分成两个）：',
            key: 'datedup',
            type: 'date',
            attrs: {
              type: 'datedup',
              default: [ "2019-06-05 00:00:00", "2019-06-05 23:59:59" ]
            }  
          },
        ],
      }
    }
  }
</script>
<style lang="less" scoped>
  .search-2 {
    position: relative;
    height: 300px;
    overflow: hidden;
  }
</style>
```
:::

### 枚举项
:::demo
```html
<template>
  <div class="search-3">
    <dj-search :config="selectSearchConfig"></dj-search>
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
        selectSearchConfig: [
          {
            label: '单选：',
            key: 'single',
            type: 'select',
            attrs: {
              type: 'single',
              options
            },
            listeners: {
              'select-item': item => {
                console.log(item);
              }
            }
          },
          {
            label: '多选：',
            key: 'multiple',
            type: 'select',
            attrs: {
              type: 'multiple',
              'collapse-tags': true,
              options
            },
          },
          {
            label: '服务枚举：',
            key: 'serviceSingle',
            type: 'select',
            attrs: {
              type: 'single',
              service: this.getBaseOptions
            }
          },
        ],
      }
    },
    methods: {
      getBaseOptions() {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(options);
          }, 4000)
        });
      }
    }
  }
</script>
<style lang="less" scoped>
  .search-3 {
    position: relative;
    height: 200px;
    overflow: hidden;
  }
</style>
```
:::

### 其他
:::demo
```html
<template>
  <div class="search-3">
    <dj-search :config="othersSearchConfig"></dj-search>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        othersSearchConfig: [
          {
            label: '复选：',
            key: 'checkbox',
            type: 'checkbox',
            attrs: {
              default: [ "跳", "rap", "篮球" ],
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
                }
              ]
            }
          },
          {
            label: '多选：',
            key: 'radio',
            type: 'radio',
            attrs: {
              default: '唱',
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
                }
              ]
            }  
          }
        ]
      }
    }
  }
</script>
<style lang="less" scoped>
  .search-3 {
    position: relative;
    height: 200px;
    overflow: hidden;
  }
</style>
```
:::

### 传入自定义组件
:::demo
```html
<template>
  <div class="search-4">
    <dj-search :config="customConfig"></dj-search>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        customConfig: [
          {
            label: '自定义组件：',
            key: 'custom',
            type: 'custom',
            render: (h, {props}) => {
              return (
                <div>
                  <div>拿到的type: {props.type}</div>
                  <div>拿到的value: {props.value}</div>
                  <div>拿到的label: {props.label}</div>
                </div>
              )
            },
            options: options
          },
        ],
      }
    },
  }
</script>
<style lang="less" scoped>
  .search-4 {
    position: relative;
    height: 200px;
    overflow: hidden;
  }
</style>
```
:::


### 模块间事件监听
:::demo 在`linkListeners`下可以设置对其他模块的事件的监听，第一层级填写模块名(即key的值)，第二层级填写事件名。如下例子`bbb`为模块名,`input`为该模块的事件名。
```html
<template>
  <div class="search-4">
    <dj-search :config="listenerSearchConfig"></dj-search>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        listenerSearchConfig: [
          {
            key: 'aaa',
            label: 'A',
            type: 'input',
            linkListeners: {
              bbb: {
                input: (val, com) => {
                  console.log('aaa-', val);
                  console.log('aaa-', com);
                }
              }
            }
          }, {
            key: 'bbb',
            label: 'B',
            type: 'input',
            linkListeners: {
              bbb: {
                input: (val, com) => {
                  console.log('bbb-', val);
                  console.log('bbb-', com);
                }
              }
            }
          }
        ]
      }
    },
  }
</script>
<style lang="less" scoped>
  .search-4 {
    position: relative;
    height: 200px;
    overflow: hidden;
  }
</style>
```
:::


### 组件传入参数
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| config | 传入搜索组件数据源 | Array | - | [] |
| disabled | 查询按钮是否禁用 | String | - | null |

### config Attributes
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| key | 搜索元素对应的字段名，必传字段 | String | - | null |
| size | 自定义组件为长元素的字段名 | String | long | null |
| listeners | 当前输入组件需要绑定的事件配置 | Object | - | - |
| linkListeners | 设置对其他模块的事件监听 | Object | - | - |
| ---- | 其他属性参考itemBox等 | String | null | null |

### 事件
| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| search | 点击搜索按钮触发的搜索事件 | 一个对象参数，内容为当前各搜索条件的key和value |
| change | 搜索条件改变时触发的事件 | query, item |
| before-reset | 数据重置前触发 | - |

点击重置按钮会重置为默认值

### 方法
| 方法名称 | 说明 | 参数 |
| --- | --- | --- |
| search | 调用查询，手动触发查询 | - |

