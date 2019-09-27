<template>
  <el-pagination
    @size-change="changeSize"
    :page-sizes="sizeList"
    :page-size="_pageSize"
    :current-page="pageNo"
    @current-change="changePage"
    :total="total"
    v-bind="getBind()"
    v-on="$listeners">
  </el-pagination>
</template>

<script>
const DEFAULT_PAGE_SIZES = [15, 30, 50, 100, 200];
const DEFAULT_PAGEING_ATTRS = {
  layout: "total, sizes, prev, pager, next, jumper"
};
export default {
  name: 'dj-paging',
  props: {
    'total': {
      type: Number,
      default: 0
    },
    'pageNo': {
      type: Number,
      default: 1
    },
    'pageSize': {
      type: Number
    },
    'pageSizeList': {
      type: Array,
      default: () => DEFAULT_PAGE_SIZES
    }
    },
  computed: {
    sizeList() {
      return this.pageSizeList;
    },
    _pageSize() {
      return this.pageSizeList.includes(this.pageSize) ? this.pageSize : this.pageSizeList[0];
    }
  },
  methods: {
    getBind() {
      return {
        ...DEFAULT_PAGEING_ATTRS,
        ...this.$attrs
      };
    },
    changePage(page) {
      this.$emit('change-page', page);
    },
    changeSize(pageSize) {
      this.$emit('change-size', pageSize);
    }
  },
  watch: {
    total(newVal) {
      let pageSize = this._pageSize;
      let maxPage = Math.ceil(newVal / pageSize);
      if (this.pageNo > maxPage) {
        this.$emit('change-page', maxPage === 0 ? 1 : maxPage, maxPage === 0);
      }
    }
  }
};
</script>
