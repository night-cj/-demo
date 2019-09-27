<script>
  export default {
    data() {
      return {
        visiable: false
      }
    },
    methods: {
      add() {
        this.visiable = true;
        this.$nextTick(() => {
          this.$refs.addSomething.openFrame();
        });
      },
      openSlotDialog() {
        this.$refs.slotExample.openFrame();
      }
    },
    components: {
      'addSomething': {
        template: `
          <dj-dialog ref="djDialog" @close="close" @closed="closed" @confirm="confirm">
            <div class="el-row">
              <div class="el-col el-col-12">
                插入内容
              </div>
            </div>
          </dj-dialog>
        `,
        data() {
          return {
            baseData: {},
          }
        },
        methods: {
          openFrame(row = {}) {
            this.baseData = row;
            this.$refs.djDialog.open();
          },
          close() {
            this.$message('点击了关闭按钮');
            this.$refs.djDialog.close();
          },
          closed() {
            this.$message('已经关闭');
            this.$emit('closed');
          },
          confirm() {
            this.$message('确认');
            setTimeout(() => {
              this.$refs.djDialog.close();
            }, 1000)
          },
        }
      },
      'slotExample': {
        template: `
          <dj-dialog ref="djDialog" @close="close" @closed="closed" @confirm="confirm">
            <div>
              插槽例子
            </div>
            <div slot="footer">
              <el-button type="primary">按钮1</el-button>
              <el-button type="success">按钮2</el-button>
              <el-button type="info">按钮3</el-button>
              <el-button type="warning">按钮4</el-button>
            </div>
          </dj-dialog>
        `,
        data() {
          return {
            baseData: {},
          }
        },
        methods: {
          openFrame(row = {}) {
            this.baseData = row;
            this.$refs.djDialog.open();
          },
          close() {
            this.$message('点击了关闭按钮');
            this.$refs.djDialog.close();
          },
          closed() {
            this.$message('已经关闭');
            this.$emit('closed');
          },
          confirm() {
            this.$message('确认');
            setTimeout(() => {
              this.$refs.djDialog.close();
            }, 1000)
          },
        }
      }
    }
  }
</script>
## djDialog
弹窗组件

### 基础弹窗
:::demo
```html
<template>
  <el-button @click="add">基础弹窗</el-button>
  <add-something ref="addSomething" v-if="visiable" @closed="visiable = false"></add-something>
</template>

<script>
  export default {
    data() {
      return {
        visiable: false
      }
    },
    methods: {
      add() {
        this.visiable = true;
        this.$nextTick(() => {
          this.$refs.addSomething.openFrame();
        });
      }
    },
    components: {
      'addSomething': {
        template: `
          <dj-dialog ref="djDialog" @close="close" @closed="closed" @confirm="confirm">
            <div class="el-row">
              <div class="el-col el-col-12">
                插入内容
              </div>
            </div>
          </dj-dialog>
        `,
        data() {
          return {
            baseData: {},
          }
        },
        methods: {
          openFrame(row = {}) {
            this.baseData = row;
            this.$refs.djDialog.open();
          },
          close() {
            this.$message('点击了关闭按钮');
            this.$refs.djDialog.close();
          },
          closed() {
            this.$message('已经关闭');
            this.$emit('closed');
          },
          confirm() {
            this.$message('确认');
            setTimeout(() => {
              this.$refs.djDialog.close();
            }, 1000)
          }
        }
      }
    }
  }
</script>
```
:::
### 底部插槽例子
:::demo
```html
<template>
  <el-button @click="openSlotDialog">插槽例子</el-button>
  <slot-example ref="slotExample"></slot-example>
</template>
<script>
  export default {
    methods: {
      openSlotDialog() {
        this.$refs.slotExample.openFrame();
      }
    },
    components: {
      'slotExample': {
        template: `
          <dj-dialog ref="djDialog" @close="close" @closed="closed" @confirm="confirm">
            <div>
              插槽例子
            </div>
            <div slot="footer">
              <el-button type="primary">按钮1</el-button>
              <el-button type="success">按钮2</el-button>
              <el-button type="info">按钮3</el-button>
              <el-button type="warning">按钮4</el-button>
            </div>
          </dj-dialog>
        `,
        data() {
          return {
            baseData: {},
          }
        },
        methods: {
          openFrame(row = {}) {
            this.baseData = row;
            this.$refs.djDialog.open();
          },
          close() {
            this.$message('点击了关闭按钮');
            this.$refs.djDialog.close();
          },
          closed() {
            this.$message('已经关闭');
            this.$emit('closed');
          },
          confirm() {
            this.$message('确认');
            setTimeout(() => {
              this.$refs.djDialog.close();
            }, 1000)
          },
        }
      }
    }
  }
</script>
```
:::


### 组件传入参数
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| title | 弹窗的标题 | String | - | 标题 |
| has-footer | 弹窗是否有底部按钮 | Boolean | false/true | true |
| loading | 默认确认按钮是否禁用 | Boolean | false/true | false |
| 其他属性 | 参考element组件属性 | - | - | - |


### 事件
| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| confirm | 点击弹窗的确认键触发 | - |
| close | 弹窗点击关闭触发 | - |
| closed | 弹窗关闭后触发 | - |
| el-dialog events | 支持 element 事件 | - |

### 插槽(Slot)
| name | 说明 |
| --- | --- |
| footer | Dialog 按钮操作区的内容 |
| footer-confirm | Dialog 按钮操作区确认键的内容 |

### 方法
| 方法名称 | 说明 | 参数 |
| --- | --- | --- |
| open | 打开弹窗 | - |
| close | 关闭弹窗 | - |
