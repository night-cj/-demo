<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        tableColumns: [
          {
            label: '日期',
            prop: 'date'
          },
          {
            label: '姓名',
            prop: 'name'
          },
          {
            label: '地址',
            prop: 'address'
          }
        ],
        tableColumns2: [
          {
            label: '日期',
            prop: 'date'
          },
          {
            label: '姓名',
            prop: 'name',
            component: {
              props: ['row'],
              render() {
                return (
                  <a>{this.row.name}</a> 
                )
              }
            }
          },
          {
            label: '地址',
            prop: 'address'
          }
        ],
        columnType: 	['index', 'selection'],
        bigData: []
      }
    },
    methods: {
      selectRow(index, bool) {
        this.$refs.djTable.childComponents.reTable.toggleRowSelection(this.tableData[index], bool);
      },
      selectAll() {
        this.$refs.djTable.childComponents.reTable.toggleAllSelection();
      }
    }
  }
</script>

## djTable
djTable是对baseTable的再次封装，加入的分页组件，开放了列显示/隐藏功能，列配置项缓存的功能，djTable有所有baseTable的属性和事件，以下不再赘述

### 基础表格
djTable自带筛选列功能，默认使用分页组件。具体分页展示逻辑需要自己写。
:::demo
```html
<template>
  <dj-table :total="1000" :column-type="['index']" :data="tableData" :columns="tableColumns"></dj-table>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        tableColumns: [
          {
            label: '日期',
            prop: 'date'
          },
          {
            label: '姓名',
            prop: 'name'
          },
          {
            label: '地址',
            prop: 'address'
          }
        ]
      }
    }
  }
</script>
```
:::


### 静态分页
在前端做分页逻辑时可以用该方法（即不通过发送请求去后端获得每页的数据的情况下）。
:::demo
```html
<template>
  <dj-table 
    :data="tableData" 
    :columns="tableColumns" 
    static-paging 
    :total="tableData.length" 
    :page-size-list="[1,2,4,7]" 
    :default-page-size="1"
    :column-type="['index']"></dj-table>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        tableColumns: [
          {
            label: '日期',
            prop: 'date'
          },
          {
            label: '姓名',
            prop: 'name'
          },
          {
            label: '地址',
            prop: 'address'
          }
        ]
      }
    }
  }
</script>
```
:::

### 顶部插槽
:::demo
```html
<template>
  <dj-table 
    :data="tableData" 
    :columns="tableColumns" 
    static-paging 
    :total="tableData.length">
    <div slot="btn">
      <el-button>按钮1</el-button>
      <el-button>按钮2</el-button>
      <span>hehehe</span>
    </div>
  </dj-table>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        tableColumns: [
          {
            label: '日期',
            prop: 'date'
          },
          {
            label: '姓名',
            prop: 'name'
          },
          {
            label: '地址',
            prop: 'address'
          }
        ]
      }
    }
  }
</script>
```
:::

### 列配置缓存
列宽和筛选列将被缓存到localstorage中,刷新网页不会重置列宽和筛选列。
:::demo
```html
<template>
  <dj-table 
    :data="tableData" 
    :columns="tableColumns" 
    static-paging
    border
    is-cache-columns
    cache-columns-name="cacheTable"
    :total="tableData.length" 
    :column-type="['index']"></dj-table>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        tableColumns: [
          {
            label: '日期',
            prop: 'date'
          },
          {
            label: '姓名',
            prop: 'name'
          },
          {
            label: '地址',
            prop: 'address'
          }
        ]
      }
    }
  }
</script>
```
:::


### 调用el-table的方法
:::demo `dj-table`实例下会有一个`childComponents`属性，该属性下存放了`dj-table`组件下的所有子组件的实例，其中`reTable`属性下存放的即是`el-table`的实例，该实例下可以调用`el-table`的方法。
```html
<template>
  <dj-table 
    ref="djTable"
    :data="tableData" 
    :columns="tableColumns" 
    static-paging
    :total="tableData.length" 
    :column-type="['selection']">
    <div slot="btn">
      <el-button type="primary" @click="selectRow(1, true)">选中第二行</el-button>
      <el-button type="primary" @click="selectRow(3, true)">选中第四行</el-button>
      <el-button type="primary" @click="selectAll">全选</el-button>
    </div>
</dj-table>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        tableColumns: [
          {
            label: '日期',
            prop: 'date'
          },
          {
            label: '姓名',
            prop: 'name'
          },
          {
            label: '地址',
            prop: 'address'
          }
        ]
      }
    },
    methods: {
      selectRow(index, bool) {
        this.$refs.djTable.childComponents.reTable.toggleRowSelection(this.tableData[index], bool);
      },
      selectAll() {
        this.$refs.djTable.childComponents.reTable.toggleAllSelection();
      }
    }   
  }
</script>
```
:::


### djTable 属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| is-cache-columns | 是否开启列配置缓存功能（缓存到浏览器的localstorage中） | Boolean | true/false | false |
| cache-columns-name | 设置缓存的列配置名称 | String | 'table' |  |
| total | 数据总条数 | Number | >=0 | 0 |
| page-size-list | 每页最大条数可选列表 | Array | —— | [10, 20, 50, 100] |
| default-page-size | 默认每页最大条数值 | Number | pageSizeList中的一个值 | 15 |
| is-need-page | 控制是否需要分页组件 | Boolean | true/false | true |
| static-paging | 控制是否静态分页（data传入所有数据，组件自动进行分页） | Boolean | true/false | false |

### djTable 事件
| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| update-data | 表格数据需要更新事件 | page |

### djTable 方法
| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| changePage | 改变页码 | pageNow, boolean(true时不触发update-data事件，反之触发) |
| changeSize | 改变每页最大条数 | pageSize |
| updateData | 触发update-data事件 | —— |
