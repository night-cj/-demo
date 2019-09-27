<template>
  <div class="water-fall-item">
    <div class="water-fall-item-main">
      {{ item.title }}
    </div>
    <div class="water-fall-item-child" v-for="child in item.children" @click.self="clickMenu(child)">
      {{ child.title }}
      <div :class="['water-fall-item-child-button', {'collect': child.collected}]">
        <i :class="`el-icon-star-${child.collected ? 'on' : 'off'}`" @click="collectMenu(child)"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'waterFallItem',
  inject: ['store'],
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    // store: {
    //   default: () => ({})
    // }
  },
  created() {
    this.store.subscribe(this.update);
  },
  destroyed() {
    this.store.unsubscribe(this.update);
  },
  methods: {
    clickMenu(menu) {
      this.$parent.$parent.$parent.switchMenu(menu);
    },
    update() {
      this.$forceUpdate();
      // this.item.children = [...this.item.children];
      // this.item.children = [...this.store.state.menus.find(menu => menu.path === this.item.path).children];
    },
    collectMenu(menu) {
      menu.collected ? this.store.deleteMenu({menu}) : this.store.addMenu(menu);
    },
  }
};
</script>

<style lang="less" scoped>
.water-fall-item {
  width: 240px;
  &-main {
    height: 40px;
    padding: 0 8px;
    margin-bottom: 7px;
    font-size: 14px;
    font-weight: bold;
    line-height: 40px;
  }
  &-child {
    height: 30px;
    padding: 0 30px 0 10px;
    font-size: 13px;
    line-height: 30px;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
      color: #26d7eb;
      background-color: #f0f0f0;
    }
    &:hover &-button {
      display: block;
    }
    &-button {
      display: none;
      float: right;
      i {
        font-size: 16px;
        color: #26d7eb;
      }
      &.collect {
        display: block;
      }
    }
  }
}
</style>
