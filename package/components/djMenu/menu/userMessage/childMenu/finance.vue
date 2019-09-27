<template>
  <div class="finance">
    <div class="finance-item" v-for="item in config">
      <div>{{ item.label }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'finance',
  data() {
    return {
      config: [
        { label: '账单', value: 'single' },
        { label: '发票', value: 'complex' },
        { label: '进入财务中心', value: 'english' },
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.finance {
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
