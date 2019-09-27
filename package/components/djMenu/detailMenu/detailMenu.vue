<template>
  <div class="detail-menu">
    <div class="detail-menu-content">
      <div class="detail-menu-content-header">
        <div class="detail-menu-content-header-search">
          <i class="el-icon-search"></i>
          <input placeholder="请输入关键词" v-model="query.keyWord">
        </div>
      </div>
      <div class="detail-menu-content-body">
        <div class="detail-menu-content-body-menu" ref="menuContent">
          <div class="detail-menu-content-body-menu-fall">
            <waterfall-box ref="waterfallBox" :data="menus" item-key="path" :item-com="waterFallItem" v-if="menus.length > 0"></waterfall-box>
          </div>
        </div><div
         class="detail-menu-content-body-navigation">
          <div
            :class="['detail-menu-content-body-navigation-item', {'click': selectMenu === item}]" v-for="item in menus"
            @click="clickMenu(item)">
            {{ item.title }}
          </div>
        </div>
      </div>
      <div class="detail-menu-content-close" @click="$emit('close')">
        <i class="el-icon-close"></i>
      </div>
    </div>
  </div>
</template>

<script>
import waterFallItem from '../waterFallItem/waterFallItem.vue';
import waterfallBox from '../../container/djWaterfallBox';
export default {
  name: 'detail-menu',
  inject: ['store'],
  data() {
    return {
      query: {
        keyWord: ''
      },
      selectMenu: null,
      // waterFallItem: {
      //   // functional: true,
      //   props: ['item'],
      //   render() {
      //     return <waterFallItem store={this.getStore()} item={this.item} />
      //   },
      //   components: {
      //     waterFallItem
      //   },
      //   methods: {
      //     getStore: () => this.store
      //   }
      // },
      waterFallItem: waterFallItem
    };
  },
  computed: {
    menus() {
      return this.store.state.menus.map(item => ({...item})).filter(menu => {
        menu.children = menu.children.filter(second => second.title.includes(this.query.keyWord));
        return menu.children.length > 0;
      });
    }
  },
  components: {
    waterfallBox,
    waterFallItem
  },
  methods: {
    clickMenu(menu) {
      this.selectMenu = menu;
      this.$refs.menuContent.scrollTop = this.$refs.waterfallBox.scrollIntoView(menu);
    }
  }
};
</script>

<style lang="less" scoped>
.detail-menu {
  position: relative;
  width: 950px;
  height: 100%;
  background-color: white;
  &-content {
    height: 100%;
    padding: 30px 40px 0 30px;
    box-sizing: border-box;
    &-header {
      position: relative;
      i {
        position: absolute;
        top: 8px;
        left: 8px;
      }
      input {
        width: 691px;
        height: 23px;
        padding: 4px 11px 4px 30px;
        border-width: 0 0 1px;
        border-radius: 0;
        &::-webkit-input-placeholder {
          color: #bfbfbf;
        }
        &:focus {
          border-color: #26d7eb;
        }
      }
      &:hover {
        input {
          border-color: #26d7eb;
        }
      }
    }
    &-body {
      position: relative;
      height: 100%;
      &-menu {
        position: relative;
        display: inline-block;
        width: 738px;
        height: calc(~'100% - 32px');
        padding-right: 20px;
        margin-top: 24px;
        overflow: auto;
        box-sizing: border-box;
        &::-webkit-scrollbar {
          width: 0;
        }
        &-fall {
          position: absolute;
          width: 100%;
          height: calc(~'100% - 24px');
        }
      }
      &-navigation {
        display: inline-block;
        margin-top: 24px;
        vertical-align: top;
        &-item {
          width: 102px;
          height: 14px;
          padding: 7px 0 7px 16px;
          font-size: 12px;
          cursor: pointer;
          border-left: 2px solid #e1e6eb;
          transition: all 0.3s;
          &:hover {
            color: #00c1de;
          }
          &.click {
            color: #00c1de;
            border-color: #00c1de;
          }
        }
      }
    }
    &-close {
      position: absolute;
      top: 15px;
      right: 20px;
      width: 20px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      cursor: pointer;
    }
  }
}
</style>
