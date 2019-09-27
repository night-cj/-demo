const { hasClass, addClass, removeClass, getStyle, throttle, client, moveItems } = require('../../../methods/utils/methods');
const _client = client();
export default {
  props: {
    multipleSelect: {
      "type": Boolean,
      default: false
    }, //是否开启多选功能
  },
  data() {
    return {
      isDragging: false, //拖拽状态
      dragEndIndex: undefined, //拖拽结束序号
      dragStartIndex: undefined, //拖拽开始序号
      autoScrollData: {}, //拖拽自动滚动位置及元素
      autoScroll: undefined, //拖拽自动滚动方法
      isMultipleSelect: false, //多选开启状态
      multipleSelectList: [], //多选列表
      rowMap: undefined,
      scrollOption: { //拖拽自动滚动配置
        scroll: true,
        rootEl: undefined,
        scrollSensitivity: 30,
        scrollSpeed: 10,
        scrollParentEl: undefined,
        scrollFn: undefined,
        scrollEl: undefined
      },
    };
  },
  mounted() {
    this.initAutoScroll();
    this.multipleSelect && this.setMultipleSelectListener();
  },
  methods: {
    /*----------------绑定结构层方法-----------------*/
    //给多选的行添加class
    rowClassName({row, rowIndex}) {
      let nameList = [];
      let rowClassName = this.$attrs['row-class-name'];
      if (rowClassName) {
        let type = Object.prototype.toString.call(rowClassName);
        if (type === '[object String]') {
          nameList.push(rowClassName);
        } else if (type === '[object Function]') {
          nameList.push(rowClassName({row, rowIndex}));
        }
      }
      if (this.multipleSelectList.includes(row)) {
        nameList.push('multiple-row');
      }
      return nameList.join(' ');
    },
    //行点击事件,处理多选操作
    rowClick(row) {
      if (this.isMultipleSelect) { //如果多选开启状态
        var index = this.multipleSelectList.findIndex(obj => obj === row);
        if (index !== -1) {
          this.multipleSelectList.splice(index, 1);
        } else {
          this.multipleSelectList.push(row);
        }
      } else { //如果多选关闭状态
        this.multipleSelectList = [];
      }
      this.$emit('multiple-select', [].concat(this.multipleSelectList));
    },
    handleDrag(evt) {
      let tbody = this.scrollOption.rootEl;
      if (!tbody) {
        this.scrollOption.rootEl = tbody = this.$refs.eltable.$el.querySelector('tbody');
      }
      this.autoScroll && this.autoScroll(evt, tbody);
    },
    handleDragOver(evt, row, index) {
      let target = evt.target;
      //判断插入位置
      while (target.tagName !== 'TD') {
        target = target.parentNode;
      }
      let td_h = getStyle(target, 'height').replace(/px$/, '');
      let rect = target.getBoundingClientRect();
      if ((evt.clientY - rect.top) * 2 > td_h) {
        this.dragEndIndex = index + 1;
      } else {
        this.dragEndIndex = index;
      }
    },
    handleDragEnd(evt, row, index) {
      this.isDragging = false;
      if (this.dragStartIndex !== undefined && this.dragEndIndex !== undefined) {
        if (this.multipleSelectList.includes(this.data[this.dragStartIndex])) {
          var endIndex = this.dragEndIndex;
          var map = new Map();
          this.data.forEach((obj, index) => {
            map.set(obj, index);
          });
          var sortedList = this.multipleSelectList.sort((a, b) => {
            return map.get(a) - map.get(b);
          });
          // var addIndex = 0;
          [].concat(sortedList).reverse().forEach((obj) => {
            var index = map.get(obj);
            this.data.splice(index, 1);
            if (index < endIndex) {
              endIndex--;
            }
          });
          this.data.splice(endIndex, 0, ...sortedList);
        } else {
          if (this.dragStartIndex !== this.dragEndIndex && this.dragStartIndex !== this.dragEndIndex - 1) {
            moveItems(this.data, this.dragStartIndex, this.dragEndIndex);
          }
        }
        this.$emit('drag-finish', [...this.data]);
      }
      clearInterval(this.autoScrollData.pid);
      this.dragStartIndex = this.dragEndIndex = undefined;
      this.$emit('drag-end', evt, row, index);
    },
    handleDragStart(evt, row, index) {
      this.isDragging = true;
      this.dragStartIndex = index;
      this.$emit('drag-start', evt, row, index);
    },
    handleDragEnter() {
      // console.log(evt, row, index);
      // this.dragEndIndex = index;
    },
    /*-------------------------------------------------*/
    //生成数据排序表
    updateRowMap() {
      var map = new Map();
      this.data.forEach((obj, index) => {
        map.set(obj, index);
      });
      this.rowMap = map;
    },
    //更新多选列表
    updateMultipleSelectList(multipleSelectList) {
      let list = [].concat(multipleSelectList);
      let addIndex = 0;
      multipleSelectList.forEach((obj, index) => {
        if (this.rowMap.get(obj) === undefined) {
          list.splice(index - addIndex, 1);
          addIndex++;
        }
      });
      this.multipleSelectList = list;
    },
    //设置多选监听，监听alt键
    setMultipleSelectListener() {
      const handleKeyDown = (e) => {
        if (e.keyCode === 18) {
          this.isMultipleSelect = true;
        }
      };
      const handleKeyUp = (e) => {
        if (e.keyCode === 18) {
          this.isMultipleSelect = false;
        }
      };
      this.addListener(window, 'keydown', handleKeyDown);
      this.addListener(window, 'keyup', handleKeyUp);
    },
    //设置自动滚动
    initAutoScroll() {
      if (!_client.browser.firefox) {
        this.autoScroll = throttle(30, (evt, rootEl) => {
          if (rootEl && this.scrollOption.scroll) {
            let _this = rootEl;
            let el;
            let rect;
            let sens = this.scrollOption.scrollSensitivity;
            let speed = this.scrollOption.scrollSpeed;

            let x = evt.clientX;
            let y = evt.clientY;

            let winWidth = window.innerWidth;
            let winHeight = window.innerHeight;

            let vx;
            let vy;

            let scrollOffsetX;
            let scrollOffsetY;
            let scrollEl = this.scrollOption.scrollEl;
            let scrollCustomFn = this.scrollOption.scrollFn;
            // Delect scrollEl
            if (this.scrollOption.scrollParentEl !== rootEl) {
              this.scrollOption.scrollEl = scrollEl = this.scrollOption.scroll;
              this.scrollOption.scrollParentEl = rootEl;

              if (scrollEl === true) {
                this.scrollOption.scrollEl = scrollEl = rootEl;

                do {
                  this.scrollOption.scrollEl = scrollEl = scrollEl.parentNode;
                  if (!scrollEl) {
                    break;
                  }
                  if (scrollEl.offsetHeight < scrollEl.scrollHeight) {
                    // body的样式为height:100%时，真实滚动层应为window
                    if (!((scrollEl.tagName === 'BODY' && scrollEl.scrollHeight === scrollEl.parentNode.scrollHeight) || scrollEl.tagName === 'HTML')) {
                      break;
                    }
                  }
                  /* jshint boss:true */
                } while (true);
              }
            }

            if (scrollEl) {
              el = scrollEl;
              rect = scrollEl.getBoundingClientRect();
              vx = (Math.abs(rect.right - x) <= sens) - (Math.abs(rect.left - x) <= sens);
              vy = (Math.abs(rect.bottom - y) <= sens) - (Math.abs(rect.top - y) <= sens);
            }
            if (true) {
              var _vx = (winWidth - x <= sens) - (x <= sens);
              var _vy = (winHeight - y <= sens) - (y <= sens);
              /* jshint expr:true */
              if (_vx || _vy) {
                el = window;
                vx = _vx;
                vy = _vy;
              }
            }

            if (this.autoScrollData.vx !== vx || this.autoScrollData.vy !== vy || this.autoScrollData.el !== el) {
              this.autoScrollData.el = el;
              this.autoScrollData.vx = vx;
              this.autoScrollData.vy = vy;
              clearInterval(this.autoScrollData.pid);

              if (el) {
                this.autoScrollData.pid = setInterval(() => {
                  if (!this.isDragging) {
                    clearInterval(this.autoScrollData.pid);
                  }
                  scrollOffsetY = vy ? vy * speed : 0;
                  scrollOffsetX = vx ? vx * speed : 0;
                  if (typeof (scrollCustomFn) === 'function') {
                    return scrollCustomFn.call(_this, scrollOffsetX, scrollOffsetY, evt);
                  }

                  if (el === window) {
                    // console.log('window', scrollOffsetY);
                    window.scrollTo(window.pageXOffset + scrollOffsetX, window.pageYOffset + scrollOffsetY);
                  } else {
                    el.scrollTop += scrollOffsetY;
                    el.scrollLeft += scrollOffsetX;
                  }
                }, 24);
              }
            }
          }
        });
      }
    }
  },
  watch: {
    data() {
      this.updateRowMap();
      this.updateMultipleSelectList(this.multipleSelectList);
    },
    dragEndIndex(newVal, oldVal) {
      const eltable = this.$refs.eltable;
      const el = this.$refs.eltable.$el;
      if (!el) return;
      const tbodys = el.querySelectorAll('tbody');
      Array.prototype.forEach.call(tbodys, (tbody) => {
        const tr = tbody.children;
        const rows = [].filter.call(tr, row => hasClass(row, 'el-table__row'));
        let oldRow;
        let newRow;
        let lastRow = rows[this.data.length - 1];
        if (eltable.isScrollLoad) {
          let indexList = eltable.store.states.indexList;
          if (indexList[indexList.length - 1] === this.data.length - 1) {
            lastRow = rows[indexList.length - 1];
          }
          for (let i = 0; i < indexList.length; i++) {
            let rowIndex = indexList[i];
            if (rowIndex === newVal) newRow = rows[i];
            if (rowIndex === oldVal) oldRow = rows[i];
            if (oldRow && newRow) {
              break;
            }
          }
        } else {
          oldRow = rows[oldVal];
          newRow = rows[newVal];
        }
        if (oldRow) {
          removeClass(oldRow, 'drag-hover');
        } else {
          this.data.length === oldVal && removeClass(lastRow, 'drag-last-hover');
        }
        if (newRow) {
          addClass(newRow, 'drag-hover');
        } else {
          this.data.length === newVal && addClass(lastRow, 'drag-last-hover');
        }
      });
    },
  }
};
