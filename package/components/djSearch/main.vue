<template>
  <div class="dj-search" @click.stop :style="{height: searchHeight + 'px'}">
    <!-- <div class="dj-search-query">
      <div class="dj-search-query-item" v-for="item in config" v-if="cache[item.key]">
        <div><i></i></div><span>{{ item.label }}</span>{{ cache[item.key] }}
      </div>
    </div> -->
    <div
      class="dj-search-mask"
      v-show="!dropDownFlag"
      @click="clickOutSide">
    </div>
    <div
      class="dj-search-content"
      @mouseover="hover"
      ref="searchContent">
      <div class="dj-search-content-condition">
        <div :style="{width: columnsNumber * normalItemWidth + 'px'}">
          <div
            class="dj-search-content-condition-item"
            :style="{width: (isDateRangeType(item) ? longItemWidth : normalItemWidth) + 'px'}"
            v-for="(item, index) in showData"
            :key="index">
            <item-box v-bind="item">
              <component
                @input="$emit('change', query, item)"
                :ref="getKey(item)"
                :is="getComponent(item)"
                v-model="query[item.key]"
                :label="item.label"
                v-on="listenersMap[getKey(item)]"
                v-bind="item.attrs">
              </component>
            </item-box>
          </div>
          <div class="dj-search-content-condition-button" :style="{width: normalItemWidth + 'px'}">
            <el-button type="primary" size="medium" @click="search" :disabled="disabled">搜索</el-button>
            <el-button size="medium" @click="restQuery">重置</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import typeMapPolicy from '../../../src/mixins/typeMapPolicy';
import itemBox from '../container/djItemBox';
import listenerPolicy from '../../methods/mixins/listenerPolicy.js';
import listenersMap from "../../../src/mixins/listenersMap";
import layout from "./layout";
import {deepClone, checkType} from '../../methods/utils/methods.js';
export default {
  name: 'dj-search',
  props: {
    config: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    },
  },
  mixins: [listenerPolicy, typeMapPolicy, listenersMap({configs: 'config', key: 'key'}), layout],
  data() {
    return {
      hidden: false,
      query: this.getBaseQuery(),
      cache: {},
    };
  },
  components: {
    itemBox
  },
  methods: {
    getBaseQuery() {
      return this.config.reduce((sum, item) => {
        let { attrs = {} } = item;
        let _default = attrs.default;
        if (checkType(_default, ['Object', 'Array'])) {
          _default = deepClone(_default);
        }
        sum[item.key] = _default;
        return sum;
      }, {});
    },
    search() {
      let tempQuery = deepClone(this.query);
      this.$emit('search', tempQuery);
      this.cache = tempQuery;
    },
    restQuery() {
      this.$emit('before-reset');
      this.query = this.getBaseQuery();
    },
  }
};
</script>
