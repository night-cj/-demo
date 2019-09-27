<template>
  <div>
    <div class="banner">
      <div class="banner-desc">
        <h1>组件库</h1>
        <p>djweb</p>
      </div>
    </div>
    <!--<div class="jumbotron">-->
      <!--<div>-->
        <!--<img class="jumbotron-plant-2" src="../../../src/assets/images/plant-2.png" alt="">-->
        <!--<img class="jumbotron-web" src="../../../src/assets/images/web.png" alt="">-->
        <!--<img class="jumbotron-plant-1" src="../../../src/assets/images/plant-1.png" alt="">-->
        <!--<img class="jumbotron-figure-1" src="../../../src/assets/images/figure-1.png" alt="">-->
        <!--<img class="jumbotron-figure-2" src="../../../src/assets/images/figure-2.png" alt="">-->
      <!--</div>-->
      <!--<div data-hover-layer="0">-->
        <!--<img class="jumbotron-cloud-1" src="../../../src/assets/images/cloud-1.png" alt="">-->
        <!--<img class="jumbotron-cloud-2" src="../../../src/assets/images/cloud-2.png" alt="">-->
      <!--</div>-->
      <!--<div data-hover-layer="1">-->
        <!--<img class="jumbotron-compo-1" src="../../../src/assets/images/compo-1.png" alt="">-->
        <!--<img class="jumbotron-compo-2" src="../../../src/assets/images/compo-2.png" alt="">-->
        <!--<img class="jumbotron-compo-3" src="../../../src/assets/images/compo-3.png" alt="">-->
      <!--</div>-->
    <!--</div>-->
    <!--<div class="sponsors">-->
      <!--<a class="sponsor" href="https://tipe.io/?ref=element" target="_blank" v-show="lang !== 'zh-CN'">-->
        <!--<img width="35px" src="../../../src/assets/images/tipe.svg" alt="tipe.io">-->
        <!--<div>-->
          <!--<p>Sponsored by Tipe.io</p>-->
          <!--<p>Next Generation API-first CMS</p>-->
        <!--</div>-->
      <!--</a>-->
      <!--<a class="sponsor" href="https://www.duotai.net/?utm_source=element" target="_blank">-->
        <!--<img width="42px" src="../../../src/assets/images/duotai.svg" alt="duotai">-->
        <!--<div>-->
          <!--<p>Sponsored by 多态</p>-->
          <!--<p>多元化的数据收集和整理工具</p>-->
        <!--</div>-->
      <!--</a>-->
      <!--<a class="sponsor" href="https://www.duohui.cn/?utm_source=element&utm_medium=web&utm_campaign=element-index" target="_blank">-->
        <!--<img width="45px" src="../../../src/assets/images/duohui.svg" alt="duohui">-->
        <!--<div>-->
          <!--<p>Sponsored by 多会</p>-->
          <!--<p>炫酷的新一代活动票务系统</p>-->
        <!--</div>-->
      <!--</a>-->
    <!--</div>-->
    <div class="cards">
      <ul class="container clearfix">
        <!--<li>-->
          <!--<div class="card">-->
            <!--<img src="../../assets/images/guide.png" alt="">-->
            <!--<h3>指南</h3>-->
            <!--<p>了解设计指南，帮助产品设计人员搭建逻辑清晰、结构合理且高效易用的产品。</p>-->
            <!--<router-link-->
              <!--active-class="active"-->
              <!--to="/zh-CN/guide/design"-->
              <!--exact>查看详情-->
            <!--</router-link>-->
          <!--</div>-->
        <!--</li>-->
        <li>
          <div class="card">
            <img src="../../assets/images/guide.png" alt="">
            <h3>日志</h3>
            <p>版本更新日志。</p>
            <router-link
              active-class="active"
              to="/zh-CN/changeLog"
              exact>查看详情
            </router-link>
          </div>
        </li>
        <li>
          <div class="card">
            <img src="../../assets/images/component.png" alt="">
            <h3>组件</h3>
            <p>使用组件 Demo 快速体验交互细节；使用前端框架封装的代码帮助工程师快速开发。</p>
            <router-link
              active-class="active"
              to="/zh-CN/component/installation"
              exact>查看详情
            </router-link>
          </div>
        </li>
        <li>
          <div class="card">
            <img src="../../assets/images/resource.png" alt="">
            <h3>方法</h3>
            <p>提供常用方法，基础样式，封装方法等等。</p>
            <router-link
              active-class="active"
              to="/zh-CN/function"
              exact>查看详情
            </router-link>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  // import { Hover } from 'perspective.js';

  export default {
    data() {
      return {
        lang: this.$route.meta.lang
      };
    },
    mounted() {
      // new Hover('.jumbotron', { // eslint-disable-line
      //   max: 3,
      //   scale: 1,
      //   perspective: 700,
      //   layers: [{
      //     multiple: 0.01,
      //     reverseTranslate: true
      //   }, {
      //     multiple: 0.02,
      //     reverseTranslate: true
      //   }]
      // });
    }
  };
