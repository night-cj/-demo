<script>
  export default {
    data() {
      return {
        pageSizeList: [1,5,9,15,33,70],
        total: 1000,
        pageNo: 2,
        pageSize: 9
      }
    },
    methods: {
      changePage(page) {
        this.pageNo = page;
        console.log(page);
      },
      changeSize(size) {
        this.pageSize = size;
        console.log(size);
      }
    }
  }
</script>

## djPaging
分页组件,继承element的pagination组件的所有方法和事件（除page-sizes、current-page两个属性）

### 正常用法
:::demo 外部传入的pageNo和pageSize需要在监听事件中更新。
```html
<template>
  <div>
    <dj-paging 
        :total="total" 
        :page-no="pageNo" 
        :page-size="pageSize" 
        :page-size-list="pageSizeList" 
        @change-page="changePage" 
        @change-size="changeSize">    
    </dj-paging>
    <el-button type="primary" @click="changePage(8)">跳到第8页</el-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        pageSizeList: [1,5,9,15,33,70],
        total: 1000,
        pageNo: 2,
        pageSize: 9
      }
    },
    methods: {
      changePage(page) {
        this.pageNo = page;
        console.log(page);
      },
      changeSize(size) {
        this.pageSize = size;
        console.log(size);
      }
    }
  }
</script> 
```
:::

### 使用element的pagination组件的属性
:::demo `layout`为`<pagination>`组件的属性
```html
<template>
  <dj-paging 
    :total="total" 
    :page-no="pageNo"
    layout="sizes, prev, pager, next"
    :page-size="pageSize">
  </dj-paging>
</template>

<script>
  export default {
    data() {
      return {
        total: 1000,
        pageNo: 2,
        pageSize: 9
      }
    }
  }
</script> 
```
:::

### djPaging 属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| total | 数据总条数 | Number | >=0 | —— |
| page-size-list | 每页最大条数可选列表 | Array | —— | [15, 30, 50, 100, 200] |
| page-no | 当前页码 | Number | —— | 1 |
| page-size | 当前每页最大显示条数 | Number | —— | page-size-list的第一个值 |

### djPaging 事件
| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| change-page | 页数改变时触发 | pageNo |
| change-size | 最大条数改变时触发 | pageSize |
