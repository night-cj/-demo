<template>
  <div class="language">
    <div class="language-item" v-for="item in config">
      <div>{{ item.label }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'language',
  data() {
    return {
      config: [
        { label: '简体中文', value: 'single' },
        { label: '繁体中文', value: 'complex' },
        { label: 'English', value: 'english' },
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.language {
  display: flex;
  flex-direction: column;
  width: 120px;
  height: 120px;
  &-item {
    position: relative;
    flex-grow: 1;
    transition: all 0.3s;
    &:hover {
      color: #00c1de;
    }
    div {
      display: flex;
      align-items: center;
      height: 100%;
      margin-left: 10px;
    }
  }
}
</style>
