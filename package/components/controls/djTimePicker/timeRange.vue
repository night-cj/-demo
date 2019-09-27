<template>
  <div class="time-range">
    <el-time-select v-model="startTime"
                    placeholder="开始"
                    v-bind="getBind()"
                    @change="valueChange">
    </el-time-select>
    &nbsp;<span class="connect-line">-</span>&nbsp;
    <el-time-select v-model="endTime"
                    placeholder="结束"
                    v-bind="getBind()"
                    @change="valueChange">
    </el-time-select>
  </div>
</template>

<script>
  const DEFAULT_PICKER_OPTIONS = {
    start: '00:00',
    step: '01:00',
    end: '24:00'
  };
  export default {
    name: 'timeRange',
    props: {
      value: {
        default: ''
      }
    },
    data() {
      return {
        startTime: '',
        endTime: ''
      };
    },
    beforeMount() {
      this.restValue();
    },
    watch: {
      value() {
        this.restValue();
      }
    },
    methods: {
      getBind() {
        return {
          pickerOptions: DEFAULT_PICKER_OPTIONS,
          ...this.$attrs,
          type: undefined
        };
      },
      restValue() {
        let temp = this.value || [];
        this.startTime = temp[0];
        this.endTime = temp[1];
      },
      valueChange() {
        this.startTime = this.startTime || '';
        this.endTime = this.endTime || '';
        this.$emit('input', [this.startTime, this.endTime]);
      }
    }
  };
</script>
