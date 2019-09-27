<template>
  <div class="date-dup">
    <el-date-picker
      :picker-options="pickerOption_start"
      :value="value_start"
      type="date"
      format="yyyy-MM-dd HH:mm:ss"
      placeholder="开始时间"
      v-bind="filterListeners"
      @input="(val)=>valChange(val, 'start')">
    </el-date-picker>
    <el-date-picker
      :picker-options="pickerOption_end"
      :value="value_end"
      type="date"
      placeholder="结束时间"
      format="yyyy-MM-dd HH:mm:ss"
      v-bind="filterListeners"
      @input="(val)=>valChange(val, 'end')">
    </el-date-picker>
  </div>
</template>

<script>
import dayjs from 'dayjs';
export default {
  name: 'dateDup',
  props: {
    label: {
      type: String,
      default: '日期'
    },
    value: {
      default: ''
    }
  },
  created() {
    this.restValue();
  },
  watch: {
    value() {
      this.restValue();
    }
  },
  computed: {
    filterListeners() {
      return ['input'].reduce((sum, key) => {
        delete sum[key];
        return sum;
      }, {...this.$listeners});
    },
  },
  data() {
    return {
      value_start: null,
      value_end: null,
      pickerOption_start: {
        disabledDate: (time) => {
          if (this.value_end !== "") {
            return time.getTime() > Date.now() || time.getTime() > dayjs(this.value_end).valueOf() ||
            dayjs(this.value_end).subtract('3', 'month').valueOf() > time.getTime();
          } else {
            return time.getTime() > Date.now();
          }
        }
      },
      pickerOption_end: {
        disabledDate: (time) => {
          return time.getTime() < dayjs(this.value_start).valueOf() || time.getTime() > dayjs(this.value_start).add('3', 'month').valueOf() ||
          time.getTime() > Date.now();
        }
      }
    };
  },
  methods: {
    restValue() {
      let temp = this.value || [];
      this.value_start = temp[0] ? dayjs(temp[0]).format('YYYY-MM-DD') + ' 00:00:00' : null;
      this.value_end = temp[1] ? dayjs(temp[1]).format('YYYY-MM-DD') + ' 23:59:59' : null;
    },
    valChange(value, name) {
      let _value = value ? dayjs(value).format('YYYY-MM-DD') + ' 00:00:00' : null;
      if (name === 'start') {
        this.value_start = _value;
      } else if (name === 'end') {
        this.value_end = _value;
      }
      this.$emit('input', [this.value_start, this.value_end]);
    }
  }
};
</script>
