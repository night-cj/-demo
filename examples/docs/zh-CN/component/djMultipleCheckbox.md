<script>
  export default {
    data() {
      return {
        isCheckBoxReady: true,
        childColumns: [
          {
            prop: 'id',
            label: '唯一值'
          },
          {
            prop: 'name',
            label: '名称'
          }
        ],
        parentList: [
          {
            id: 1,
            name: '一级列表-1',
            children: [
              {
                id: '1-1',
                name: '1-1'
              },
              {
                id: '1-2',
                name: '1-2'
              }
            ]
          },
          {
            id: 2,
            name: '一级列表-2',
            children: [
              {
                id: '2-1',
                name: '2-1'
              }
            ]
          }
        ],
        childColumns2: [
          {
            prop: 'id',
            label: 'id'
          }
        ],
        parentList2: [
          {
            id: '1',
            name: '一级列表-1'
          },
          {
            id: '2',
            name: '一级列表-2'
          }
        ],
        childColumns3: [
          {
            prop: 'code',
            label: '编码'
          },
          {
            prop: 'name',
            label: '名称'
          },
          {
            prop: 'english',
            label: '英文'
          }
        ],
        parentList3: [
          {
            code: '001',
            label: '水果',
            child: [
              {
                code: '001-1',
                name: '苹果',
                english: 'apple'
              },
              {
                code: '001-2',
                name: '香蕉',
                english: 'banana'
              },
              {
                code: '001-3',
                name: '橘子',
                english: 'orange'
              }
            ]
          },
          {
            code: '002',
            label: '蔬菜',
            child: [
              {
                code: '002-1',
                name: '卷心菜',
                english: 'cabbage'
              },
              {
                code: '002-2',
                name: '菠菜',
                english: 'Spinach'
              }
            ]
          },
          {
            code: '003',
            label: '家具',
            child: [
              {
                code: '003-1',
                name: '桌子',
                english: 'table'
              },
              {
                code: '003-2',
                name: '椅子',
                english: 'chair'
              },
              {
                code: '003-3',
                name: '沙发',
                english: 'sofa'
              },
              {
                code: '003-4',
                name: '床',
                english: 'bed'
              }
            ]
          }
        ],
        parentList4: [
          {
            code: '001',
            label: '水果',
            selectedList: [
              {
                code: '001-1',
                name: '苹果',
                english: 'apple'
              },
            ],
            child: [
              {
                code: '001-1',
                name: '苹果',
                english: 'apple'
              },
              {
                code: '001-2',
                name: '香蕉',
                english: 'banana'
              },
              {
                code: '001-3',
                name: '橘子',
                english: 'orange'
              }
            ]
          },
          {
            code: '002',
            label: '蔬菜',
            selectedList: [
              {
                code: '002-1',
                name: '卷心菜',
                english: 'cabbage'
              },
              {
                code: '002-2',
                name: '菠菜',
                english: 'Spinach'
              }
            ],
            child: [
              {
                code: '002-1',
                name: '卷心菜',
                english: 'cabbage'
              },
              {
                code: '002-2',
                name: '菠菜',
                english: 'Spinach'
              }
            ]
          },
          {
            code: '003',
            label: '家具',
            child: [
              {
                code: '003-1',
                name: '桌子',
                english: 'table'
              },
              {
                code: '003-2',
                name: '椅子',
                english: 'chair'
              },
              {
                code: '003-3',
                name: '沙发',
                english: 'sofa'
              },
              {
                code: '003-4',
                name: '床',
                english: 'bed'
              }
            ]
          }
        ]
      }
    },
    methods: {
      getChildren() {
        return new Promise(((resolve, reject) => {
          let arr = [];
          for(let i = 0; i < Math.random()*10; i++) {
            arr.push({
              id: i,
              name: 'aaa' + i
            });
          }
          console.log(arr.length);
          resolve(arr);
        }))
      },
      getResult() {
        console.log(this.parentList3);
      }
    }
  }
</script>

## djMultipleCheckbox
联级复选框

### 基础用法
:::demo
```html
<template>
  <dj-multiple-checkbox 
    :is-check-box-ready="isCheckBoxReady"
    :parent-list="parentList"
    parent-title="母标题"
    :child-columns="childColumns"></djMultipleCheckbox>
</template>
<script>
  export default {
    data() {
      return {
        isCheckBoxReady: true,
        childColumns: [
          {
            prop: 'id',
            label: '唯一值'
          },
          {
            prop: 'name',
            label: '名称'
          }
        ],
        parentList: [
          {
            id: 1,
            name: '一级列表-1',
            children: [
              {
                id: '1-1',
                name: '1-1'
              },
              {
                id: '1-2',
                name: '1-2'
              }
            ]
          },
          {
            id: 2,
            name: '一级列表-2',
            children: [
              {
                id: '2-1',
                name: '2-1'
              }
            ]
          }
        ]
      }
    }
  }
</script>
```
:::

### 远程获取子列表
:::demo
```html
<template>
  <dj-multiple-checkbox 
    :is-check-box-ready="isCheckBoxReady"
    :parent-list="parentList2"
    parent-title="母标题"
    :remote="getChildren"
    :child-columns="childColumns2"></djMultipleCheckbox>
</template>
<script>
  export default {
    data() {
      return {
        isCheckBoxReady: true,
        childColumns2: [
          {
            prop: 'id',
            label: 'id'
          }
        ],
        parentList2: [
          {
            id: '1',
            name: '一级列表-1'
          },
          {
            id: '2',
            name: '一级列表-2'
          }
        ]
      }
    },
    methods: {
      getChildren() {
        return new Promise(((resolve, reject) => {
          let arr = [];
          for(let i = 0; i < Math.random()*10; i++) {
            arr.push({
              id: i,
              name: 'aaa' + i
            });
          }
          console.log(arr.length);
          resolve(arr);
        }))
      }
    }
  }
</script>
```
:::