</script>
<style lang="less" scoped>
  .banner {
    text-align: center;
  }
  .banner-desc {
    padding-top: 20px;
    h1 {
      margin: 0;
      font-size: 34px;
      line-height: 48px;
      color: #555;
    }
    p {
      margin: 10px 0 5px;
      font-size: 18px;
      line-height: 28px;
      color: #888;
    }
  }
  .sponsors {
    display: flex;
    justify-content: center;
  }
  .sponsor {
    display: inline-flex;
    width: 300px;
    height: 100px;
    margin: 0 20px 50px;
    justify-content: center;
    img {
      margin-right: 20px;
    }
    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    p {
      margin: 0;
      font-size: 14px;
      line-height: 1.8;
      color: #999;
    }
  }
  .jumbotron {
    position: relative;
    width: 890px;
    height: 465px;
    margin: 30px auto;
    div {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: transparent;
    }
    img {
      position: absolute;
    }
    .jumbotron-cloud-1 {
      top: 0;
      right: 0;
      height: 55px;
    }
    .jumbotron-plant-2 {
      top: 200px;
      left: 60px;
    }
    .jumbotron-web {
      top: 35px;
      left: 110px;
      height: 385px;
    }
    .jumbotron-cloud-2 {
      top: 50px;
      left: 0;
      height: 55px;
    }
    .jumbotron-compo-1 {
      top: 220px;
      left: 94px;
      height: 90px;
    }
    .jumbotron-compo-2 {
      top: 60px;
      right: 73px;
      height: 124px;
    }
    .jumbotron-compo-3 {
      top: 200px;
      right: 42px;
      height: 120px;
    }
    .jumbotron-plant-1 {
      bottom: 0;
      left: 30px;
      height: 185px;
    }
    .jumbotron-figure-1 {
      right: 180px;
      bottom: 0;
      height: 140px;
    }
    .jumbotron-figure-2 {
      right: 10px;
      bottom: 0;
      height: 68px;
    }
  }
  .cards {
    width: 1140px;
    margin: 0 auto 110px;
    .container {
      width: auto;
      /*@utils-clearfix;*/
      padding: 0;
      margin: 0 -11px;
    }
    li {
      float: left;
      width: 33.33333%;
      padding: 0 19px;
      list-style: none;
      box-sizing: border-box;
    }
    img {
      width: 160px;
      height: 120px;
    }
  }
  .card {
    position: relative;
    bottom: 0;
    width: 100%;
    height: 430px;
    text-align: center;
    background: #fff;
    border: 1px solid #eaeefb;
    border-radius: 5px;
    box-sizing: border-box;
    transition: all 0.3s ease-in-out;
    img {
      margin: 66px auto 60px;
    }
    h3 {
      margin: 0;
      font-size: 18px;
      font-weight: normal;
      color: #1f2f3d;
    }
    p {
      padding: 0 25px;
      font-size: 14px;
      line-height: 20px;
      color: #99a9bf;
    }
    a {
      position: absolute;
      bottom: 0;
      left: 0;
      display: block;
      width: 100%;
      height: 53px;
      padding: 0;
      font-size: 14px;
      line-height: 52px;
      color: #409eff;
      text-align: center;
      text-decoration: none;
      cursor: pointer;
      background-color: #fff;
      border: 0;
      border-top: 1px solid #eaeefb;
      border-radius: 0 0 5px 5px;
      transition: all 0.3s;
      &:hover {
        color: #fff;
        background: #409eff;
      }
    }
    &:hover {
      bottom: 6px;
      box-shadow: 0 6px 18px 0 rgba(232, 237, 250, 0.5);
    }
  }

  @media (max-width: 1140px) {
    .cards {
      width: 100%;
      .container {
        width: 100%;
        margin: 0;
      }
    }
    .banner .container {
      width: 100%;
      box-sizing: border-box;
    }
    .banner img {
      right: 0;
    }
  }

  @media (max-width: 1000px) {
    .banner .container {
      img {
        display: none;
      }
    }
    .jumbotron {
      display: none;
    }
  }

  @media (max-width: 768px) {
    .cards {
      li {
        float: none;
        width: 80%;
        margin: 0 auto 20px;
      }
      .card {
        height: auto;
        padding-bottom: 54px;
      }
    }
    .banner-stars {
      display: none;
    }
    .banner-desc {
      #line2 {
        display: none;
      }
      h2 {
        font-size: 32px;
      }
      p {
        width: auto;
      }
    }
  }
</style>
