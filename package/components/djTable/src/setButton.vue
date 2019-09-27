<template>
  <div class="set-button">
    <el-popover
      placement="bottom"
      trigger="click"
      ref="popover"
      @show="show">
      <span class="suffix-container">
        <!--暂不开放滚动加载的控制-->
        <!--<el-checkbox :value="scrollLoad" @change="changeScrollLoad">-->
            <!--滚动加载-->
        <!--</el-checkbox>-->
        <el-checkbox-group v-model="filteredColumn" class="dj-table-checkbox-group">
          <el-checkbox v-for="item in columnOptions"
                       :key="item.prop"
                       :label="item.prop">
            {{item.label}}
          </el-checkbox>
        </el-checkbox-group>
        <div class="button-wrap">
          <el-button @click="confirmFilter" type="primary" size="mini">确定</el-button>
        </div>
      </span>
<!--      <i class="el-icon-setting set-icon" slot="reference"></i>-->
      <i class="dj-common- dj-common-setup-n set-icon" slot="reference"></i>
    </el-popover>
  </div>
</template>
<script>
  export default {
    name: 'setButton',
    props: {
      defaultFilteredColumn: {
        type: Array,
        default: () => []
      },
      columnOptions: {
        type: Array,
        default: () => []
      },
      scrollLoad: {
        type: Boolean
      }
    },
    computed: {
      table() {
        return this.$parent;
      }
    },
    data: function () {
      return {
        filteredColumn: []
      };
    },
    methods: {
      // chooseColumn(prop) {
      //   let _filteredColumn = this.filteredColumn.splice(0);
      //   console.log('_filteredColumn', [..._filteredColumn]);
      //   let _index = _filteredColumn.findIndex(item => item === prop);
      //   if (_index > -1) {
      //     _filteredColumn.splice(_index, 1);
      //   } else {
      //     _filteredColumn.push(prop);
      //   }
      //   console.log('_filteredColumn', _filteredColumn);
      //   console.log('_index', _index);
      //   console.log('prop', prop);
      //   this.filteredColumn = _filteredColumn;
      //   // this.saveCacheColumns();
      // },
      show() {
        this.filteredColumn = [...this.defaultFilteredColumn];
      },
      confirmFilter() {
        this.$emit('confirm-filter', [...this.filteredColumn]);
        this.$refs.popover.doClose();
      },
      changeScrollLoad(val) {
        this.$emit('changeScrollLoad', val);
      }
    }
  };
</script>

