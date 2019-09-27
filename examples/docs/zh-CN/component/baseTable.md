<style>
.current-date {
  margin-top: 15px;
}
</style>
<script>
  export default {
    data() {
      return {
        mergeColumns: [
          {
            prop: 'address1',
            label: '地址',
            merge: ['province', 'city', 'address']
          },
          {
            prop: 'msg',
            label: '配送信息',
            merge: ['name', 'address1']
          },
        ],
        columnTypeProps: {
          tree: {
            remotePromise(row) {
              console.log(row);
              return new Promise(resolve => {
                setTimeout(() => {
                  let data = [];
                  for (let i = 0; i < 2; i++) {
                    data.push({
                      id: new Date().getTime(),
                      name: 'saf'
                    });
                  }
                  resolve(data);          
                }, 1000);
              });
            }
          }
        },
        treeData: [{
            id: 1,
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            id: 2,
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            id: 3,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
            children: [{
                id: 31,
                date: '2016-05-01-1',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄',
                children: [{
                  id: 131,
                  date: '2016-05-01-1-1',
                  name: '王小虎',
                  address: '上海市普陀区金沙江路 1519 弄',                
                }]
              }, {
                id: 32,
                date: '2016-05-01-2',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }]
          }, {
            id: 4,
            child_num: true,
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }
        ],      
        selectRow: {},
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          province: '上海市',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海市',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄-xxxxxxx公寓A205'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海市',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海市',
          city: '普陀区',
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
        tableColumns3: [
          {
            label: '日期',
            prop: 'date',
            width: 120
          },
          {
            label: '姓名',
            prop: 'name',
            width: 120,
            fixed: 'left'
          },
          {
            label: '地址',
            prop: 'address',
            width: 1000
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
                  <div class="td-btn-group">
                    <a>{this.row.name}</a>
                    <span></span>
                    <a class="danger">{this.row.name}</a> 
                  </div>
                )
              }
            },
          },
          {
            label: '地址',
            prop: 'address',
            render(h, {props: {row}}) {
              return (
                <a>{row.address} - 1s</a>
              );
            }
          },
          {
            label: '操作',
            prop: 'id',
            component: {
              props: ['row'],
              render() {
                return (
                  <div class="td-btn-group">
                    <el-button size="mini" onClick={()=>this.$emit('edit', this.row.date)}>编辑</el-button>
                    <el-button type="danger" size="mini" onClick={()=>this.$emit('delete', this.row.date)}>删除</el-button>
                  </div>
                )
              }
            },
            listeners: {
              'edit': function (params) {
                alert(params);
              },
              'delete': function (params) {
                this.deleteRow(params);
              }.bind(this)
            }
          }
        ],
        mergeTableColumns: [
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
          },
          {
            label: '省份',
            prop: 'province'
          },
          {
            label: '市区',
            prop: 'city'
          }
        ],
        columnType: 	['selection', 'index'],
        bigData: [],
        container: undefined
      }
    },
    created() {
      let data = [];
      for (let i = 0; i < 10000; i++) {
        data.push({
          name: 'name-' + i,
          date: 'date-' + i,
          address: 'address-' + i
        });
      }
      this.bigData = data;
    },
    mounted() {
      this.container = document.querySelector('#app .main-cnt .page-component__scroll > .el-scrollbar__wrap');
    },
    methods: {
      getOtherData() {
        return new Promise(resolve => {
          setTimeout(()=>{
            let data = [];
            for (let i = 0; i < 10; i++) {
              data.push({
                name: 'name-' + (i + this.bigData.length),
                date: 'date-' + (i + this.bigData.length),
                address: 'address-' + (i + this.bigData.length)
              });
            }
            resolve(data);
          }, 5000);
        });
      },
      rowClick(row) {
        this.selectRow = row;
      },
      deleteRow(date) {
        this.tableData = this.tableData.filter(obj=>obj.date !== date);
      }
    }
  }
</script>
<style lang="less" scoped>
  .wrap {
    display: flex;
  }
  .box {
    width: 100px;
    height: 100px;
    background: red;
    flex-shrink: 0;
  }
  .box:hover {
    width: 500px;
  }
  .base-table {
    overflow: hidden;
  }
</style> 

## baseTable
baseTable是对el-table的封装，支持el-table的所有属性，以下不再赘述。

### 基础表格
:::demo `data`传数据，`columns`传列配置项。
```html
<template>
  <base-table :data="tableData" :columns="tableColumns"></base-table>
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

### 特殊列表格
:::demo
```html
<template>
  <base-table :column-type="columnType" :data="tableData" :columns="tableColumns"></base-table>
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
        ],
        columnType: 	['index', 'selection']
      }
    }
  }
