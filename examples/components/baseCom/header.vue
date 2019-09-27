<template>
  <div class="headerWrapper">
    <header class="header" ref="header">
      <div class="container">
        <h1>
          <router-link :to="`/${ lang }`">
            <!-- logo -->
            <slot>
              <img
                src="../../assets/images/logo.png"
                alt="element-logo"
                class="nav-logo">
              <!--<img-->
                <!--src="../../assets/images/element-logo-small.svg"-->
                <!--alt="element-logo"-->
                <!--class="nav-logo-small">-->
            </slot>

          </router-link>
        </h1>

        <!-- nav -->
        <ul class="nav clearfix">
          <li class="nav-item nav-algolia-search" v-show="isComponentPage">
            <algolia-search></algolia-search>
          </li>
          <!--<li class="nav-item">-->
            <!--<router-link-->
              <!--active-class="active"-->
              <!--:to="`/${ lang }/guide`">{{ langConfig.guide }}-->
            <!--</router-link>-->
          <!--</li>-->
          <li class="nav-item">
            <router-link
              active-class="active"
              :to="`/${ lang }/changeLog`">{{ langConfig.journal }}
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              active-class="active"
              :to="`/${ lang }/component`">{{ langConfig.components }}
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              active-class="active"
              :to="`/${ lang }/function`">{{ langConfig.function }}
            </router-link>
          </li>

          <!-- gap -->
          <li class="nav-item">
            <div class="nav-gap"></div>
          </li>

          <!-- 版本选择器 -->
          <!--<li class="nav-item nav-versions" v-show="isComponentPage">-->
            <!--<el-dropdown-->
              <!--trigger="click"-->
              <!--class="nav-dropdown"-->
              <!--:class="{ 'is-active': verDropdownVisible }">-->
              <!--<span>-->
                <!--{{ version }}-->
                <!--<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
              <!--</span>-->
              <!--<el-dropdown-menu-->
                <!--slot="dropdown"-->
                <!--class="nav-dropdown-list"-->
                <!--@input="handleVerDropdownToggle">-->
                <!--<el-dropdown-item-->
                  <!--v-for="item in Object.keys(versions)"-->
                  <!--:key="item"-->
                  <!--@click.native="switchVersion(item)">-->
                  <!--{{ item }}-->
                <!--</el-dropdown-item>-->
              <!--</el-dropdown-menu>-->
            <!--</el-dropdown>-->
          <!--</li>-->

          <!-- 语言选择器 -->
          <li class="nav-item lang-item">
            <el-dropdown
              trigger="click"
              class="nav-dropdown nav-lang"
              :class="{ 'is-active': langDropdownVisible }">
              <span>
                {{ displayedLang }}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu
                slot="dropdown"
                class="nav-dropdown-list"
                @input="handleLangDropdownToggle">
                <el-dropdown-item
                  v-for="(value, key) in langs"
                  :key="key"
                  @click.native="switchLang(key)">
                  {{ value }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>

          <!--theme picker-->
          <li class="nav-item nav-theme-switch">
            <theme-picker></theme-picker>
          </li>
        </ul>
      </div>
    </header>
  </div>
</template>
<script>
  import ThemePicker from './theme-picker.vue';
  import AlgoliaSearch from './search.vue';
  import compoLang from '../../i18n/component.json';
  // import { version } from 'main/index.js';
  import pkg from '../../../package.json';

  const version = pkg.version;
  export default {
    data() {
      return {
        active: '',
        versions: [],
        version,
        verDropdownVisible: true,
        langDropdownVisible: true,
        langs: {
          'zh-CN': '中文',
          // 'en-US': 'English',
          // 'es': 'Español'
        }
      };
    },

    components: {
      ThemePicker,
      AlgoliaSearch
    },

    computed: {
      lang() {
        return this.$route.path.split('/')[1] || 'zh-CN';
      },
      displayedLang() {
        return this.langs[this.lang] || '中文';
      },
      langConfig() {
        return compoLang.filter(config => config.lang === this.lang)[0]['header'];
      },
      isComponentPage() {
        return /^(component|function)/.test(this.$route.name);
      }
    },

    methods: {
      switchVersion(version) {
        if (version === this.version) return;
        location.href = `${ location.origin }/${ this.versions[version] }/${ location.hash } `;
      },

      switchLang(targetLang) {
        if (this.lang === targetLang) return;
        localStorage.setItem('ELEMENT_LANGUAGE', targetLang);
        this.$router.push(this.$route.path.replace(this.lang, targetLang));
      },

      handleVerDropdownToggle(visible) {
        this.verDropdownVisible = visible;
      },

      handleLangDropdownToggle(visible) {
        this.langDropdownVisible = visible;
      }
    },

    // created() {
    //   const xhr = new XMLHttpRequest();
    //   xhr.onreadystatechange = _ => {
    //     if (xhr.readyState === 4 && xhr.status === 200) {
    //       const versions = JSON.parse(xhr.responseText);
    //       this.versions = Object.keys(versions).reduce((prev, next) => {
    //         prev[next] = versions[next];
    //         return prev;
    //       }, {});
    //     }
    //   };
    //   xhr.open('GET', '/versions.json');
    //   xhr.send();
    // }
  };
</script>
<style lang="less" scoped>
  .headerWrapper {
    height: 80px;
  }
  .header {
    position: relative;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 80px;
    overflow: hidden;
    line-height: 80px;
    color: #fff;
    background-color: #fff;
    .container {
      height: 100%;
      border-bottom: 1px solid #dcdfe6;
      box-sizing: border-box;
    }
    .nav-lang-spe {
      color: #888;
    }
    h1 {
      float: left;
      margin: 0;
      font-size: 32px;
      font-weight: normal;
      a {
        display: block;
        color: #333;
        text-decoration: none;
      }
      span {
        display: inline-block;
        width: 34px;
        height: 18px;
        margin-left: 10px;
        font-size: 12px;
        line-height: 18px;
        text-align: center;
        vertical-align: middle;
        border: 1px solid rgba(255, 255, 255, 0.5);
        border-radius: 3px;
      }
    }
    .nav {
      float: right;
      height: 100%;
      /*@utils-clearfix;*/
      padding: 0;
      margin: 0;
      line-height: 80px;
      background: transparent;
    }
    .nav-gap {
      position: relative;
      width: 1px;
      height: 80px;
      padding: 0 20px;
      &::before {
        position: absolute;
        top: calc(~'50% - 8px');
        width: 1px;
        height: 16px;
        background: #ebebeb;
        content: '';
      }
    }
    .nav-logo,
    .nav-logo-small {
      height: 80px;
      vertical-align: sub;
    }
    .nav-logo-small {
      display: none;
    }
    .nav-item {
      position: relative;
      float: left;
      margin: 0;
      list-style: none;
      cursor: pointer;
      &.nav-algolia-search {
        cursor: default;
      }
      &.lang-item,
      &:last-child {
        margin-left: 34px;
        cursor: default;
        span {
          opacity: 0.8;
        }
        .nav-lang {
          display: inline-block;
          height: 100%;
          color: #888;
          cursor: pointer;
          &:hover {
            color: #409eff;
          }
          &.active {
            font-weight: bold;
            color: #409eff;
          }
        }
      }
      a {
        display: block;
        padding: 0 22px;
        color: #888;
        text-decoration: none;
        &.active,
        &:hover {
          color: #333;
        }
        &.active::after {
          position: absolute;
          bottom: 0;
          left: calc(~'50% - 15px');
          display: inline-block;
          width: 30px;
          height: 2px;
          background: #409eff;
          content: '';
        }
      }
    }
  }
  .nav-dropdown {
    width: 100%;
    padding-left: 18px;
    margin-bottom: 6px;
    span {
      display: block;
      width: 100%;
      padding-bottom: 6px;
      font-size: 16px;
      line-height: 40px;
      color: #888;
      transition: 0.2s;
      user-select: none;
      &:hover {
        cursor: pointer;
      }
    }
    i {
      font-size: 12px;
      color: #979797;
      transform: translateY(-2px);
      transition: 0.2s;
    }
    &.is-active {
      span, i {
        color: #409eff;
      }
      i {
        transform: rotateZ(180deg) translateY(3px);
      }
    }
    &:hover {
      span, i {
        color: #409eff;
      }
    }
  }
  .nav-dropdown-list {
    width: auto;
  }

  @media (max-width: 850px) {
    .header {
      .nav-logo {
        display: none;
      }
      .nav-logo-small {
        display: inline-block;
      }
      .nav-item {
        margin-left: 6px;
        &.lang-item,
        &:last-child {
          margin-left: 10px;
        }
        a {
          padding: 0 5px;
        }
      }
      .nav-theme-switch, .nav-algolia-search {
        display: none;
      }
    }
  }

  @media (max-width: 700px) {
    .header {
      .container {
        padding: 0 12px;
      }
      .nav-item {
        a {
          font-size: 12px;
          vertical-align: top;
        }
        &.lang-item {
          height: 100%;
          .nav-lang {
            display: flex;
            align-items: center;
            span {
              padding-bottom: 0;
            }
          }
        }
      }
      .nav-dropdown {
        padding: 0;
        span {
          font-size: 12px;
        }
      }
      .nav-gap {
        padding: 0 8px;
      }
      .nav-versions {
        display: none;
      }
    }
  }
</style>
