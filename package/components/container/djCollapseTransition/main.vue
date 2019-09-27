<template>
  <div class="dj-collapse-transition" :style="{width: width_ + 'px'}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'djCollapseTransition',
  props: {
    visiable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      width: null
    };
  },
  computed: {
    width_() {
      if (this.visiable) {
        return this.width;
      } else {
        return 0;
      }
    }
  },
  methods: {
    update() {
      this.width = this.$slots.default[0].elm.offsetWidth;
    }
  },
  updated() {
    this.update();
  },
};
</script>
