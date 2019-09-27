<script>
  export default {
    data() {
      return {
        item_component: {
          functional: true,
          render(h, {props: {item}}) {
            let content = item.children.map(o => <p>{o.title}</p>);
            return (
              <div style={{width: '260px'}}>
                <h1>{item.title}</h1>
                {content}
              </div>
            );
          }
        },
        data: []
      };
    },
    created() {
      // 随机生成data
      this.initData();
    },
    methods: {
      initData() {
        let data = []
              for (let i = 1;i < 10; i++) {
                let children = [];
                let num = Math.ceil(Math.random() * 10);
                for (let j = 1;j <= num; j++) {
                  children.push({title: i + '-' + j});
                }
                data.push({
                  title: '菜单' + i,
                  id: i,
                  children
                });
              }
              this.data = data;
      }
    }
  };
</script>

<style>
.dj-waterfall-box-item-wrap h1{
  font-size: 14px;
}
.dj-waterfall-box-item-wrap p {
  margin-top: 16px;
}
</style>

## djWaterfallBox

瀑布流布局容器组件。

### 用法
:::demo `item-key`属性用来设置`data`数组中用于区别每个对象的key属性，在该例子中对象的title和id都是唯一的都可以当做`item-key`的值。`item-com`属性传入一个vue组件，该组件可以在props中接收到一个item属性（即`data`中的每个对象）。
```html
<template>
  <dj-waterfall-box :data="data" item-key="title" :column-number="4" :item-com="item_component"></dj-waterfall-box>
</template>
<script>
  export default {
    data() {
      return {
        item_component: {
          functional: true,
          render(h, {props: {item}}) {
            let content = item.children.map(o => <p>{o.title}</p>);
            return (
              <div style={{width: '260px'}}>
                <h1>{item.title}</h1>
                {content}
              </div>
            );
          }
        },
        data: []
      };
    },
    created() {
      // 随机生成data
      this.initData();
    },
    methods: {
      initData() {
        let data = [];
        for (let i = 1;i < 10; i++) {
          let children = [];
          let num = Math.ceil(Math.random() * 10);
          for (let j = 1;j <= num; j++) {
            children.push({title: i + '-' + j});
          }
          data.push({
            title: '菜单' + i,
            id: i,
            children
          });
        }
        this.data = data;
      }
    }
  };
</script>

<style>
  .dj-waterfall-box-item-wrap h1{
    font-size: 14px;
  }
  .dj-waterfall-box-item-wrap p {
    margin-top: 16px;
  }
</style>

```
:::

### djWaterfallBox 属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| data | 由模块对象组成的数组 | Array | —— | [] |
| item-com | 每个模块的渲染组件 | Object | —— | {} |
| item-key | 每个模块对象保存对象唯一值的key | String | —— | ‘id’ |

<a name="bf2cefb7"></a>
### djWaterfallBox 方法

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| scrollIntoView | 容器滚到可以显示目标元素的位置 | obj(data中的一个对象) |
| update | 更新瀑布流视图 | - |

