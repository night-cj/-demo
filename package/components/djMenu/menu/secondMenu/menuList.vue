<template>
  <el-submenu v-if="node.children.length > 0" :index="node.menu.url">
    <template slot="title">
      <i :class="node.menu.icon"></i>
      <span slot="title">{{ node.menu.name }}</span>
    </template>
    <menu-list v-for="(childNode, index) in node.children" :key="index" :node="childNode"></menu-list>
  </el-submenu>
  <el-menu-item v-else :index="node.menu.url">
    <i :class="node.menu.icon" v-if="root"></i>
    <span slot="title" :class="{'child-node': !root}">{{ node.menu.name }}</span>
  </el-menu-item>
</template>

<script>
export default {
  name: 'menu-list',
  props: {
    node: {
      type: Object,
      default: () => ({})
    },
    root: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="less" scoped>
.second-menu {
  .child-node {
    margin-left: 12px;
  }
}
</style>
