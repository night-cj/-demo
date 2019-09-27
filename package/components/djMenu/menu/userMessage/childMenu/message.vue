<template>
  <div class="message">
    <div class="message-item" v-for="item in config">
      {{ item.label }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'message',
  data() {
    return {
      config: []
    };
  }
};
</script>

<style lang="less" scoped>
// .message {}
</style>
