<script>
  import dayjs from 'dayjs';
  export default {
    data() {
      return {
        timerangeConfig: {
          type: 'timerange',
          default: ['00:00', '00:00']
        },
        daterangeConfig: {
          type: 'daterange'
        },
        datedupConfig: {
          type: 'datedup',
          default: [ "2019-06-05 00:00:00", "2019-06-05 23:59:59" ]
        },
        datetimerangeConfig: {
          type: 'datetimerange',
          default: [ "2019-06-05 00:00:00", "2019-06-18 23:59:59" ]
        },
        monthConfig: {
          type: 'month',
          default: ''
        },
        data: {
          timerange: '',
          datedup: '',
          month: '',
          daterange: '',
          datetimerange: ''
        }
      }
    },
    methods: {
      limitTowMonth(val) {
        let time = val;
        if (val[0] && val[1]) {
          let towMonth = dayjs(val[0]).add(60, 'day');
          if (towMonth.isBefore(dayjs(val[1])) ) {
            this.$message('时间范围不能超过两个月');
            time = [val[0], towMonth.toDate()];
          }
        }
        return time;
      }
    }
  }
</script>
## djTimePicker
时间选择器

### 时间范围
:::demo
```html
<template>
  <div>
    <dj-time-picker v-model="data.timerange" v-bind="timerangeConfig"></dj-time-picker>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        timerangeConfig: {
          type: 'timerange',
          default: ['00:00', '00:00']
        },
        data: {
          timerange: ''
        }
      }
    }
  }
</script>
```

:::


### 日期范围组件（拆分成两个）
:::demo
```html
<template>
  <div>
    <dj-time-picker v-model="data.datedup" v-bind="datedupConfig"></dj-time-picker>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        timerangeConfig: {
          type: 'datedup',
          default: [ "2019-06-05 00:00:00", "2019-06-05 23:59:59" ]
        },
        data: {
          datedup: ''
        }
      }
    }
  }
</script>
```
:::

### 日期范围组件（单个）
:::demo
```html
<template>
  <div>
    <dj-time-picker v-model="data.datetimerange" v-bind="datetimerangeConfig"></dj-time-picker>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        datetimerangeConfig: {
          type: 'datetimerange',
          default: [ "2019-06-05 00:00:00", "2019-06-05 23:59:59" ]
        },
        data: {
          datetimerange: ''
        }
      }
    }
  }
</script>
```
:::


### element默认时间选择器
:::demo
```html
<template>
  <div>
    <dj-time-picker v-model="data.month" v-bind="monthConfig"></dj-time-picker>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        timerangeConfig: {
          type: 'month',
          default: ''
        },
        data: {
          month: ''
        }
      }
    }
  }
</script>
```
:::


### 拦截数值变化并替换
:::demo 设置`before-change`可以拦截绑定值的变化，在经过自定义的处理后，再以方法返回的值作为最终变化值。
```html
<template>
  <div>
    <dj-time-picker 
      v-model="data[daterangeConfig.type]" 
      v-bind="daterangeConfig"
      :before-change="limitTowMonth"></dj-time-picker>
  </div>
</template>

<script>
  import dayjs from 'dayjs';
  export default {
    data() {
      return {
        daterangeConfig: {
          type: 'daterange'
        },
        data: {
          daterange: ''
        }
      }
    },
    methods: {
      limitTowMonth(val) {
        let time = val;
        if (val[0] && val[1]) {
          let towMonth = dayjs(val[0]).add(60, 'day');
          if (towMonth.isBefore(dayjs(val[1])) ) {
            this.$message('时间范围不能超过两个月');
            time = [val[0], towMonth.toDate()];
          }
        }
        return time;
      }
    }
  }
</script>
```
:::


### 组件传入参数
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| value / v-model | 绑定值 | String / String[] | null | null |
| type | 控件类型 | String | timerange / datedup / element 自带类型 | daterange |
| default | 元素默认值 | String / String[] | - | null |
| before-change | 拦截数值变化并替换方法 | Function | - | - |
| - | 参考element配置 | - | - | - |

### 事件
| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| - | 参考element事件 | - |
