<template>
  <div class="dj-content-box">
    <!-- <scroll-box> -->
      <div class="dj-content-box-inside" ref="inside">
        <!-- <box-header>
          {{ title }}
        </box-header> -->
        <div class="dj-content-box-inside-content">
          <slot></slot>
        </div>
      </div>
      <div class="dj-content-box-copyright">
        Copyright © 2019科技股份有限公司
      </div>
    <!-- </scroll-box> -->
  </div>
</template>

<script>
import boxHeader from './boxHeader.vue';
import scrollBox from '../djScrollBox';
import listenerPolicy from '../../../methods/mixins/listenerPolicy.js';
export default {
  name: 'dj-content-box',
  props: {
    title: {
      default: null
    }
  },
  mixins: [listenerPolicy],
  mounted() {
    // this.testHeight();
    // this.addListener(window, 'resize', () => {
    //   this.testHeight();
    // });
  },
  methods: {
    testHeight() {
      let margin = 20;
      let minHeight = this.$el.offsetHeight - margin * 2;
      Object.assign(this.$refs.inside.style, {
        'margin': `${margin}px`,
        'min-height': `${minHeight}px`
      });
    }
  },
  components: {
    boxHeader,
    scrollBox
  }
};
</script>
