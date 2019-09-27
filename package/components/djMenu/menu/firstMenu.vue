<template>
  <div class="first-menu">
    <div class="first-menu-content">
      <div class="first-menu-content-logo">
        <img src="@/assets/images/logo.png" href="/">
      </div>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#172938"
        text-color="#fff"
        active-text-color="#20a0ff"
        @select="select">
        <template v-for="item in menu">
          <el-menu-item :index="item.menu.url">{{ item.menu.name }}</el-menu-item>
        </template>
      </el-menu>
    </div>
    <user-message></user-message>
  </div>
</template>

<script>
import userMessage from './userMessage/userMessage.vue';
export default {
  name: 'first-menu',
  props: {
    menu: {
      type: Array,
      default: () => []
    },
    activeIndex: {
      default: null
    }
  },
  components: {
    userMessage
  },
  methods: {
    select(url) {
      this.$emit('select', url);
    }
  }
};
</script>

<style lang="less" scoped>
.first-menu {
  position: relative;
  display: flex;
  height: 60px;
  align-items: center;
  justify-content: space-between;
  background-color: #172938;
  &-content {
    flex-shrink: 0;
    flex-grow: 1;
    display: flex;
    align-items: center;
    &-logo {
      padding: 0 50px;
      img {
        width: 100px;
      }
    }
    ul {
      border: 0;
    }
  }
}
</style>
