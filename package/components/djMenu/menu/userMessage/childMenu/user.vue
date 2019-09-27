<template>
  <div class="user">
    <div class="user-item" v-for="item in config">
      {{ item.label }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'user',
  data() {
    return {
      config: []
    };
  }
};
</script>

<style lang="less" scoped>
// .user {}
</style>
