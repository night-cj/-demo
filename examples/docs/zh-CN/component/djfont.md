<style lang="less" scoped>
.title {
  font-size: 12px;
  color: #c0c4cc;
}
</style>
<script>
export default {
  data() {
    return {
      textContent: [{
        text: 'Head',
        fontSize: '38px'
      }, {
        text: 'Head',
        fontSize: '30px'
      },
      {
        text: 'Head',
        fontSize: '24px'
      },
      {
        text: 'Display',
        fontSize: '20px'
      },
      {
        text: 'Head',
        fontSize: '16px'
      },
      {
        text: 'Body',
        fontSize: '14px'
      },
      {
        text: 'Caption',
        fontSize: '12px'
      }]
    }
  }
}  
</script>
## Typography 字体

<el-row :style="{'margin-top': '50px'}">
  <el-col :span="8">中文 PingFang SC</el-col>
  <el-col :span="8">英文 San Francisco</el-col>
  <el-col :span="8">部分数字 DIN</el-col>
</el-row>

### Type Scale

<div>
  <el-row v-for="(item, index) in textContent" :key="index">
    <el-col class="title" :span="4" >{{item.text}}</el-col>
    <el-col :span="8" :style="{'font-size': item.fontSize}">Regular {{item.fontSize}}</el-col>
    <el-col :span="12" :style="{'font-size': item.fontSize}">字体 ABCDEF 01234</el-col>
  </el-row>
</div>