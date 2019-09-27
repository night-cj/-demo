<template>
  <el-autocomplete
    v-model="query"
    size="small"
    :popper-class="`algolia-search${ isEmpty ? ' is-empty' : '' }`"
    :fetch-suggestions="querySearch"
    :placeholder="placeholder"
    :trigger-on-focus="false"
    @select="handleSelect">
    <template slot-scope="props">
      <p class="algolia-search-title" v-if="props.item.title">
        <span v-html="props.item.highlightedCompo"></span>
        <span v-if="props.item.highlightedCompo && props.item.title" class="algolia-search-separator">></span>
        <span v-html="props.item.title"></span>
      </p>
      <p
        class="algolia-search-content"
        v-if="props.item.content"
        v-html="props.item.content"></p>
      <!--<a-->
        <!--class="algolia-search-link"-->
        <!--v-if="props.item.img"-->
        <!--target="_blank"-->
        <!--href="https://www.algolia.com/docsearch">-->
        <!--<img-->
          <!--class="algolia-search-logo"-->
          <!--src="../../assets/images/search-by-algolia.svg"-->
          <!--alt="algolia-logo">-->
      <!--</a>-->
      <p
        class="algolia-search-empty"
        v-if="props.item.isEmpty">{{ emptyText }}</p>
    </template>
  </el-autocomplete>
</template>

<script>
  import navConfig from '../../nav.config';
  import { toObject } from "../../../package/methods/utils/methods";
  // import components from "../../../package/components/djInput";
  export default {
    data() {
      return {
        index: null,
        query: '',
        isEmpty: false,
        langs: {
          'zh-CN': {
            search: '搜索文档',
            empty: '无匹配结果',
            index: 'zh'
          },
          'en-US': {
            search: 'Search',
            empty: 'No results',
            index: 'en'
          },
          'es': {
            search: 'Buscar',
            empty: 'No hay datos que coincidan',
            index: 'es'
          }
        },
        searchMap: {}
      };
    },

    computed: {
      lang() {
        return this.$route.meta.lang;
      },

      placeholder() {
        return this.lang ? this.langs[this.lang].search : '';
      },

      emptyText() {
        return this.lang ? this.langs[this.lang].empty : '';
      }
    },

    watch: {
      lang() {
        this.initIndex();
        this.init();
      }
    },

    methods: {
      handleSearchMap(navList, baseUrl, result = {}) {
        navList.forEach(nav=>{
          if (nav.path) {
            if (nav.name) {
              result[nav.name] = Object.assign({}, nav, {path: baseUrl + nav.path});
            }
            if (nav.title) {
              result[nav.title] = Object.assign({}, nav, {path: baseUrl + nav.path});
            }
          }
          Object.keys(nav).forEach(key=>{
            if (Array.isArray(nav[key])) {
              this.handleSearchMap(nav[key], baseUrl, result);
            }
          });
        });
        return result;
      },
      init() {
        let nav = navConfig[this.lang];
        if (nav) {
          let mapList = [];
          Object.keys(nav).forEach(key=>{
            mapList.push(this.handleSearchMap(nav[key], key));
          });
          this.searchMap = toObject(mapList);
        }
      },
      initIndex() {},

      querySearch(query, cb) {
        // todo element使用algolia服务搜索文档
        if (!query) return;
        this.isEmpty = false;
        let res = [];
        Object.keys(this.searchMap).forEach(key=>{
          if (new RegExp(query, 'i').test(key)) {
            res.push({
              highlightedCompo: this.searchMap[key].name,
              title: this.searchMap[key].title || '',
              path: this.searchMap[key].path || ''
            });
          }
        });
        if (res.length) {
          cb(res);
        } else {
          this.isEmpty = true;
          cb([{ isEmpty: true }]);
        }
      },

      handleSelect(val) {
        if (val.img || val.isEmpty) return;
        // const component = val.component || '';
        let { anchor, path} = val;
        this.$router.push(`/${ this.lang }/${ path }${ anchor ? `#${ anchor }` : '' }`);
      }
    },

    mounted() {
      this.initIndex();
      this.init();
    }
  };
</script>

<style lang="less">
  .algolia-search {
    width: 450px !important;
    &.is-empty {
      .el-autocomplete-suggestion__list {
        padding-bottom: 0;
      }
    }
    .el-autocomplete-suggestion__list {
      position: static !important;
      /*padding-bottom: 28px;*/
    }
    li {
      border-bottom: solid 1px #ebebeb;
      &:last-child {
        border-bottom: none;
      }
    }
    .algolia-highlight {
      font-weight: bold;
      color: #409eff;
    }
    .algolia-search-title {
      margin: 6px 0;
      font-size: 14px;
      line-height: 1.8;
    }
    .algolia-search-separator {
      padding: 0 6px;
    }
    .algolia-search-content {
      margin: 6px 0;
      overflow: hidden;
      font-size: 12px;
      line-height: 2.4;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .algolia-search-link {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      padding-right: 20px;
      text-align: right;
      background-color: #e4e7ed;
      border-bottom-right-radius: 4px;
      border-bottom-left-radius: 4px;
      box-sizing: border-box;
      &:hover {
        background-color: #e4e7ed;
      }
      img {
        display: inline-block;
        height: 17px;
        margin-top: 10px;
      }
    }
    .algolia-search-empty {
      margin: 5px 0;
      color: #999;
      text-align: center;
    }
  }
</style>