</script>
```
:::

### 树形表格
:::demo 默认`children`中存放子数据,`children`中有数据时不触发remotePromise的方法，没有数据且`child_num`为true时触发remotePromise方法获取子数据，并存放到`children`中
```html
<template>
  <base-table :column-type="['tree']" :data="treeData" :columns="tableColumns" :column-type-props="columnTypeProps"></base-table>
</template>

<script>
  export default {
    data() {
      return {
        columnTypeProps: {
          tree: {
            remotePromise(row) {
              console.log(row);
              return new Promise(resolve => {
                setTimeout(() => {
                  let data = [];
                  for (let i = 0; i < 2; i++) {
                    data.push({
                      id: new Date().getTime(),
                      name: 'saf'
                    });
                  }
                  resolve(data);          
                }, 1000);
              });
            }
          }
        },
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
        treeData: [{
            id: 1,
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            id: 2,
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            id: 3,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
            children: [{
                id: 31,
                date: '2016-05-01-1',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄',
                children: [{
                  id: 131,
                  date: '2016-05-01-1-1',
                  name: '王小虎',
                  address: '上海市普陀区金沙江路 1519 弄',                
                }]
              }, {
                id: 32,
                date: '2016-05-01-2',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }]
          }, {
            id: 4,
            child_num: true,
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }
        ]
      }
    }
  }
</script>
```
:::

### 自定义列表格
:::demo 自定义列最好也设定一个唯一的`prop`值,虽然不会起作用。
```html
<template>
  <base-table :column-type="columnType" :data="tableData" :columns="tableColumns2"></base-table>
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
                  <div class="td-btn-group">
                    <a>{this.row.name}</a>
                    <span></span>
                    <a class="danger">{this.row.name}</a> 
                    <el-button type="mini" onClick={()=>this.$emit('edit', this.row.date)}>编辑</el-button>
                    <el-button type="mini" onClick={()=>this.$emit('delete', this.row.date)}>删除</el-button>
                  </div>
                )
              }
            },
            listeners: {
              'edit': function (params) {
                alert(params);
              },
              'delete': function (params) {
                this.deleteRow(params);
              }.bind(this)
            }
          },
          {
            label: '地址',
            prop: 'address',
            render(h, {props: {row}}) {
              return (
                <a>{row.address} - 1s</a>
              );
            }
          }
        ],
        columnType: ['index', 'selection']
      }
    },
    methods: {
      deleteRow(date) {
        this.tableData = this.tableData.filter(obj=>obj.date !== date);
      }
    }
  }
</script>
```
:::

### 可拖拽列表格
:::demo `is-draggable`开启拖拽，`multiple-select`开启多选(按住alt键)，这两个都开启就能实现多条拖拽。
```html
<template>
  <base-table is-draggable :data="tableData" :columns="tableColumns" multiple-select></base-table>
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

### 多级表头
:::demo `merge-columns`用于合并表头列，每一项就是一个合并列。
```html
<template>
  <base-table :merge-columns="mergeColumns" :data="tableData" :columns="mergeTableColumns"></base-table>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          province: '上海市',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海市',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海市',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海市',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        mergeColumns: [
          //将prop为'province'和'city'和 'address'的列合并为一列，新列prop为'address1'表头名为'地址'
          {
            prop: 'address1',
            label: '地址',
            merge: ['province', 'city', 'address']
          },
          //将prop为'name'和'address1'的列合并为一列，新列prop为'msg'表头名为'配送信息'
          {
            prop: 'msg',
            label: '配送信息',
            merge: ['name', 'address1']
          }
        ],
        mergeTableColumns: [
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
          },
          {
            label: '省份',
            prop: 'province'
          },
          {
            label: '市区',
            prop: 'city'
          }
        ]
      }
    }
  }
</script>
```
:::

### 开启横向悬浮滚动条
:::demo 开启悬浮滚动条必须设置`fixed-scrollbar`为true,并且传入它的外部滚动容器，即`fixed-scrollbar`。
```html
<template>
  <base-table :data="tableData" :columns="tableColumns3" fixed-scrollbar :container="container"></base-table>
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
        tableColumns3: [
          {
            label: '日期',
            prop: 'date',
            width: 120
          },
          {
            label: '姓名',
            prop: 'name',
            width: 120,
            fixed: 'left'
          },
          {
            label: '地址',
            prop: 'address',
            width: 1000
          }
        ]
      }
    }
    mounted() {
      this.container = document.querySelector('#app .main-cnt .page-component__scroll > .el-scrollbar__wrap');
    }
  }
</script>
```
:::

