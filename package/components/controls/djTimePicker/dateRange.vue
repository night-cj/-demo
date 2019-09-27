<template>
  <div class="date-range">
    <el-date-picker
      :value="date"
      v-bind="getBind()"
      @input="valueChange"
      v-on="filterListeners">
    </el-date-picker>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import placeholder from '../../../../src/mixins/placeholder';
function getRange(type, num, unit = 'day') {
  let end = new Date(dayjs().add(1, unit).format('YYYY/MM/DD'));
  let start = new Date(dayjs(end).subtract(num, unit).valueOf());
  if (type === 'daterange') {
    end = dayjs(end).subtract(1, 'day');
  }
  return [start, end];
}
function getPickerOptions(type) {
  let options = {};
  if (type === 'month') {
    options = {
      disabledDate(time) {
        return time.getTime() > dayjs().add('1', 'month').valueOf();
      }
    };
  } else if (['daterange', 'datetimerange'].includes(type)) {
    options = {
      shortcuts: [
        {
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', getRange(type, 1));
          }
        },
        {
          text: '近7天',
          onClick(picker) {
            picker.$emit('pick', getRange(type, 7));
          }
        },
        {
          text: '近30天',
          onClick(picker) {
            picker.$emit('pick', getRange(type, 30));
          }
        }
      ]
    };
  }
  return options;
}
export default {
  name: 'dateRange',
  mixins: [placeholder],
  props: {
    label: {
      type: String,
      default: '日期'
    },
    type: {
      default: 'datetime'
    },
    value: {
      default: ''
    }
  },
  watch: {
    value() {
      this.date = this.value || '';
    }
  },
  data() {
    return {
      date: this.value
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
    getBind() {
      let defaultAttrs = this.getDefAttrs(this.type) || {};
      let pickerOptions = Object.assign({}, defaultAttrs.pickerOptions || {}, this.$attrs.pickerOptions || {});
      return {
        placeholder: this.getPlaceholder('select', this.label),
        ...defaultAttrs,
        ...this._props,
        ...this.$attrs,
        pickerOptions
      };
    },
    getDefAttrs(type) {
      switch (type) {
        case 'month':
          return {
            'format': 'yyyy-MM',
            'placeholder': '选择月',
            'pickerOptions': getPickerOptions(type)
          };
        case 'daterange':
        case 'datetimerange':
          return {
            'range-separator': '至',
            'start-placeholder': '开始日期',
            'end-placeholder': '结束日期',
            'pickerOptions': getPickerOptions(type)
          };
      }
    },
    valueChange(val) {
      if (this.type === 'month') {
        val = val ? dayjs(val).format('YYYY-MM') : '';
      } else if (this.type === 'datetimerange') {
        val = val ? val.map(item => dayjs(item).format('YYYY-MM-DD HH:mm:ss')) : [];
      } else if (this.type === 'daterange') {
        val = val ? val.map(item => dayjs(item).format('YYYY-MM-DD')) : [];
      }
      this.$emit('input', val);
    },
  }
};
</script>
