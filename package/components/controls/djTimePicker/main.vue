<template>
  <date-dup v-if="type === 'datedup'"
            :value="value"
            v-bind="$attrs"
            v-on="filterListeners"
            @input="emitInput"></date-dup>
  <time-range v-else-if="type === 'timerange'"
              :value="value"
              v-bind="$attrs"
              v-on="filterListeners"
              @input="emitInput"></time-range>
  <date-range v-else
              :value="value"
              v-bind="{type, ...$attrs}"
              v-on="filterListeners"
              @input="emitInput"></date-range>
</template>

<script>
import dateDup from './dateDup';
import dateRange from './dateRange';
import timeRange from './timeRange';
import interceptChange from '../../../../src/mixins/interceptChange';
export default {
  name: 'dj-time-picker',
  mixins: [interceptChange],
  props: {
    type: {
      type: String,
      default: 'daterange'
    },
    default: {},
    value: {}
  },
  computed: {
    filterListeners() {
      return ['input'].reduce((sum, key) => {
        delete sum[key];
        return sum;
      }, {...this.$listeners});
    },
  },
  created() {
    if ([undefined, ''].includes(this.value) && this.default !== undefined) {
      // this.$emit('input', this.default);
      this.emitInput(this.default);
    }
  },
  components: {
    dateDup,
    dateRange,
    timeRange
  }
};
</script>