### 修改属性映射
:::demo
```html
<template>
  <div>
    <el-button @click="getResult">获得结果</el-button>
    <dj-multiple-checkbox 
        :is-check-box-ready="isCheckBoxReady"
        :parent-list="parentList3"
        parent-name="label"
        parent-key="code"
        parent-check="state"
        child-list-name="child"
        child-key="code"
        parent-title="类型"
        child-selected-list-name="selectedList"
        :child-columns="childColumns3"></djMultipleCheckbox>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        isCheckBoxReady: true,
        childColumns3: [
          {
            prop: 'code',
            label: '编码'
          },
          {
            prop: 'name',
            label: '名称'
          },
          {
            prop: 'english',
            label: '英文'
          }
        ],
        parentList3: [
          {
            code: '001',
            label: '水果',
            child: [
              {
                code: '001-1',
                name: '苹果',
                english: 'apple'
              },
              {
                code: '001-2',
                name: '香蕉',
                english: 'banana'
              },
              {
                code: '001-3',
                name: '橘子',
                english: 'orange'
              }
            ]
          },
          {
            code: '002',
            label: '蔬菜',
            child: [
              {
                code: '002-1',
                name: '卷心菜',
                english: 'cabbage'
              },
              {
                code: '002-2',
                name: '菠菜',
                english: 'Spinach'
              }
            ]
          },
          {
            code: '003',
            label: '家具',
            child: [
              {
                code: '003-1',
                name: '桌子',
                english: 'table'
              },
              {
                code: '003-2',
                name: '椅子',
                english: 'chair'
              },
              {
                code: '003-3',
                name: '沙发',
                english: 'sofa'
              },
              {
                code: '003-4',
                name: '床',
                english: 'bed'
              }
            ]
          }
        ]
      }
    },
    methods: {
      getResult() {
        console.log(this.parentList3);
      }
    }
  }
</script>
```
:::

### 设置初始选中
:::demo 设置初始选中时，如果子列表采用远程获取的方式，开发者必须手动设置母列表的选中状态，因为组件没有子列表数据没有办法判断母列表选中状态。
```html
<template>
  <div>
    <dj-multiple-checkbox 
        :is-check-box-ready="isCheckBoxReady"
        :parent-list="parentList4"
        parent-name="label"
        parent-key="code"
        parent-check="state"
        child-list-name="child"
        child-key="code"
        parent-title="类型"
        child-selected-list-name="selectedList"
        :child-columns="childColumns3"></djMultipleCheckbox>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        isCheckBoxReady: true,
        childColumns3: [
          {
            prop: 'code',
            label: '编码'
          },
          {
            prop: 'name',
            label: '名称'
          },
          {
            prop: 'english',
            label: '英文'
          }
        ],
        parentList4: [
          {
            code: '001',
            label: '水果',
            selectedList: [
              {
                code: '001-1',
                name: '苹果',
                english: 'apple'
              },
            ],
            child: [
              {
                code: '001-1',
                name: '苹果',
                english: 'apple'
              },
              {
                code: '001-2',
                name: '香蕉',
                english: 'banana'
              },
              {
                code: '001-3',
                name: '橘子',
                english: 'orange'
              }
            ]
          },
          {
            code: '002',
            label: '蔬菜',
            selectedList: [
              {
                code: '002-1',
                name: '卷心菜',
                english: 'cabbage'
              },
              {
                code: '002-2',
                name: '菠菜',
                english: 'Spinach'
              }
            ],
            child: [
              {
                code: '002-1',
                name: '卷心菜',
                english: 'cabbage'
              },
              {
                code: '002-2',
                name: '菠菜',
                english: 'Spinach'
              }
            ]
          },
          {
            code: '003',
            label: '家具',
            child: [
              {
                code: '003-1',
                name: '桌子',
                english: 'table'
              },
              {
                code: '003-2',
                name: '椅子',
                english: 'chair'
              },
              {
                code: '003-3',
                name: '沙发',
                english: 'sofa'
              },
              {
                code: '003-4',
                name: '床',
                english: 'bed'
              }
            ]
          }
        ]
      }
    }
  }
</script>
```
:::

### djMultipleCheckbox Attributes
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| is-check-box-ready | 级联复选框数据初始化完成 | Boolean | true/false | false |
| parent-list | 父级列表数据 | Array | - | [] |
| parent-name | 父级列表展示字段 | String | - | 'name' |
| parent-key | 父级列表唯一标识 | String | - | 'id |
| parent-title | 父级列表标题 | String | - | '' |
| parent-check | 父列表选中状态字段（ 0为不选 1为半选 2为全选） | String | - | 'checkStatus' |
| child-list-name | 子级列表字段 | String | - | 'children' |
| child-columns | 子列表字段和label配置项 | Array | - | [] |
| child-key | 子级列表唯一标识 | String | - | 'id' |
| child-selected-list-name | 所选子列表字段 | String | - | 'checkedList' |
| remote | 远程获取子列表方法(第一个参数为当前行的数据) | Function | - | - |
