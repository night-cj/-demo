<template>
  <div class="dj-menu"
    ref="baseMenu">
    <div :class="['dj-menu-left', leftHidden ? 'small' : 'whole']" :style="{'transition-delay': delay}">
      <left-menu @open-detail="openDetail"></left-menu>
    </div><div
     :class="['dj-menu-right', {'hidden': rightHidden}]">
      <detail-menu @close="closeDetail"></detail-menu>
    </div>
  </div>
</template>

<script>
import leftMenu from './leftMenu/leftMenu.vue';
import detailMenu from './detailMenu/detailMenu.vue';
import listenerPolicy from '../../methods/mixins/listenerPolicy.js';
import Store from './store.js';
export default {
  name: 'dj-menu',
  props: {
    menus: {
      default: () => [],
    }
  },
  provide() {
    return {
      store: this.store
    };
  },
  data() {
    return {
      leftHidden: true,
      rightHidden: true,
      animating: false,
      store: new Store(),
    };
  },
  mixins: [listenerPolicy],
  mounted() {
    this.bindEvent(this.$refs.baseMenu, [
      ['mouseenter', () => {
        this.leftHidden = false;
      }],
      ['mouseleave', () => {
        if (this.rightHidden) {
          this.leftHidden = true;
        }
      }],
    ]);
    this.store.getMenus(this.menus);
  },
  computed: {
    delay() {
      if (this.rightHidden) {
        if (this.leftHidden) {
          return '0s';
        } else {
          return '0.3s';
        }
      } else {
        return '0s';
      }
    }
  },
  methods: {
    bindEvent(el, array) {
      array.forEach(item => {
        this.addListener(el, ...item);
      });
    },
    switchMenu(menu) {
      this.$emit('switch-menu', menu);
      this.rightHidden = true;
    },
    openDetail() {
      this.leftHidden = false;
      this.rightHidden = !this.rightHidden;
    },
    closeDetail() {
      this.leftHidden = true;
      this.rightHidden = true;
    },
  },
  components: {
    leftMenu,
    detailMenu
  },
};
</script>

<style lang="less" scoped>
.dj-menu {
  position: relative;
  display: inline-block;
  height: 100%;
  cursor: default;
  &-left {
    width: 200px;
    overflow: hidden;
    transition: all 0.3s;
    &.small {
      width: 44px;
    }
    &.whole {
      width: 200px;
    }
  }
  &-right {
    width: 950px;
    overflow: hidden;
    box-shadow: 4px 0 8px 0 rgba(0, 0, 0, 0.2);
    transition: all 0.3s;
    &.hidden {
      width: 0;
    }
  }
  & > div {
    display: inline-block;
    height: 100%;
    vertical-align: top;
  }
}
</style>
