<template>
  <div class="workOrder">
    <div class="workOrder-item" v-for="item in config">
      <div>{{ item.label }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'workOrder',
  data() {
    return {
      config: [
        { label: '我的工单', value: 'single' },
        { label: '提交工单', value: 'complex' },
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.workOrder {
  display: flex;
  flex-direction: column;
  width: 120px;
  height: 80px;
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
