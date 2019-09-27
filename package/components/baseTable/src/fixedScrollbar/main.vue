<template>
  <div class="djtable-scroll"
       :class="{'djtable-scroll-fixed':isScrollFixed}"
       :style="{ width: scrollContainerWidth }"
       ref="scrollElement"
       @scroll="scrollBarMove($event)">
    <div :style="{ height: '1px', width: scrollbodyWidth }" ref="scrollbars"></div>
  </div>
</template>
<script>
  const { getStyle } = require('../../../../methods/utils/methods');
  import scrollbarWidth from '../reTable/sourceCode/scrollbar-width';
  import listenerPolicy from '../../../../methods/mixins/listenerPolicy';
  // 获取浏览器视窗大小
  function getViewport() {
    // http://andylangton.co.uk/blog/development/get-viewport-size-width-and-height-javascript
    let e = window;
    let a = 'inner';
    if (!('innerWidth' in window)) {
      a = 'client';
      e = document.documentElement || document.body;
    }
    return {
      width: e[a + 'Width'],
      height: e[a + 'Height']
    };
  }
  export default {
    name: 'fixedScrollbar',
    mixins: [listenerPolicy],
    props: {
      container: {
        // default: window
        default: function () {
          return window;
        }
      },
      // fixedScrollbar: {
      //   type: Boolean,
      //   default: false
      // },
    },
    computed: {
      baseTable() {
        return this.$parent;
      }
    },
    data: function () {
      return {
        scrollContent: undefined,
        // exploreSize: {}, // 视窗大小参数
        isTableHasY: false, // table 是否存在纵向滚动条
        isScrollFixed: false, // 横向滚动条 是否需要更改position
        scrollbodyWidth: '0px',
        scrollContainerWidth: '0px',
        // showScroll: true, // 是否显示横向滚动条 目前该值一直为true
      };
    },
    mounted() {},
    methods: {
      // 创建横向滚动条
      createScroll() {
        setTimeout(() => {
          if (this.baseTable) {
            let _tableContainer = this.baseTable.$el;
            var oldTotalWidth = getStyle(_tableContainer.querySelector('.el-table__header'), 'width');
            var width = parseFloat(oldTotalWidth.replace(/px$/, ''));
            var tableWrap = _tableContainer.querySelector('.el-table__body-wrapper');
            this.isTableHasY = tableWrap.scrollHeight > tableWrap.clientHeight;
            this.scrollbodyWidth = this.isTableHasY ? width - scrollbarWidth() + 'px' : width + 'px';
            this.scrollContainerWidth = this.isTableHasY ? _tableContainer.clientWidth - scrollbarWidth() + 'px' : _tableContainer.clientWidth + 'px';
            this.judgeScrollFixed();
            let _targetNode = this.baseTable.$refs.eltable.$el.childNodes[2];
            this.escapeAllListener();
            this.addListener(this.container, 'scroll', this.judgeScrollFixed);
            this.addListener(_targetNode, 'scroll', this.eltableBodyScroll);
          }
        }, 90); //解决开启border时，更新内容宽度慢一步的问题
      },
      //tableBody --> ScrollBar联动横向滚动
      eltableBodyScroll(event) {
        this.$refs.scrollElement.scrollLeft = event.target.scrollLeft;
      },
      // ScrollBar --> tableBody联动横向滚动
      scrollBarMove(event) {
        this.baseTable.$refs.eltable.$el.childNodes[2].scrollLeft = event.target.scrollLeft;
      },
      // 判断滚动条是否需要悬浮
      judgeScrollFixed() {
        this.$nextTick(() => {
          setTimeout(() => {
            if (this.baseTable.$refs.eltable) {
              let tableWrap = this.baseTable.$refs.eltable.$el;
              let tableHeader = tableWrap.querySelector('.el-table__header-wrapper tr');
              let pos = tableWrap.getBoundingClientRect();
              let exploreSize = getViewport();
              let nowTop = exploreSize.height - pos.top;
              // let result = nowTop < tableWrap.clientHeight && nowTop > TABLE_MES.lineHeight + scrollbarWidth();
              let result = nowTop < tableWrap.clientHeight && nowTop > tableHeader.clientHeight + scrollbarWidth();
              if (result !== this.isScrollFixed) {
                this.isScrollFixed = result;
              }
              // // console.log('滚动条是否需要悬浮 = ', result);
            }
          }, 0);
        });
      },
    }
  };
</script>
