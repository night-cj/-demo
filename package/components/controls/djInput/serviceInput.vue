<template>
  <div class="service-input">
    <el-autocomplete
      ref="autocomplete"
      :value="value"
      :fetch-suggestions="getOptions"
      v-bind="{...$attrs, valueKey}"
      v-on="$listeners"
      @select="handleSelect">
      <template slot-scope="{ item }" v-if="component">
        <component :is="component" :item="item"></component>
      </template>
    </el-autocomplete>
  </div>
</template>

<script>
import httpPolicy from '../../../methods/mixins/httpPolicy';
import handleComponent from '../../../../src/utils/handleComponent';
export default {
  name: 'serviceInput',
  props: {
    value: {},
    service: {
      default: () => {}
    },
    width: {
      type: Number,
      default: null
    },
    valueKey: {
      type: String,
      default: 'value'
    }
  },
  data () {
    return {
      options: []
    };
  },
  computed: {
    component() {
      return handleComponent({
        component: this.$attrs.component,
        render: this.$attrs.render
      });
    }
  },
  mixins: [httpPolicy],
  methods: {
    getOptions(val, cb) {
      this.api().then(res => {
        cb(val ? res.filter(item => item[this.valueKey].includes(val)) : res);
      });
    },
    api() {
      if (this.options.length > 0) {
        return Promise.resolve(this.options);
      } else {
        return this.dj_api_extend(this.service);
      }
    },
    handleSelect(val) {
      this.$emit('input', val[this.valueKey]);
    }
  },
};
</script>
