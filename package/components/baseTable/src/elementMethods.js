export default {
  methods: {
    trigger(method, data) {
      const {$refs: {eltable}} = this;
      // 优先调用自定义封装方法，没有再调用element-table 方法
      if (eltable && eltable[method]) {
        eltable[method](data);
      }
    },

    toggleRowSelection(data) {
      this.trigger('toggleRowSelection', data);
    },

    toggleRowExpansion(data) {
      this.trigger('toggleRowExpansion', data);
    },

    setCurrentRow(data) {
      this.trigger('setCurrentRow', data);
    },

    clearCurrentRow() {
      this.trigger('setCurrentRow', undefined);
    },

    clearSort() {
      this.trigger('clearSort');
    },

    clearFilter() {
      this.trigger('clearFilter');
    },

    clearSelection(data) {
      this.trigger('clearSelection', data);
    },

    doLayout() {
      this.trigger('doLayout');
    }
  }
};
