<style lang="less" scoped>
  .el-row-status {
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .el-button-primary-hover .el-button {
    background: #526DF6;
    border-color: #526DF6;
    color: #FFFFFF;
  }
  .el-button-plain-hover .el-button {
    background: #3654ea;
    border-color: #3654ea;
    color: #fff;
  } 
  .el-button-default-hover .el-button {
    color: #3654ea;
    border-color: #a3aee7;
    background: #f8f9fd;
  } 
  .el-button-text-hover .el-button {
    color: #526df6;
    border-color: transparent;
    background-color: transparent;
  } 
  .el-button-text-danger-hover .el-button {
    color: #FF4E4E;
    border-color: transparent;
    background-color: transparent;
  } 
  .el-button-active .el-button {
    background: #3F55C2;
    border-color: #3F55C2;
    color: #FFFFFF;
    outline: none;
  } 
  .el-button-text-active .el-button {
    color: #233fc9;
    border-color: transparent;
    background-color: transparent;
  } 
  .el-button-text-danger-active .el-button {
    color: #e85657;
    border-color: transparent;
    background-color: transparent;
  } 
</style>
## 按钮

### 普通

:::demo
```html
<el-row>
  <el-col :span="5">
    <el-button type="primary" size="medium">主要按钮</el-button>
  </el-col>
  <el-col :span="5">
    <el-button type="primary" plain size="medium">主要按钮</el-button>
  </el-col>
  <el-col :span="5">
    <el-button size="medium">次要按钮</el-button>
  </el-col>
  <el-col :span="4">
    <el-button type="text">纯文字按钮</el-button>
  </el-col>
  <el-col :span="4">
    <button type="button" class="el-button el-button--text-danger">
      <span>危险文字按钮</span>
    </button>
  </el-col>
</el-row>
<el-row>
  <el-col :span="5">
    <el-button type="success" size="medium">成功按钮</el-button>
  </el-col>
  <el-col :span="5">
    <el-button type="success" plain size="medium">成功按钮</el-button>
  </el-col>
  <el-col :span="5">
    <el-button type="danger" size="medium">危险按钮</el-button>
  </el-col>
  <el-col :span="5">
    <el-button type="danger" plain size="medium">危险按钮</el-button>
  </el-col>
</el-row>

```
:::

### 状态色

<el-row class="el-row-status">
  <el-col :span="5" class="el-button-primary-hover">
    <el-button type="primary" size="medium">悬停</el-button>
  </el-col>
  <el-col :span="5" class="el-button-plain-hover">
    <el-button type="primary" plain size="medium">悬停</el-button>
  </el-col>
  <el-col :span="5" class="el-button-default-hover">
    <el-button size="medium">悬停</el-button>
  </el-col>
  <el-col :span="4" class="el-button-text-hover">
    <el-button type="text">悬停</el-button>
  </el-col>
  <el-col :span="4" class="el-button-text-danger-hover">
    <button type="button" class="el-button el-button--text-danger">
      <span>悬停</span>
    </button>
  </el-col>
</el-row>
<el-row class="el-row-status">
  <el-col :span="5" class="el-button-active">
    <el-button type="primary" size="medium">点击</el-button>
  </el-col>
  <el-col :span="5" class="el-button-active">
    <el-button type="primary" plain size="medium">点击</el-button>
  </el-col>
  <el-col :span="5" class="el-button-active">
    <el-button size="medium">点击</el-button>
  </el-col>
  <el-col :span="4" class="el-button-text-active">
    <el-button type="text">点击</el-button>
  </el-col>
  <el-col :span="4" class="el-button-text-danger-active">
    <button type="button" class="el-button el-button--text-danger">
      <span>点击</span>
    </button>
  </el-col>
</el-row>
<el-row class="el-row-status">
  <el-col :span="5">
    <el-button type="primary" disabled size="medium">禁用</el-button>
  </el-col>
  <el-col :span="5">
    <el-button type="primary" plain disabled size="medium">禁用</el-button>
  </el-col>
  <el-col :span="5">
    <el-button disabled size="medium">禁用</el-button>
  </el-col>
  <el-col :span="4">
    <el-button type="text" disabled>禁用</el-button>
  </el-col>
  <el-col :span="4">
    <el-button type="text" disabled>禁用</el-button>
  </el-col>
</el-row>

### 尺寸组件

大号按钮主要通过 ` size="large"` 来设置尺寸为 `152px * 40px`

:::demo
```html

<el-row>
  <el-col :span="5">
    <el-button type="primary" size="large">大号按钮</el-button>
  </el-col>
  <el-col :span="5">
    <el-button type="primary" plain size="large">大号按钮</el-button>
  </el-col>
  <el-col :span="5">
    <el-button size="large">大号按钮</el-button>
  </el-col>
  <el-col :span="5">
    <el-button disabled size="large">大号按钮</el-button>
  </el-col>
</el-row>

```
:::

主要按钮主要通过 ` size="medium"` 来设置尺寸为 `112px*36px`

:::demo
```html

<el-row>
  <el-col :span="5">
    <el-button type="primary" size="medium">主要按钮</el-button>
  </el-col>
  <el-col :span="5">
    <el-button type="primary" plain size="medium">主要按钮</el-button>
  </el-col>
  <el-col :span="5">
    <el-button size="medium">主要按钮</el-button>
  </el-col>
  <el-col :span="5">
    <el-button size="medium" disabled>主要按钮</el-button>
  </el-col>
</el-row>
```
:::

小按钮主要通过 ` size="small"` 来设置尺寸为 `72px*32px`

:::demo
```html

<el-row>
  <el-col :span="5">
    <el-button type="primary" size="small">小按钮</el-button>
  </el-col>
  <el-col :span="5">
    <el-button type="primary" size="small" plain>小按钮</el-button>
  </el-col>
  <el-col :span="5">
    <el-button size="small">小按钮</el-button>
  </el-col>
  <el-col :span="5">
    <el-button size="small" disabled>小按钮</el-button>
  </el-col>
</el-row>
```
:::

