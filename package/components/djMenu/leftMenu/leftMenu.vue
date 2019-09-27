<template>
  <div class="left-menu">
    <div class="left-menu-all" @click="$emit('open-detail')">
      <div class="left-menu-all-button">
        <i class="el-icon-menu"></i><span>产品与服务</span>
        <div class="left-menu-all-button-arrow">
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
    </div>
    <div class="left-menu-content">
      <scroll-box>
        <div class="left-menu-content-item" v-for="(item, index) in store.state.favoriteMenu" @click.self="clickMenu(item)">
          <i :class="item.icon"></i>{{ item.title }}
          <div class="left-menu-content-item-button">
            <i class="el-icon-close" @click="deleteMenu(item, index)"></i>
          </div>
        </div>
      </scroll-box>
    </div>
  </div>
</template>

<script>
import scrollBox from '../../container/djScrollBox';
export default {
  name: 'left-menu',
  inject: ['store'],
  components: {
    scrollBox
  },
  methods: {
    clickMenu(menu) {
      this.$parent.switchMenu(menu);
    },
    deleteMenu(menu, index) {
      this.store.deleteMenu({menu, index});
    }
  }
};
</script>

<style lang="less" scoped>
.menuItem {
  height: 40px;
  font-size: 14px;
  line-height: 40px;
  color: white;
  cursor: pointer;
  transition: 0.3s all;
  i {
    display: inline-block;
    width: 16px;
    height: 16px;
    padding: 0 15px;
    font-size: 16px;
    line-height: 16px;
    color: #b3b5b6;
    vertical-align: middle;
  }
  &:hover {
    color: #00c1de;
    background-color: #192129;
    & i {
      color: white;
    }
  }
}
.left-menu {
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 100%;
  background-color: #252a2f;
  &-all {
    position: relative;
    padding: 4px 0;
    border: 0 solid rgba(255, 255, 255, 0.15);
    border-width: 1px 0;
    &-button {
      .menuItem;
      &:hover {
        color: white;
        background-color: #00c1de;
      }
      &:hover &-arrow {
        opacity: 1;
      }
      &-arrow {
        float: right;
        opacity: 0;
        transition: 0.3s all;
      }
    }
  }
  &-content {
    position: relative;
    flex-grow: 1;
    .scroll-box {
      position: absolute;
    }
    &-item {
      .menuItem;
      &-button {
        display: none;
        float: right;
      }
      &:hover &-button {
        display: block;
      }
    }
  }
}
</style>
