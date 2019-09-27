<template>
  <div id="app" :class="{ 'is-component': isComponent }">
    <main-header v-if="lang !== 'play'"></main-header>
    <div class="app-content">
      <div class="main-cnt">
        <router-view></router-view>
      </div>
      <main-footer v-if="lang !== 'play' && !isComponent"></main-footer>
    </div>
  </div>
</template>

<script>
  // import { use } from 'main/locale';
  // import zhLocale from 'main/locale/lang/zh-CN';
  // import enLocale from 'main/locale/lang/en';
  // import esLocale from 'main/locale/lang/es';
  //
  // const lang = location.hash.replace('#', '').split('/')[1] || 'zh-CN';
  // const localize = lang => {
  //   switch (lang) {
  //     case 'zh-CN':
  //       use(zhLocale);
  //       break;
  //     case 'es':
  //       use(esLocale);
  //       break;
  //     default:
  //       use(enLocale);
  //   }
  // };
  // localize(lang);
  export default {
    name: 'app',

    computed: {
      lang() {
        return this.$route.path.split('/')[1] || 'zh-CN';
      },
      isComponent() {
        return /^(component|function)-/.test(this.$route.name || '');
      }
    },

    // watch: {
    //   lang(val) {
    //     if (val === 'zh-CN') {
    //       this.suggestJump();
    //     }
    //     // localize(val);
    //   }
    // },

    // methods: {
    //   suggestJump() {
    //     if (process.env.NODE_ENV !== 'production') return;

    //     const href = location.href;
    //     const preferGithub = localStorage.getItem('PREFER_GITHUB');
    //     if (href.indexOf('element-cn') > -1 || href.indexOf('element.faas') > -1 || preferGithub) return;
    //     setTimeout(() => {
    //       if (this.lang !== 'zh-CN') return;
    //       this.$confirm('建议大陆用户访问部署在国内的站点，是否跳转？', '提示')
    //         .then(() => {
    //           location.href = location.href
    //             .replace('https:', 'http:')
    //             .replace('element.', 'element-cn.');
    //         })
    //         .catch(() => {
    //           localStorage.setItem('PREFER_GITHUB', 'true');
    //         });
    //     }, 1000);
    //   }
    // },

    // mounted() {
    //   // localize(this.lang);
    //   // if (this.lang === 'zh-CN') {
    //   //   this.suggestJump();
    //   // }
    //   // setTimeout(() => {
    //   //   const notified = localStorage.getItem('ES_NOTIFIED_2');
    //   //   if (!notified && this.lang !== 'es') {
    //   //     const title = this.lang === 'zh-CN'
    //   //       ? '西班牙语文档正式上线'
    //   //       : 'Spanish docs now available';
    //   //     const message = this.lang === 'zh-CN'
    //   //       ? '点击这里进行切换'
    //   //       : 'Click here to switch';
    //   //     const self = this;
    //   //     this.$notify({
    //   //       title,
    //   //       duration: 0,
    //   //       message,
    //   //       onClick() {
    //   //         self.$router.push('/es');
    //   //         localStorage.setItem('ES_NOTIFIED_2', 1);
    //   //       },
    //   //       onClose() {
    //   //         localStorage.setItem('ES_NOTIFIED_2', 1);
    //   //       }
    //   //     });
    //   //   }
    //   // }, 3500);
    // }
  };
</script>

<style lang="less">
  @import 'highlight.js/styles/color-brewer.css';
  @import 'assets/styles/fonts/style.css';
  html, body {
    height: 100%;
    padding: 0;
    margin: 0;
    font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', SimSun, sans-serif;
    -webkit-font-smoothing: antialiased;
    font-weight: 400;
    &.is-component {
      overflow: hidden;
    }
  }
  #app {
    height: 100%;
    .app-content {
      height: calc(~'100% - 80px');
    }
    &.is-component {
      overflow-y: hidden;
      .main-cnt {
        height: 100%;
        min-height: auto;
        padding: 0;
        margin-top: 0;
      }
      .headerWrapper {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1500;
        width: 100%;
        .container {
          padding: 0;
        }
      }
    }
  }
  a {
    color: #409eff;
    text-decoration: none;
  }
  code {
    padding: 0 4px;
    background-color: #f9fafc;
    border: 1px solid #eaeefb;
    border-radius: 4px;
  }
  button, input, select, textarea {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    color: inherit;
  }
  .hljs {
    padding: 18px 24px;
    margin-bottom: 25px;
    font-family: Menlo, Monaco, Consolas, Courier, monospace;
    font-size: 12px;
    -webkit-font-smoothing: auto;
    line-height: 1.8;
    background-color: #fafafa;
    border: solid 1px #eaeefb;
    border-radius: 4px;
  }
  .main-cnt {
    min-height: 100%;
    padding: 80px 0 340px;
    margin-top: -80px;
    background-color: white;
    box-sizing: border-box;
  }
  .container,
  .page-container {
    width: 1140px;
    padding: 0;
    margin: 0 auto;
  }
  .page-container {
    padding-top: 55px;
    h2 {
      margin: 0;
      font-size: 28px;
      color: #1f2d3d;
    }
    h3 {
      font-size: 22px;
    }
    h2, h3, h4, h5 {
      font-weight: normal;
      color: #1f2f3d;
      &:hover a {
        opacity: 0.4;
      }
      a {
        float: left;
        margin-left: -20px;
        cursor: pointer;
        opacity: 0;
        &:hover {
          opacity: 0.4;
        }
      }
    }
    p {
      font-size: 14px;
      line-height: 1.5em;
      color: #5e6d82;
    }
    .tip {
      padding: 8px 16px;
      margin: 20px 0;
      background-color: #ecf8ff;
      border-left: #50bfff 5px solid;
      border-radius: 4px;
      code {
        color: #445368;
        background-color: rgba(255, 255, 255, 0.7);
      }
    }
    .warning {
      padding: 8px 16px;
      margin: 20px 0;
      background-color: #fff6f7;
      border-left: #fe6c6f 5px solid;
      border-radius: 4px;
      code {
        color: #445368;
        background-color: rgba(255, 255, 255, 0.7);
      }
    }
  }
  .demo {
    margin: 20px 0;
  }

  @media (max-width: 1140px) {
    .container,
    .page-container {
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    .container,
    .page-container {
      padding: 0 20px;
    }
    #app.is-component .headerWrapper .container {
      padding: 0 12px;
    }
  }
</style>