### 使用el-table或el-table-column的属性和事件（功能）
:::demo 想使用`el-table`的事件和属性只需直接将该属性或方法传给`base-table`即可，想使用`el-table-column`的属性或方法对列进行配置，只需要在`columns`属性的对应列对象中加入对应的属性即可。下面的例子使用了`el-table`的`height`属性和`row-click`事件，以及`el-table-column`的'fixed'属性。
```html
<template>
  <div>
    <base-table height="200" :data="tableData" :columns="tableColumns3" @row-click="rowClick"></base-table>
    <p class="current-date">选中行的日期：{{selectRow.date}}</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        selectRow: {},
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
        tableColumns3: [
          {
            label: '日期',
            prop: 'date',
            width: 120
          },
          {
            label: '姓名',
            prop: 'name',
            width: 120,
            fixed: 'left'
          },
          {
            label: '地址',
            prop: 'address',
            width: 1000
          }
        ]
      }
    },
    methods: {
      rowClick(row) {
        this.selectRow = row;
      }
    }
  }
</script>
```
:::

### 滚动加载表格（大数据量）
:::demo 不使用滚动加载的情况下，表格渲染会比较慢，并且可能会影响网页整体性能。使用了滚动加载后因为实际只渲染了很少一部分行列表所以性能会有很大提升。但是想要使用滚动加载也是有限制的，表格每行的高度必须是固定且统一的，否则在计算表格整体内容高度时会有问题。并且在行数据不超过50条时，该组件默认不使用滚动加载。以下例子模拟了一万条数据的情况下表格的滚动加载情况，总体来说还是非常流畅的。
```html
<template>
  <base-table scroll-load :data="bigData" :columns="tableColumns" :height="300"></base-table>
</template>

<script>
  export default {
    data() {
      return {
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
        bigData: []
      }
    },
    created() {
      let data = [];
      for (let i = 0; i < 10000; i++) {
        data.push({
          name: 'name-' + i,
          date: 'date-' + i,
          address: 'address-' + i
        });
      }
      this.bigData = data;
    }
  }
</script>
```
:::




### 懒加载表格
:::demo
```html
<template>
  <base-table scroll-load :data="bigData" :columns="tableColumns" :height="300" :lazy-total="10020" :lazy-remote="getOtherData"></base-table>
</template>

<script>
  export default {
    data() {
      return {
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
        bigData: []
      }
    },
    created() {
      let data = [];
      for (let i = 0; i < 50; i++) {
        data.push({
          name: 'name-' + i,
          date: 'date-' + i,
          address: 'address-' + i
        });
      }
      this.bigData = data;
    },
    methods: {
      getOtherData() {
        return new Promise(resolve => {
          setTimeout(()=>{
            let data = [];
            for (let i = 0; i < 10; i++) {
              data.push({
                name: 'name-' + (i + this.bigData.length),
                date: 'date-' + (i + this.bigData.length),
                address: 'address-' + (i + this.bigData.length)
              });
            }
            resolve(data);
          }, 5000);
        });
      }
    }  
  }
</script>
```
:::




### 自适应宽度表格
:::demo `resize-observer`控制是否自适应宽度
```html
<template>
<div class="wrap">
<div class="box"></div>
  <base-table :data="tableData" :columns="tableColumns"></base-table>
</div>
  
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

<style lang="less" scoped>
  .wrap {
    display: flex;
  }
  .box {
    width: 100px;
    height: 100px;
    background: red;
    flex-shrink: 0;
  }
  .box:hover {
    width: 500px;
  }
  .base-table {
    overflow: hidden;
  }
</style> 
```
:::

