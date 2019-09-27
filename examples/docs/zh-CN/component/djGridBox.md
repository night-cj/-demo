<script>
  export default {
    data() {
      return {
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
        ],
        options2: [
          {
            label: '客户名称',
            value: 0,
          },
          {
            label: '相关问题咨询方式',
            value: 0,
          },
          {
            label: '纸箱外，供应商品',
            value: 0,
          },
          {
            label: '使用的软件',
            value: 1,
          },
          {
            label: '设计人员人数',
            value: 1,
          },
          {
            label: '设备维护周期',
            value: 1,
          },
          {
            label: '监测设备',
            value: 2,
          },
          {
            label: '保存图纸方式',
            value: 2,
          },
          {
            label: '打样方式',
            value: 2,
          },
          {
            label: '监测人员人数',
            value: 3,
          },
          {
            label: '版面图纸制造方',
            value: 3,
          },
          {
            label: '配材',
            value: 3,
          },
          {
            label: '是否纸箱打样需求',
            value: 4,
          },
          {
            label: '版面设计费',
            value: 4,
          },
          {
            label: '打样箱型',
            value: 5,
          },
          {
            label: '外部刀模设计费用',
            value: 5,
          },
          {
            label: '图纸制作方',
            value: 6,
          },
          {
            label: '是否外箱设计需求',
            value: 6,
          },
          {
            label: '材料性能监测需求',
            value: 6,
          },
          {
            label: '是否需要实验验证',
            value: 7,
          },
          {
            label: '是否需要培训技能',
            value: 7,
          },
          {
            label: '是否品质异常会议',
            value: 7,
          },
          {
            label: '包装咨询涉及方面',
            value: 8,
          },
          {
            label: '包装咨询涉及方面2',
            value: 8,
          },
          {
            label: '包装咨询涉及方面3',
            value: 9,
          }
        ]
      }
    },
    methods: {
      rowRule(item) {
        let map = {
          gold: 0,
          double: 0,
          dog: 0,
          food: 1,
          long: 1,
          beijinkaoya: 2
        };
        return map[item.value];
      },
      colRule(item) {
        return 12;
      },
      rowRule2(item) {
        return item.value;
      },
      colRule2(item) {
        if (item.label === '包装咨询涉及方面3') {
          return 24;
        }
        return 8;
      }
    }
  }
</script>

## djGridBox
栅格布局容器。
为了实现djForm的每个模块的自定义布局功能而产生的组件，可以用来对结构相似的页面进行统一布局。

### 快速分列
:::demo `data`需要传入一个对象数组，一个对象即是一个模块，模块内容自己定义，设置`column-num`可以快速对模块进行分列，在结构比较统一时使用。
```html
<template>
  <dj-grid-box :data="options" :column-num="2">
    <template slot-scope="{item}">
      <label>{{item.label}}:</label><el-input></el-input>
    </template>
  </dj-item-box>
</template>

<script>
  export default {
    data() {
      return {
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
      }
    }
  }
</script>
```
:::

### 自定义分行
:::demo 在`column-num`不适用时，可以使用`row-rule`自定义模块如何分行，`row-rule`需要传入一个方法，方法的第一个参数为当前模块，第二个参数为当前模块在`data`中的序号（index），该方法需要返回当前模块需要放入的行数，行数从0开始，即如果想将模块放入第2行，方法返回1即可。
```html
<template>
  <dj-grid-box :data="options" :row-rule="rowRule">
    <template slot-scope="{item}">
      <label>{{item.label}}:</label><el-input></el-input>
    </template>
  </dj-item-box>
</template>

<script>
  export default {
    data() {
      return {
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
      }
    },
    methods: {
      rowRule(item) {
        let map = {
          gold: 0,
          double: 0,
          dog: 0,
          food: 1,
          long: 1,
          beijinkaoya: 2
        };
        return map[item.value];
      }
    }
  }
</script>
```
:::

### 自定义控宽
:::demo `col-rule`属性可以对模块的宽度（百分比宽度）进行自定义调整，`col-rule`接收一个方法，方法需要返回当前模块在当前行所占比例（1-24），即如果模块需要占半行则返回12，需要占整行则返回24。
```html
<template>
  <dj-grid-box :data="options" :col-rule="colRule">
    <template slot-scope="{item}">
      <label>{{item.label}}: </label><el-input></el-input>
    </template>
  </dj-item-box>
</template>

<script>
  export default {
    data() {
      return {
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
      }
    },
    methods: {
      colRule(item) {
        return 12;
      }
    }
  }
</script>
```
:::


### 混合使用
:::demo
```html
<template>
  <dj-grid-box :data="options2" :row-rule="rowRule2" :col-rule="colRule2">
    <template slot-scope="{item}">
      <label>{{item.label}}:</label><el-input></el-input>
    </template>
  </dj-item-box>
</template>

<script>
  export default {
    data() {
      return {
        options2: [
          {
            label: '客户名称',
            value: 0,
          },
          {
            label: '相关问题咨询方式',
            value: 0,
          },
          {
            label: '纸箱外，供应商品',
            value: 0,
          },
          {
            label: '使用的软件',
            value: 1,
          },
          {
            label: '设计人员人数',
            value: 1,
          },
          {
            label: '设备维护周期',
            value: 1,
          },
          {
            label: '监测设备',
            value: 2,
          },
          {
            label: '保存图纸方式',
            value: 2,
          },
          {
            label: '打样方式',
            value: 2,
          },
          {
            label: '监测人员人数',
            value: 3,
          },
          {
            label: '版面图纸制造方',
            value: 3,
          },
          {
            label: '配材',
            value: 3,
          },
          {
            label: '是否纸箱打样需求',
            value: 4,
          },
          {
            label: '版面设计费',
            value: 4,
          },
          {
            label: '打样箱型',
            value: 5,
          },
          {
            label: '外部刀模设计费用',
            value: 5,
          },
          {
            label: '图纸制作方',
            value: 6,
          },
          {
            label: '是否外箱设计需求',
            value: 6,
          },
          {
            label: '材料性能监测需求',
            value: 6,
          },
          {
            label: '是否需要实验验证',
            value: 7,
          },
          {
            label: '是否需要培训技能',
            value: 7,
          },
          {
            label: '是否品质异常会议',
            value: 7,
          },
          {
            label: '包装咨询涉及方面',
            value: 8,
          },
          {
            label: '包装咨询涉及方面2',
            value: 8,
          },
          {
            label: '包装咨询涉及方面3',
            value: 9,
          }
        ]
      }
    },
    methods: {
      rowRule2(item) {
        return item.value;
      },
      colRule2(item) {
        if (item.label === '包装咨询涉及方面3') {
          return 24;
        }
        return 8;
      }
    }
  }
</script>
```
:::


### djGridBox 属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| data | 排版内容需要数据 | Array | - | [] |
| column-num | 设置分成几列（传了`row-rule`后该参数失效） | Number | - | 1 |
| row-rule | 控制分行，参数（1:当前模块，2:当前模块在data的index序号），返回当前模块所在行数 | Function | - | - |
| col-rule | 控制占宽，参数（1:当前模块，2:当前模块在data的index序号，3:默认占宽，4:当前行的所有占宽），返回当前模块占宽 | Function | - | - |

