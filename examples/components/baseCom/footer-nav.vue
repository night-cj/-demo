<template>
  <div class="footer-nav">
    <span
      v-if="leftNav"
      class="footer-nav-link footer-nav-left"
      @click="handleNavClick('prev')">
      <i class="el-icon-arrow-left"></i>
      {{ leftNav.title || leftNav.name }}
    </span>
    <span
      v-if="rightNav"
      class="footer-nav-link footer-nav-right"
      @click="handleNavClick('next')">
      {{ rightNav.title || rightNav.name }}
      <i class="el-icon-arrow-right"></i>
    </span>
  </div>
</template>

<script>
  import navConfig from '../../nav.config.json';

  export default {
    data() {
      return {
        currentComponent: null,
        nav: [],
        currentIndex: -1,
        leftNav: null,
        rightNav: null,
        baseUrl: ''
      };
    },

    computed: {
      lang() {
        return this.$route.meta.lang;
      }
    },

    watch: {
      '$route.path'() {
        this.setNav();
        this.updateNav();
      }
    },

    methods: {
      handleNav(navList, result = []) {
        navList.forEach(nav=>{
          if (nav.path) {
            result.push(nav);
          }
          Object.keys(nav).forEach(key=>{
            if (Array.isArray(nav[key])) {
              this.handleNav(nav[key], result);
            }
          })
        });
        return result;
      },
      setNav() {
        // let nav = navConfig[this.lang];
        // this.nav = [nav[0]].concat(nav[3].children);
        // nav[4].groups.map(group => group.list).forEach(list => {
        //   this.nav = this.nav.concat(list);
        // });
        let nav = navConfig[this.lang];
        let pathList = this.$route.path.split('/');
        pathList.forEach(key=>{
          if (nav && nav[key]) {
            this.baseUrl = key;
            this.nav = this.handleNav(nav[key]);
          }
        });
        // this.nav = this.handleNav(nav);

        // this.nav = nav[0].children;
        // nav[1].groups.map(group => group.list).forEach(list => {
        //   this.nav = this.nav.concat(list);
        // });
      },

      updateNav() {
        this.currentComponent = '/' + this.$route.path.split('/')[3];
        for (let i = 0, len = this.nav.length; i < len; i++) {
          if (this.nav[i].path === this.currentComponent) {
            this.currentIndex = i;
            break;
          }
        }
        this.leftNav = this.nav[this.currentIndex - 1];
        this.rightNav = this.nav[this.currentIndex + 1];
      },

      handleNavClick(direction) {
        this.$router.push(`/${ this.lang }/${this.baseUrl}${ direction === 'prev' ? this.leftNav.path : this.rightNav.path }`);
      }
    },

    created() {
      this.setNav();
      this.updateNav();
    }
  };
</script>

<style lang="less">
  .footer-nav {
    padding: 40px 0;
    font-size: 14px;
    color: #333;
    &::after {
      display: block;
      clear: both;
      content: '';
    }
    & i {
      color: #999;
      vertical-align: baseline;
      transition: 0.3s;
    }
  }
  .footer-nav-link {
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      color: #409eff;
      & i {
        color: #409eff;
      }
    }
  }
  .footer-nav-left {
    float: left;
    margin-left: -4px;
  }
  .footer-nav-right {
    float: right;
    margin-right: -4px;
  }
</style>