### baseTable 属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| container | table所在的外层滚动容器(开启悬浮横向滚动条时需要使用) | Dom | —— | —— |
| data | 显示的数据 | Array | —— | [] |
| loading | 控制表格loading动画的开关 | Boolean | true/false | false |
| page-no | 当前页码(影响表格序号) | Number | —— | 1 |
| page-size | 当前页数据最多展示数量(影响表格序号) | —— | 20 |  |
| columns | 表格的列配置项 | Array | —— | [] |
| multiple-select | 是否开启多选功能(按住alt可多选) | Boolean | true/false | false |
| column-type | 开启哪些特殊列 | Array | ['index', 'selection', 'tree', 'expand'] | [] |
| column-type-props | 特殊列的列配置(支持element-ui的table-column的全部属性) | Object | —— | —— |
| column-key-map | 修改列的配置的key值对应的功能 | Object | —— | —— |
| columns-props | 列的通用配置 | Object | —— | —— |
| columns-schema | 对所有列配置的处理 | Function | —— | —— |
| columns-handler | 对最终生成的列配置进行处理 | Function | —— | —— |
| fixed-scrollbar | 是否开启悬浮滚动条功能 | Boolean | true/false | false |
| is-draggable | 是否开启拖拽功能 | Boolean | true/false | false |
| scroll-load | 是否开启滚动加载（应对数据量较大时el-table渲染表格效率低的问题）（没有设置height或数据量小于50时不生效） | Boolean | true/false | false |
| reserve-num | 可视窗口外上下各预留多少行元素(开启滚动加载时生效) | Number | 大于1的自然数 | 10 |
| resize-observer | 是否开启响应式监听 | Boolean | true/false | true |
| lazy-remote | 懒加载获取数据方法(返回一个Promise对象) | Function | - | - |
| lazy-total | 懒加载时设置数据总条数（懒加载时必传值） | Number | >=0 | 0 |
| merge-columns | 合并表头列配置 | Array | - | [] |

columns 属性结构
```javascript
/**
* label : 普通列表头名称
* prop ：对应data中对象的key值(不能与其他列的prop重复)
* initialShow ：默认是否显示 
* width : 列的最小宽度
* showOverflowTooltip : 当内容过长被隐藏时显示 tooltip（elementUI的table-column的属性）
* component ： 控制当前列的每格渲染的自定义组件
* listeners ：自定义组件的事件触发监听
* render ： 自定义渲染函数
* propsHandler : 处理自定义组件接收到的props
*/

// 例子:
let columns = [
    {label: 'head1', prop: 'key1', initialShow: false, width: 90},
    {label: 'head2', prop: 'key2', 
      propsHandler(props) {
          return props;
      },
      component: {
        render(h) {
            let attrs = {
              class: 'component',
              on: {
                click: () => {
                  this.$emit('click', 'l am clicking!');
                }
              }
            };
            return h('span', attrs, this.row.key2+this.data);
          },
          props: ['row'],
          data(){
            return {
              data: new Date()
            }
          }
        }, 
      listeners: {
        'click': function (params) {
            alert(params);
        }
      }
    },
    {label: 'head3', prop: 'key3', showOverflowTooltip: false, 
      render() {
        return (<div>render</div>)
      }
    }]
```

columnTypeProps 结构
```javascript
/**
* selection : 对‘多选’特殊列的配置
* expand : 对‘展开’特殊列的配置
* index : 对‘序号’特殊列的配置
* tree : 对‘树结构’特殊列的配置
*     treeKey： data中对象的唯一id（默认值'id'）
*     fileIcon： 对于不需要展开的行所对应的图标类名（默认值'el-icon-document'）
*     levelKey： 设置通过data中对象的哪个key值判断行的深度（默认值'baseTable_level'）
*     childNumKey： 设置通过data中对象的哪个key值判断行的子行个数（默认值'child_num'）
*     childKey： 设置通过data中对象的哪个key值保存子元素数据（默认值'children'）
*     remotePromise： 远程获取数据方法返回一个Promise
*     indentSize： 设置父子行间的缩进大小（默认值12）
* 四个属性的配置支持el-table的特殊列组件的所有属性    
*/

 // 例子:
let columnTypeProps = {
    selection: {
      width: 55,
      reserveSelection: false
    },
    expand: {
      width: 48
    },
    index: {
      fixed: 'left',
      width: 80,
      label: '序号'
    },
    tree: {
      expandAll: false,
      treeKey: 'id',
      fileIcon: 'el-icon-document',
      levelKey: 'baseTable_level',
      childNumKey: 'child_num',
      width: 48,
      indentSize: 12,
      remotePromise(row) {
        return getList()
      }
    }
  }
```


### baseTable 事件
| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| multiple-select | 触发多选事件 | multipleSelectList（所有选中的对象列表） |
| change-column | 列配置改变事件 | —— |
| drag-end | 拖动结束事件 | event（事件对象）, row（行对象）, index（序号） |
| drag-start | 拖动开始事件 | event, row, index |
| scroll-to-bottom | 表格滚动到底的事件 | —— |
| drag-finish | 拖动结束事件 | data(拖动后的顺序) |

### baseTable slot

| 名称 | 说明 |
| --- | --- |
| expand | 行展开内容 |
| append | 插入至表格最后一行之后的内容，如果需要对表格的内容进行无限滚动操作，可能需要用到这个 slot。若表格有合计行，该 slot 会位于合计行之上。 |

