<template>
  <div class="dj-dialog">
    <el-dialog
      top="0"
      :title="title"
      :visible="dialogVisible"
      :close-on-click-modal="false"
      :append-to-body="true"
      @close="closeCallback"
      @closed="closed"
      @open="open"
      v-bind="$attrs"
      v-on="filterListeners">
      <div class="dj-dialog-content" v-if="isOpen">
        <dj-scroll-box>
          <slot>这是一段信息</slot>
        </dj-scroll-box>
      </div>
      <div class="dj-dialog-footer" slot="footer">
        <slot name="footer"  v-if="hasFooter">
          <el-button @click="closeCallback">取 消</el-button>
          <slot name="footer-confirm">
            <el-button type="primary" @click="confirm" :loading="loading">确 认</el-button>
          </slot>
        </slot>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'dj-dialog',
  props: {
    title: {
      default: '标题'
    },
    hasFooter: {
      default: true
    },
    loading: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      dialogVisible: false,
      isOpen: false
    };
  },
  computed: {
    filterListeners() {
      return ['close', 'open'].reduce((sum, key) => {
        delete sum[key];
        return sum;
      }, {...this.$listeners});
    },
  },
  methods: {
    confirm() {
      this.$emit('confirm');
    },
    open() {
      this.dialogVisible = true;
      this.isOpen = true;
    },
    closed() {
      this.isOpen = false;
    },
    closeCallback() {
      this.dialogVisible && this.$emit('close');
    },
    close() {
      this.dialogVisible = false;
    }
  }
};
</script>
