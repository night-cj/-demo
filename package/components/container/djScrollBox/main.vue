<template>
  <div class="dj-scroll-box">
    <el-scrollbar ref="scrollbar" v-bind="$attrs">
      <slot></slot>
    </el-scrollbar>
  </div>
</template>
<script>
  // 无论容器内部是否需要自定义滚动条，自定义滚动条的相关元素都会生成，所以尽量避免容器嵌套时，两容器bottom和right两边重合的情况
  import listenerPolicy from '../../../methods/mixins/listenerPolicy';
  export default {
    name: 'dj-scroll-box',
    data: function () {
      return {
        scrollbar: undefined
      };
    },
    props: {
      isOnResize: {
        type: Boolean,
        default: true
      }
    },
    mixins: [listenerPolicy],
    // render(h) {
    //   return h('el-scrollbar', {
    //     ref: 'scrollbar',
    //     props: {
    //       ...this.$attrs
    //     }
    //   }, this.$slots.default);
    // },
    mounted() {
      this.scrollbar = this.$refs.scrollbar;
      this.isOnResize && this.addListener(window, 'resize', this.resize);
    },
    // activated() {
    //   this.addListener(window, 'resize', this.resize);
    //   // this.resizeListener();
    // },
    // deactivated() {
    //   if (this.escapeListenerResize) {
    //     this.escapeListenerResize();
    //     this.escapeListenerResize = undefined;
    //   }
    // },
    // beforeDestroy() {
    //   this.escapeListenerResize && this.escapeListenerResize();
    // },
    methods: {
      moveToTarget(el) {
        el.scrollIntoView();
      },
      resize() {
        this.scrollbar && this.scrollbar.update();
      }
    }
  };
</script>
