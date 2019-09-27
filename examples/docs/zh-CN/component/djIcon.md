<style lang="less" scoped>
  .demo-djIcon .source i {
    color: #606266;
    margin: 0 20px;
    font-size: 1.5em;
    vertical-align: middle;
  }
  .icon-list {
    overflow: hidden;
    list-style: none;
    padding: 0!important;
    border: 1px solid #eaeefb;
    border-radius: 4px;
    margin: 10px 0;
    font-size: 14px;
    color: #5e6d82;
    line-height: 2em;
    li {
      float: left;
      width: 16.66%;
      text-align: center;
      height: 120px;
      line-height: 120px;
      color: #666;
      font-size: 13px;
      border-right: 1px solid #eee;
      border-bottom: 1px solid #eee;
      margin-right: -1px;
      margin-bottom: -1px;
      i {
        display: block;
        font-size: 32px;
        margin-bottom: 15px;
        color: #606266;
        transition: color .15s linear;
      }
      span {
        display: inline-block;
        vertical-align: middle;
        line-height: normal;
        font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
        color: #99a9bf;
        transition: color .15s linear;
      }
    }
    li:after {
      content: "";
      height: 100%;
    }
  }
</style>
<script>
  import Icon from '../../../icon.json'
  export default {
    data() {
      return {
        icon: Icon
      }
    }
  }
</script>
## 图标
提供了一套common图标集合。
### 使用方法

直接通过设置类名为 `dj-common- ` 和 `dj-common-search-n` 来使用即可。

:::demo
```html
<i class="dj-common-search-n"></i>
<i class="dj-common-customservice-n"></i>
<i class="dj-common-home-n"></i>

```
:::

带有图标的按钮，通过添加 `icon` 属性使用

:::demo
```html
<el-button type="primary" size="medium" icon="dj-common-add-n">新增</el-button>
<el-button type="primary" size="medium" icon="dj-common-upload-n">上传</el-button>
<el-button type="primary" size="medium" icon="dj-common-addalter">编辑</el-button>
<el-button type="primary" size="medium" icon="el-icon-delete">删除</el-button>
<el-button type="primary" size="medium" icon="dj-common-search-n">搜索</el-button>
<el-button type="primary" size="medium" icon="dj-common-save-n">保存</el-button>

```
:::

### 图标集合
<ul class="icon-list">
  <li v-for="name in icon" :key="name">
    <span>
      <dj-icon :name="'dj-common-'+ name"></dj-icon>
      <span class="icon-name">{{'dj-common-' + name}}</span>
    </span>
  </li>
</ul>
