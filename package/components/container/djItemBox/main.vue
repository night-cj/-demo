<template>
  <div class="dj-item-box">
    <div
      class="dj-item-box-label"
      v-if="label"
      :title="label + labelSuffix"
      :style="{width: labelWidth + 'px', 'text-align': labelPosition}">
      <span>{{label}}</span><span>{{labelSuffix}}</span>
    </div><div
     class="dj-item-box-value">
      <slot>
        <component :is="getComponent($attrs)" :value="value" :label="label" v-on="$listeners" v-bind="attrs"></component>
      </slot>
    </div>
  </div>
</template>

<script>
  import typeMapPolicy from '../../../../src/mixins/typeMapPolicy';
  export default {
    name: 'dj-item-box',
    mixins: [typeMapPolicy],
    props: {
      value: {
        default: ''
      },
      labelSuffix: {
        type: String,
        default: ''
      },
      labelWidth: {
        type: Number,
        default: null
      },
      labelPosition: {
        type: String,
        default: null
      },
      label: {
        default: null
      },
      attrs: {},
    },
    data() {
      return {};
    },
  };
</script>
