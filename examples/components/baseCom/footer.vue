<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-main">
        <h4>{{ langConfig.links }}</h4>
        <a :href="$const.GIT_DJWEB_URL" class="footer-main-link" target="_blank">{{ langConfig.repo }}</a>
        <a :href="$const.GIT_DJWEB_TAGS_URL" class="footer-main-link" target="_blank">{{ langConfig.changelog }}</a>
        <!--<a href="" class="footer-main-link" target="_blank">{{ langConfig.faq }}</a>-->
      </div>
      <div class="footer-main">
        <h4>{{ langConfig.community }}</h4>
        <a :href="$const.GIT_DJWEB_ISSUES_URL" class="footer-main-link" target="_blank">{{ langConfig.feedback }}</a>
      </div>
    </div>
  </footer>
</template>

<style lang="less">
  .footer {
    width: 100%;
    height: 340px;
    padding: 40px 150px;
    margin-top: -340px;
    background-color: #f7fbfd;
    box-sizing: border-box;
    .container {
      width: auto;
      box-sizing: border-box;
    }
    .footer-main {
      display: inline-block;
      margin-right: 110px;
      font-size: 0;
      vertical-align: top;
      h4 {
        margin: 0 0 15px;
        font-size: 18px;
        line-height: 1;
        color: #333;
      }
      .footer-main-link {
        display: block;
        margin: 0;
        font-size: 14px;
        line-height: 2;
        color: #666;
        &:hover {
          color: #333;
        }
      }
    }
  }
  .el-popover.footer-popover {
    min-width: 120px;
    padding: 0;
    line-height: normal;
    box-shadow: 0 0 11px 0 rgba(174, 187, 211, 0.24);
    .footer-popover-title {
      height: 30px;
      line-height: 30px;
      color: #99a9bf;
      text-align: center;
      background-color: #f8f9fe;
      border-bottom: solid 1px #eaeefb;
    }
    img {
      margin: 10px;
      size: 100px;
    }
  }

  @media (max-width: 1140px) {
    .footer {
      height: auto;
    }
  }

  @media (max-width: 1000px) {
    .footer-social {
      display: none;
    }
  }

  @media (max-width: 768px) {
    .footer {
      .footer-main {
        margin-bottom: 30px;
      }
    }
  }
</style>

<script type="text/babel">
  import compoLang from '../../i18n/component.json';
  import pkg from '../../../package.json';
  const version = pkg.version;
  export default {
    data() {
      return {
        version
      };
    },

    computed: {
      lang() {
        return this.$route.path.split('/')[1] || 'zh-CN';
      },

      langConfig() {
        return compoLang.filter(config => config.lang === this.lang)[0]['footer'];
      },

      gitterLink() {
        return this.lang === 'zh-CN' ? 'https://gitter.im/ElemeFE/element' : 'https://gitter.im/element-en/Lobby';
      }
    }
  };
</script>
