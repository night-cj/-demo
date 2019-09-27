<style lang="less" scoped>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .color-box {
    float: left;
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .content-box {
    float: left;
    width: 80px;
    height: 30px;
    margin-top: 10px;
    line-height: 30px;
    text-align: center;
  }
  .color-text {
    float: left;
    margin: 3px 0 0 20px;
    div {
      margin-bottom: 5px;
    }
    span {
      font-size: 12px;
      color: #606266;
    }
  }
</style>
<script>
  export default {
    data() {
      return {
        mainColor: [
          [{
            label: '重点提醒色',
            colorText: '#3654EA'
          },
          {
            label: '成功提示色',
            colorText: '#40B317'
          }],
          [{
            label: '提醒色',
            colorText: '#F89816'
          },
          {
            label: '警示色',
            colorText: '#FF0000'
          }]
        ],
        textColor: [
          [{
            label: '主标题色、重要icon色',
            colorText: '#303133'
          },
          {
            label: '次要信息色、默认文字色',
            colorText: '#606266'
          }],
          [{
            label: '禁用文字色',
            colorText: '#909399'
          },
          {
            label: '暗提示色、次要icon色',
            colorText: '#C0C4CC'
          }]
        ],
        bgColor: [
          [{
            label: '禁用按钮底色',
            colorText: '#DBE1EA'
          },
          {
            label: '网页底板颜色',
            colorText: '#F0F2F5'
          }],
          [{
            label: '输入下拉框等空间失效背景色',
            colorText: '#F5F7FA'
          },
          {
            label: '表头颜色',
            colorText: '#FAFAFA'
          }]
        ],
        lineColor: [
          [{
            label: '控件默认边框色',
            colorText: '#DCDFE6'
          },
          {
            label: '表格边框和分割线色',
            colorText: '#EBEEF5'
          }],
        ],
        statusColor: [
          [{
            label: '次要按钮背景描边色',
            colorText: '#E7EBFF / #A3AEE7',
            statusStyle: {
              backgroundColor: '#E7EBFF',
              'border': '1px solid #A3AEE7'
            }
          },
          {
            label: '经过',
            statusStyle: {
              backgroundColor: '#526DF6',
            },
            colorText: '#526DF6'
          }],
          [{
            label: '普通',
            statusStyle: {
              backgroundColor: '#3654EA',
            },
            colorText: '#3654EA'
          },
          {
            label: '点击',
            statusStyle: {
              backgroundColor: '#3F55C2',
            },
            colorText: '#3F55C2'
          }]
        ],
        contentColor: [
          [{
            label: '普通',
            contentStyle: {
              backgroundColor: '#FFFFFF',
              color: '#606266',
            },
            colorText: '#FFFFFF / #606266'
          },
          {
            label: '经过',
            contentStyle: {
              backgroundColor: '#F8F9FD',
              color: '#606266',
            },
            colorText: '#F8F9FD / #606266'
          }],
          [{
            label: '点击',
            contentStyle: {
              backgroundColor: '#F8F9FD',
              color: '#3654EA',
            },
            colorText: '#F8F9FD / #3654EA'
          },
          {
            label: '辅助警示',
            contentStyle: {
              backgroundColor: '#FCF2E6',
              color: '#606266',
            },
            colorText: '#FCF2E6 / #606266'
          }],
          [
          {
            label: '成功状态',
            contentStyle: {
              backgroundColor: '#F0F9EB',
              color: '#606266',
            },
            colorText: '#F0F9EB / #606266'
          }
          ]
        ],
        maskingColor: [
          [{
            label: '悬浮出现的气泡',
            maskingStyle: {
              backgroundColor: 'rgba(0, 0, 0, .75)'
            },
            colorText: '#000000(75%)'
          },
          {
            label: '弹窗背后的蒙版',
            colorText: '#000000(45%)',
            maskingStyle: {
              backgroundColor: 'rgba(0, 0, 0, .45)'
            }
          }],
          [{
            label: '滚动条',
            colorText: '#000000(15%)',
            maskingStyle: {
              backgroundColor: 'rgba(0, 0, 0, .15)'
            }
          },
          {
            label: '下拉框、卡片投影',
            colorText: '#000000(6%), x(0), y(2), 模糊(12)',
            bgColor: '#ffffff',
            maskingStyle: {
              backgroundColor: '#ffffff',
              'box-shadow': '0px 2px 12px 0px rgba(0, 0, 0, .06)'
            }
          }]
        ]
      }
    }
  }
</script>
## Color 色彩
组件颜色
### 主颜色

<div>
  <el-row v-for="(item, index) in mainColor" :key="index">
    <el-col v-for="color in item" :key="color.label" :span="12">
      <div class="color-box" :style="{ background: color.colorText }"></div>
      <div class="color-text">
        <div>{{color.label}}</div>
        <span>{{color.colorText}}</span>
      </div>
    </el-col>
  </el-row>
</div>

### 文本颜色

<div>
  <el-row v-for="(item, index) in textColor" :key="index">
    <el-col v-for="color in item" :key="color.label" :span="12">
      <div class="color-box" :style="{ background: color.colorText }"></div>
      <div class="color-text">
        <div>{{color.label}}</div>
        <span>{{color.colorText}}</span>
      </div>
    </el-col>
  </el-row>
</div>

### 背景色

<div>
  <el-row v-for="(item, index) in bgColor" :key="index">
    <el-col v-for="color in item" :key="color.label" :span="12">
      <div class="color-box" :style="{ background: color.colorText }"></div>
      <div class="color-text">
        <div>{{color.label}}</div>
        <span>{{color.colorText}}</span>
      </div>
    </el-col>
  </el-row>
</div>

### 线条色

<div>
  <el-row v-for="(item, index) in lineColor" :key="index">
    <el-col v-for="color in item" :key="color.label" :span="12">
      <div class="color-box" :style="{ background: color.colorText }"></div>
      <div class="color-text">
        <div>{{color.label}}</div>
        <span>{{color.colorText}}</span>
      </div>
    </el-col>
  </el-row>
</div>

### 状态色

<div>
  <el-row v-for="(item, index) in statusColor" :key="index">
    <el-col v-for="color in item" :key="color.label" :span="12">
      <div class="color-box" :style="color.statusStyle"></div>
      <div class="color-text">
        <div>{{color.label}}</div>
        <span>{{color.colorText}}</span>
      </div>
    </el-col>
  </el-row>
  <el-row v-for="(item, index) in contentColor" :key="index">
    <el-col v-for="color in item" :key="color.label" :span="12">
      <div class="content-box" :style="color.contentStyle">内容</div>
      <div class="color-text">
        <div>{{color.label}}</div>
        <span>{{color.colorText}}</span>
      </div>
    </el-col>
  </el-row>
</div>

### 半透明蒙版

<div>
  <el-row v-for="(item, index) in maskingColor" :key="index">
    <el-col v-for="color in item" :key="color.label" :span="12">
      <div class="color-box" :style="color.maskingStyle"></div>
      <div class="color-text">
        <div>{{color.label}}</div>
        <span>{{color.colorText}}</span>
      </div>
    </el-col>
  </el-row>
</div>

