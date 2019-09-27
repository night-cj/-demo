<template>
  <div class="dj-cascader">
    <div class="dj-cascader-content" :style="{width: width + 'px'}">
      <el-cascader
        :value="value"
        ref="elCascader"
        @change="change"
        :props="props_"
        :options="options"
        v-bind="getBind()"
        v-on="$listeners">
      </el-cascader>
    </div>
  </div>
</template>

<script>
const DEFAULT_ATTRS = {
  collapseTags: true
};
function getDefaultProps(apis) {
  return {
    lazy: true,
    checkStrictly: true,
    lazyLoad(node, resolve) {
      const { level } = node;
      let api = apis[level];
      if (typeof api === 'function') {
        if (node.children && node.children.length > 0) {
          resolve();
        } else {
          api(node.value).then(res => {
            resolve(res.map(item => ({...item, leaf: level === apis.length - 1})));
          });
        }
      }
    }
  };
}
const pipeAsyncFunctions = (...fns) => arg => fns.reduce((p, f) => p.then(f), Promise.resolve(arg));
export default {
  name: 'djCascader',
  props: {
    apiArray: {
      type: Array,
      default: () => []
    },
    props: {
      type: Object,
      default: () => {}
    },
    width: {
      type: Number,
      default: null
    },
    value: {}
  },
  data() {
    let apiArray = this.apiArray;
    return {
      options: [],
      props_: Object.assign(getDefaultProps(apiArray), this.props)
    };
  },
  mounted () {
    if (this.props_.lazy && this.value && this.value.length > 0) {
      if (this.value.length !== this.apiArray.length) {
        return this.$message.error('传入api数组长度和绑定值长度不一致');
      }
      pipeAsyncFunctions(...this.apiArray.map((api, index) => {
        return father => api(this.value[index - 1]).then(res => {
          if (index === 0) {
            this.options = res.map(item => ({...item, children: []}));
            father = this.options.find(option => option.value === this.value[index]);
          } else {
            if (!father) return;
            father.children = res.map(item => ({...item, children: [], leaf: index === this.value.length - 1}));
            father = father.children.find(option => option.value === this.value[index]);
          }
          return father;
        });
      }))();
    }
  },
  methods: {
    change(selected) {
      this.$emit('input', selected);
      this.$emit('select', this.$refs.elCascader.panel.checkedNodePaths);
      this.$emit('single-select', this.getCheckedNodes());
    },
    getCheckedNodes() {
      let menus = this.$refs.elCascader.panel.menus;
      return this.$refs.elCascader.checkedValue.map((val, index) => {
        return menus[index].find(item => item.value === val);
      });
    },
    getBind() {
      return {
        ...DEFAULT_ATTRS,
        ...this.$attrs
      };
    }
  }
};
</script>
