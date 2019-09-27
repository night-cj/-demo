<template>
  <el-select
    :style="{width: width+'px'}"
    :value="query"
    :multiple="type === 'multiple'"
    v-bind="getBind()"
    :class="getSelectWrapClass()"
    v-on="filterListeners"
    @input="valueChange">
    <el-option
      v-for="item in options_"
      v-bind="subAtrrs"
      :key="getLabel(item) + getValue(item)"
      :label="getLabel(item)"
      :value="getValue(item)"
      :disabled="item.disabled"></el-option>
  </el-select>
</template>

<script>
  import httpPolicy from '../../../methods/mixins/httpPolicy';
  import placeholder from '../../../../src/mixins/placeholder';
  import choice from '../../../../src/mixins/choice';
  const DEFAULT_SELECT_ATTRS = {
    clearable: true,
    size: 'medium'
  };
  export default {
    name: 'dj-select',
    props: {
      value: {},
      label: {
        default: null
      },
      service: {
        default: null
      },
      type: {
        default: 'single'
      },
      autoFormat: {
        type: Boolean,
        default: true
      },
      width: {
        type: Number,
        default: null
      },
      bindObject: {
        type: Boolean,
        default: false
      },
      default: {
        default: ''
      },
    },
    mixins: [
      httpPolicy,
      placeholder,
      choice
    ],
    data() {
      return {
        query: '',
        options_: this.options || []
      };
    },
    computed: {
      filterListeners() {
        return ['input'].reduce((sum, key) => {
          delete sum[key];
          return sum;
        }, {...this.$listeners});
      },
    },
    methods: {
      //多选时，加上特殊类名，防止内容过长时超出输入框
      getSelectWrapClass() {
        if (this.type === 'multiple') {
          if (this.$attrs['collapse-tags']) {
            return 'select-ellipsis-multi-col';
          } else {
            return 'select-ellipsis-multi';
          }
        }
      },
      getLabel(item) {
        if (item[this.keyMap_.label] !== undefined) {
          return item[this.keyMap_.label];
        } else if (item[this.keyMap_.value] !== undefined) {
          return item[this.keyMap_.value];
        } else {
          return item;
        }
      },
      getValue(item) {
        if (this.bindObject) {
          return item;
        } else if (item[this.keyMap_.value] !== undefined) {
          return item[this.keyMap_.value];
        } else {
          return item;
        }
      },
      valueChange(val) {
        let selectItem;
        if (this.type === 'multiple') {
          selectItem = val.map(query => this.options_.find(item => item[this.keyMap_.value] === query));
        } else {
          selectItem = this.options_.find(item => item[this.keyMap_.value] === val);
        }
        this.$emit('select-item', selectItem);
        this.$emit('input', val);
      },
      getOptions(val) {
        if (!this.service) return;
        this.options_ = [];
        return this.dj_api_extend(this.service, val).then(res => {
          this.options_ = res;
        });
      },
      getBind() {
        return {
          ...DEFAULT_SELECT_ATTRS,
          placeholder: this.getPlaceholder('select', this.label),
          valueKey: this.bindObject ? this.keyMap_.value : undefined,
          ...this.$attrs
        };
      }
    },
    created() {
      if (this.type === 'multiple') {
        this.query = Array.isArray(this.value) && this.value.length ? this.value : this.default || [];
      } else {
        this.query = this.value !== undefined ? this.value : this.default;
      }
      if (this.value !== this.query) {
        this.$emit('input', this.query);
        this.$emit('change', this.query);
      }
      this.autoFormat && this.getOptions();
    },
    watch: {
      options() {
        this.options_ = this.options || [];
      },
      value() {
        if (this.type === 'multiple') {
          this.query = this.value || [];
        } else {
          this.query = this.value;
        }
      }
    }
  };
</script>
