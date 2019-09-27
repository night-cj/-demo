<script>
  export default {
    methods: {
      openFrame() {
        this.$refs.baseDialog.open();
      },
      close() {
        this.$message('关闭');
        this.$refs.baseDialog.close();
      },
      confirm() {
        this.$message('确认');
        this.$refs.baseDialog.close();
      }
    }
  }
</script>
<style lang="less" scoped>
.dj-content-box {
  position: relative;
  width: 800px;
  height: 200px;
}
</style>
## djContentBox
内容容器

### 内容容器
:::demo
```html
<template>
  <div class="dj-content-box">
    <dj-content-box>
      <div>
        <span>我是内容</span>
      </div>
    </dj-content-box>
  </div>
</template>

<script>
  export default {
    methods: {
      openFrame() {
        this.$refs.baseDialog.open();
      },
      close() {
        this.$message('关闭');
        this.$refs.baseDialog.close();
      },
      confirm() {
        this.$message('确认');
        this.$refs.baseDialog.close();
      }
    }
  }
</script>
<style lang="less" scoped>
  .dj-content-box {
    position: relative;
    width: 800px;
    height: 200px;
  }
</style>
```
:::


### 组件传入参数
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| title | 内容组件的标题 | String | - | null |
