## Subject
订阅监听对象

### 作用
类似于DOM的addEventListener方法，先注册对应的事件及触发方法，再在必要时触发方法。区别在于addEventListener时自动触发事件，Subject需要手动触发事件。

### 应用场景
两个不存在父子关系的组件，在一个组件执行某些方法，该方法需要触发另一个组件的方法已到达数据和视图的同步更新时

### 例子
subject.js
```javascript
import { Subject } from 'djweb';
export default new Subject();
```

component1.vue
```vue
<template>
  <p>component1</p>
</template>
<script>
  import subject from 'subject.js';
  export default {
    name: 'component1',
    created() {
      subject.listen('need-resize', this.resize);
    },
    methods: {
      resize() {
        console.log('resize');
      }
    }
  };
</script>
```

component2.vue
```vue
<template>
  <dev>
    <p>component2</p>
    <el-button @click="hidden">hidden</el-button>
  </dev>
</template>
<script>
  import subject from 'subject.js';
  export default {
    name: 'component2',
    methods: {
      hidden() {
        console.log('hidden');
        subject.trigger('need-resize');
      }
    }
  };
</script>
```

### Subject 方法
方法名 | 说明 | 参数
-|-|-
listen | 注入事件名及对应触发方法 | name(自定义事件名)，fn(自定义方法)
trigger | 触发事件对应的方法 | name(自定义事件名)，后面的参数会传入到自定义方法中
remove | 移除某事件下所有触发方法或移除某事件下的某个触发方法 | name(自定义事件名)，fn(触发方法，可不传)
hasListen | 判断当前对象是否有注册事件 | -
getList | 获取保存事件及触发方法的对象 | -


