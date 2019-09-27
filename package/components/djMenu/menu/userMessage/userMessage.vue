<template>
  <div class="user-message">
    <div class="user-message-item" v-for="item in config">
      <i :class="item.icon" v-if="item.icon"></i>
      <span v-if="item.label">{{ item.label }}</span>
      <div class="user-message-item-curtain" v-if="item.hasMenu">
        <div :is="item.type"></div>
      </div>
    </div>
    <div class="user-message-item">
      <img src="@/assets/images/icon.png">
    </div>
  </div>
</template>

<script>
import childMenu from './childMenu';
export default {
  name: 'user-message',
  data() {
    return {
      config: [
        { type: 'message', label: '消息' },
        { type: 'finance', label: '财务' },
        { type: 'workOrder', label: '工单' },
        { type: 'files', label: '文档' },
        { type: 'cart', icon: 'el-icon-goods' },
        { type: 'language', label: '简体中文' },
      ].map(item => {
        item.hasMenu = !!childMenu[item.type];
        return item;
      })
    };
  },
  components: {
    ...childMenu
  }
};
</script>

<style lang="less" scoped>
.user-message {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  height: 100%;
  &-item {
    position: relative;
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 16px;
    font-size: 14px;
    color: white;
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 0, 0, 0.3);
    }
    &:hover &-curtain {
      z-index: 1000;
      opacity: 1;
    }
    &-curtain {
      position: absolute;
      top: 100%;
      right: 0;
      background-color: #172938;
      opacity: 0;
      transition: opacity 0.3s;
    }
  }
  img {
    width: 30px;
    height: 30px;
    background-color: #fff;
    border: 2px solid #fff;
    border-radius: 50%;
  }
}
</style>
