<template>
  <div :class="['second-menu', {hidden: isCollapse}]">
    <div class="second-menu-button" @click="changeCollapse">
      <el-button type="primary" size="mini">收起</el-button>
    </div>
    <div class="second-menu-content">
      <scroll-box>
        <el-menu
          ref="secondMenu"
          :default-active="activeIndex"
          :default-openeds="opends"
          class="el-menu-vertical-demo"
          :unique-opened="true"
          background-color="#172938"
          text-color="#fff"
          active-text-color="#20a0ff"
          @select="select"
          :collapse="isCollapse">
          <menu-list v-for="(childNode, index) in menus" :key="index" :node="childNode" :root="true"></menu-list>
        </el-menu>
      </scroll-box>
    </div>
  </div>
</template>

<script>
import menuList from './menuList.vue';
export default {
  name: 'second-menu',
  props: {
    activeIndex: {
      default: null
    },
    menus: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      opends: [],
      isCollapse: false
    };
  },
  components: {
    menuList,
  },
  methods: {
    changeCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    changeMenu() {
      this.opends = [];
    },
    select(event) {
      console.log(event);
    }
  }
};
</script>

<style lang="less" scoped>
.second-menu {
  display: flex;
  width: 200px;
  overflow: auto;
  background-color: #172938;
  flex-direction: column;
  transition: width 0.3s;
  &.hidden {
    width: 64px;
  }
  &-content {
    position: relative;
    flex-grow: 1;
    ul {
      border: 0;
    }
  }
  &::-webkit-scrollbar {
    width: 0;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  /*width: 200px;*/
  min-height: 400px;
}
</style>
