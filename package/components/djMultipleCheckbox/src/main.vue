<template>
  <div class="dj-multiple-checkbox" v-loading="!isCheckBoxReady">
    <div class="left-box">
      <h3 class="left-box-title">{{parentTitle}}</h3>
      <ul class="parent-list">
        <li v-for="(item,index) in parentList" :key="item[parentKey] || index" @click.self="checkParent(item,index)"
            :class="{active:parentIndex===index}">
          <el-checkbox :label="item[parentName]" :indeterminate="item.isIndeterminate"
                       v-model="item.isSelected" @change="selectParentList(item, index)">&nbsp;
          </el-checkbox>
          {{item[parentName]}}
        </li>
      </ul>
    </div>
    <div class="right-box">
      <div class="tabBox">
        <base-table ref="childTable" :loading="isLoading" height="280"
                    :data="parentList[parentIndex]!==undefined?parentList[parentIndex][childListName]:[]"
                    :column-type="['selection']"
                    :row-key="childKey"
                    :columns="childColumns"
                    @row-click="selectChildList"
                    @selection-change="childSelectionChange">
        </base-table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'dj-multiple-checkbox',
    props: {
      isCheckBoxReady: {
        type: Boolean,
        default: false
      }, //级联复选框数据初始化完成
      parentList: {
        type: Array,
        default: () => []
      }, //父级列表数据
      parentName: {
        type: String,
        default: 'name'
      }, //父级列表展示字段
      parentKey: {
        type: String,
        default: 'id'
      }, //父级列表唯一标识
      parentTitle: {
        type: String,
        default: ''
      }, //父级列表标题
      parentCheck: {
        type: String,
        default: 'checkStatus'
      }, //父列表选中状态字段（ 0为不选 1为半选 2为全选）
      childListName: {
        type: String,
        default: 'children'
      }, //子级列表字段
      childColumns: {
        type: Array,
        default: () => []
      }, //子列表字段和label配置项
      childKey: {
        type: String,
        default: 'id'
      }, //子级列表唯一标识
      childSelectedListName: {
        type: String,
        default: 'checkedList'
      }, //所选子列表字段
      remote: {
        type: Function
      }
    },
    data() {
      return {
        isTableReady: false, //table初始化完成
        isLoading: false, //正在加载子列表
        parentIndex: undefined, //当前所在的父列表行的index
        isParentSelecting: false //选择父列表时不触发子列表的选择事件
      };
    },
    mounted() {
      this.init();
    },
    methods: {
      /**
       * 初始化
       */
      init() {
        if (this.isCheckBoxReady && this.parentList.length > 0) {
          //初始化table数据后再渲染table，防止报错
          this.isTableReady = true;
          //若已有父列表被选中，则定位到第一条被选中的父列表，并打开其子列表数据
          let firstSelected;
          for (let index of Object.keys(this.parentList)) {
            let item = this.parentList[index];
            item.isSelected === undefined && this.$set(item, 'isSelected', false);
            item.isIndeterminate === undefined && this.$set(item, 'isIndeterminate', false);
            !item[this.childSelectedListName] && (item[this.childSelectedListName] = []);
            if (item[this.childSelectedListName].length > 0) {
              if (item[this.childListName] && item[this.childListName].length) {
                if (item[this.childListName].every(obj=>item[this.childSelectedListName].some(_obj=>_obj[this.childKey] === obj[this.childKey]))) {
                  item.isSelected = true;
                  item.isIndeterminate = false;
                } else {
                  item.isSelected = false;
                  item.isIndeterminate = true;
                }
              } else {
                //父列表选中状态转换
                let checkStatus = Number(item[this.parentCheck]);
                if (checkStatus === 0) {
                  item.isSelected = false;
                  item.isIndeterminate = false;
                } else if (checkStatus === 1) {
                  item.isSelected = false;
                  item.isIndeterminate = true;
                } else if (checkStatus === 2) {
                  item.isSelected = true;
                  item.isIndeterminate = false;
                }
              }
              firstSelected = firstSelected === undefined ? index : firstSelected;
            }
          }
          //展开选中的第一条父列表数据
          if (firstSelected !== undefined) {
            this.checkParent(this.parentList[firstSelected], Number(firstSelected));
          } else {
            //若没有任何被选中数据，则默认打开第一条父列表下的子列表数据
            this.checkParent(this.parentList[0], 0);
          }
        }
      },
      /**
       * 选择父列表
       * @param item 父列表当前列表数据
       * @param index 父列表当前数据的index
       */
      selectParentList(item, index) {
        this.checkParent(item, index, (isCurrent) => {
          //全选或全不选时isIndeterminate属性都为false
          if (item.isIndeterminate === undefined) {
            this.$set(item, 'isIndeterminate', false);
          } else {
            item.isIndeterminate = false;
          }
          this.isParentSelecting = true;
          this.$nextTick(() => {
            for (let child of item[this.childListName]) {
              //直接在当前父列表下全选，只需改变子列表未选中项的状态
              //而从其他父列表下跳转到当前父列表下全选，需要将所有子列表的状态
              if (isCurrent) {
                child.isSelected !== item.isSelected && this.$refs.childTable.toggleRowSelection(child);
              } else {
                item.isSelected === true && this.$refs.childTable.toggleRowSelection(child);
              }
              child.isSelected = item.isSelected;
            }
            this.isParentSelecting = false;
            //全选或全不选时填充或移除数据
            if (item.isSelected === true) {
              item[this.parentCheck] = 2;
              item[this.childSelectedListName] = JSON.parse(JSON.stringify(item[this.childListName]));
            } else {
              item[this.parentCheck] = 0;
              item[this.childSelectedListName] = [];
            }
            this.$emit('update:parentList', this.parentList);
          });
        });
      },
      /**
       * 切换父列表 刷新子列表
       * @param item 当前父列表
       * @param index 当前父列表的index
       * @param callback 切换父列表后的回调函数（除初始化外，只有点击父列表复选框时才存在callback，单纯切换父列表不存在callback）
       */
      checkParent(item, index, callback) {
        //切换的目标父列表为当前父列表时，不需要做其他操作
        if (this.parentIndex === index) {
          callback !== undefined && callback(true);
          return;
        }
        this.parentIndex = index;
        //若子列表已存在，则不需要另外请求数据
        if (item[this.childListName] && item[this.childListName].length > 0) {
          //单纯切换父列表时，不改变原先的复选框状态，只需将isSelected为true的复选框渲染成选中状态
          if (callback === undefined) {
            this.isParentSelecting = true;
            this.$nextTick(() => {
              if (item.isSelected === true) {
                for (let child of item[this.childListName]) {
                  this.$refs.childTable.toggleRowSelection(child);
                }
              } else {
                for (let child of item[this.childSelectedListName]) {
                  let _child = item[this.childListName].filter(obj=>obj[this.childKey] === child[this.childKey])[0];
                  this.$refs.childTable.toggleRowSelection(_child);
                }
              }
              // for (let child of item[this.childListName]) {
              //   console.log(this);
              //   console.log(item);
              //   if (item.isSelected === true || child.isSelected === true) {
              //     console.log(this);
              //     // let _child = item[this.childListName].filter(obj=>obj[this.childKey] === child[this.childKey])[0];
              //     // console.log('_child', _child);
              //     this.$refs.childTable.toggleRowSelection(child);
              //   }
              // }
              this.isParentSelecting = false;
            });
          } else {
            callback();
          }
        } else {
          //初始化新的table的数据，防止报错
          this.parentList[this.parentIndex][this.childListName] = [];
          this.isParentSelecting = true;
          this.isLoading = true;
          if (this.remote) {
            this.remote(item).then(children => {
              if (item[this.childSelectedListName].length > 0) {
                //通过对比渲染子列表的选中状态
                children.forEach((child) => {
                  for (let list of item[this.childSelectedListName]) {
                    if (list[this.childKey] === child[this.childKey]) {
                      child.isSelected = true;
                      setTimeout(()=>{
                        this.$refs.childTable.toggleRowSelection(child);
                      });
                      break;
                    }
                  }
                });
              }
              item[this.childListName] = children;
              this.isParentSelecting = false;
              let flag = item[this.childSelectedListName].length > 0;
              // todo  this.isLoading = false; 放在callback方法之后执行会出现，parentList中父级的选中状态出现问题
              this.isLoading = false;
              callback !== undefined && callback(flag);
            }).catch(() => {
              this.isLoading = false;
            });
          } else {
            console.warn('请设置remote属性');
          }
        }
      },
      /**
       * 选择子列表
       * @param row 当前子列表行
       */
      selectChildList(row) {
        //进行toggleRowSelection操作后，elementUI-ui会自动触发selection-change事件
        this.$refs.childTable.toggleRowSelection(row);
      },
      /**
       * 子列表选中状态改变时触发的事件
       * @param selection 当前所有选中项数组
       */
      childSelectionChange(selection) {
        //通过改变父列表的选中状态，来改变子列表选中状态时不触发该事件
        let parentRow = this.parentList[this.parentIndex];
        if (this.isParentSelecting === true || this.parentIndex === undefined || !parentRow) return;
        //通过对比子列表数组和选中项数组，来改变子列表各项的isSelected字段
        parentRow[this.childListName].forEach((child) => {
          let isSelected = false;
          for (let item of selection) {
            if (child[this.childKey] === item[this.childKey]) {
              isSelected = true;
              break;
            }
          }
          child.isSelected = isSelected;
        });
        parentRow.isSelected === undefined && this.$set(parentRow, 'isSelected', false);
        parentRow.isIndeterminate === undefined && this.$set(parentRow, 'isIndeterminate', false);
        //通过子列表的整体选中状态，来改变父列表的选中状态
        if (parentRow[this.childListName].every((obj) => obj.isSelected === true)) {
          parentRow.isSelected = true;
          parentRow.isIndeterminate = false;
          parentRow[this.parentCheck] = 2;
        } else if (parentRow[this.childListName].some((obj) => obj.isSelected === true)) {
          parentRow.isSelected = false;
          parentRow.isIndeterminate = true;
          parentRow[this.parentCheck] = 1;
        } else {
          parentRow.isSelected = false;
          parentRow.isIndeterminate = false;
          parentRow[this.parentCheck] = 0;
        }
        //选中的子列表数据加入父列表
        parentRow[this.childSelectedListName] = selection;
        this.$emit('update:parentList', this.parentList);
      }
    },
    watch: {
      isCheckBoxReady(newValue) {
        if (newValue === true) {
          this.init();
        } else {
          this.isTableReady = false; //table初始化完成
          this.isLoading = false; //正在加载子列表
          this.parentIndex = undefined; //当前所在的父列表行的index
          this.isParentSelecting = false; //选择父列表时不触发子列表的选择事件
        }
      },
      parentList(newValue) {
        if (newValue.length > 0) {
          this.init();
        }
      }
    }
  };
</script>
