<style lang="less" scoped>
</style>

## djSelectBox
自定义滚动条容器组件。

### 固定高度
:::demo 在`scroll-box`组件外层套一层设定了固定高度的元素，当内容超出时就会产生自定义滚动条。
```html
<template>
  <div class="dj-select-box">
    <dj-select-box label="下拉选择器">
    </dj-select-box>
  </div>
</template>

<style lang="less" scoped>
</style> 
```
:::


### 插槽(slot)
| name | 说明 |
| --- | --- |
| value | 控件左侧内容 |
| content | 下拉框内容 |
