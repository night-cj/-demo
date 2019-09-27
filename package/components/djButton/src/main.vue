<template>
  <el-button :disabled="disabled" v-bind="{loading: isLoading, ...$attrs}" v-on="filterListeners" @click="handleClick">
    <template v-for="key in Object.keys($slots)" :slot="key">
      <slot :name="key"></slot>
    </template>
  </el-button>
</template>
<script>
  export default {
    name: 'djButton',
    props: ['disabled'],
    data: function () {
      return {
        isLoading: false,
      };
    },
    computed: {
      filterListeners() {
        return ['click'].reduce((sum, key) => {
          delete sum[key];
          return sum;
        }, {...this.$listeners});
      },
    },
    created() {
    },
    methods: {
      cancelLoading() {
        if (this.isLoading) {
          this.isLoading = false;
        }
      },
      handleClick(...argv) {
        if (!this.disabled) {
          if (!this.isLoading) {
            this.isLoading = true;
          }
          this.$emit('click', this.cancelLoading, ...argv);
        }
      }
    }
  };
</script>
<style lang="less" scoped>

</style>
