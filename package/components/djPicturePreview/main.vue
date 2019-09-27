<template>
    <div ref="previewer" class="dj-picture-preview" @mousewheel.prevent="wheelScaling">
      <el-carousel v-if="imgs.length" trigger="click" height="100%" :autoplay="false" @change="changeActiveIndex">
        <el-carousel-item v-for="(img, index) in imgs" :key="index">
          <div class="pic-wrapper" :style="styles[index]">
            <img @mousedown.prevent="dragStart" :src="img">
          </div>
        </el-carousel-item>
      </el-carousel>
      <!--<div class="pic-wrapper" :styles="styles">-->
        <!--<img @mousedown.prevent="dragStart"-->
             <!--src="http://192.168.23.178/img0/M00/03/8C/wKgXJly9dgyESHmaAAAAACR6NOQ192.png">-->
      <!--</div>-->
      <div class="dj-picture-preview_operate">
        <i @click="changeSize(enlargeRate)" title="放大" class="icon iconfont icon-zoom-in-line"></i>
        <i @click="changeSize(-narrowRate)" title="缩小" class="icon iconfont icon-zoom-out-line"></i>
        <i @click="reset" title="1:1比例" class="icon iconfont icon-icon-test"></i>
        <i @click="rotate(90)" title="顺时针旋转" class="icon iconfont icon-redo"></i>
        <i @click="rotate(-90)" title="逆时针旋转" class="icon iconfont icon-undo"></i>
        <i @click="initStyles" title="全部重置" class="icon iconfont icon-reset"></i>
      </div>
    </div>
</template>
<script>
  import listenerPolicy from '../../methods/mixins/listenerPolicy';
  const DEFAULT_ENLARGE_RATE = 0.2;
  const DEFAULT_NARROW_RATE = 0.2;
  const DEFAULT_WHEEL_RATE = 0.1;
  const DEFAULT_STYLE = {
    // width: '100%',
    // height: '100%',
    marginLeft: "0",
    marginTop: "0",
    transform: "translate(-50%, -50%) rotate(0deg) scale(1,1)"
  };
  export default {
    name: 'dj-picture-preview',
    mixins: [listenerPolicy],
    props: {
      //最大缩放比
      maxRate: {
        type: Number,
        default: 5
      },
      //最小缩放比
      minRate: {
        type: Number,
        default: 0.2
      },
      //放大比例设置
      enlargeRate: {
        type: Number,
        default: DEFAULT_ENLARGE_RATE
      },
      //缩小比例设置
      narrowRate: {
        type: Number,
        default: DEFAULT_NARROW_RATE
      },
      //滚轮缩放比例设置
      wheelRate: {
        type: Number,
        default: DEFAULT_WHEEL_RATE
      },
      imgs: {
        type: Array,
        default: ()=>([])
      }
    },
    data() {
      return {
        isDragging: false,
        isPause: false,
        startParams: {},
        activeIndex: 0,
        styles: []
      };
    },
    computed: {
      currentStyle() {
        return this.styles[this.activeIndex];
      }
    },
    created() {
      this.initStyles();
    },
    methods: {
      initStyles() {
        let styles = [];
        this.imgs.forEach(()=>{
          styles.push(Object.assign({}, DEFAULT_STYLE))
        });
        this.styles = styles;
      },
      changeActiveIndex(index) {
        this.activeIndex = index;
      },
      rotate(degree) {
        if (this.currentStyle) {
          let currentDegree = parseFloat(/rotate\((-?\d+(?:\.\d+)?)deg\)/.exec(this.currentStyle.transform)[1]);
          this.$set(this.styles, this.activeIndex, Object.assign({}, this.currentStyle, {
            transform: this.currentStyle.transform.replace(/rotate\((-?\d+(?:\.\d+)?)deg\)/, `rotate(${currentDegree + degree}deg)`)
          }));
        }
      },
      reset() {
        if (this.currentStyle) {
          this.$set(this.styles, this.activeIndex, Object.assign({}, DEFAULT_STYLE));
        }
      },
      wheelScaling(e) {
        this.changeSize(e.wheelDeltaY > 0 ? this.wheelRate : -this.wheelRate);
        // if (e.wheelDeltaY > 0) {
        //   this.enlarge(this.wheelRate);
        // } else if (e.wheelDeltaY < 0) {
        //   this.narrow(this.wheelRate);
        // }
      },
      changeSize(rate) {
        if (this.currentStyle) {
          let currentRate = parseFloat(/scale\((\d+(?:\.\d+)?),(\d+(?:\.\d+)?)\)/.exec(this.currentStyle.transform)[1]);
          let _rate = currentRate + rate;
          let realRate;
          if (rate > 0) {
            realRate = this.maxRate && _rate > this.maxRate ? this.maxRate : _rate;
          }
          if (rate < 0) {
            realRate = _rate < this.minRate ? this.minRate : _rate;
          }
          this.$set(this.styles, this.activeIndex, Object.assign({}, this.currentStyle, {
            transform: this.currentStyle.transform.replace(/scale\((\d+(?:\.\d+)?),(\d+(?:\.\d+)?)\)/, `scale(${realRate},${realRate})`)
          }));
        }
      },
      // enlarge(rate) {
      //   let currentRate = parseFloat(/scale\((\d+(?:\.\d+)?),(\d+(?:\.\d+)?)\)/.exec(this.currentStyle.transform)[1]);
      //   let realRate = (this.maxRate && currentRate + rate > this.maxRate ? this.maxRate : currentRate + rate);
      //   this.$set(this.styles, this.activeIndex, Object.assign({}, this.currentStyle, {
      //     transform: this.currentStyle.transform.replace(/scale\((\d+(?:\.\d+)?),(\d+(?:\.\d+)?)\)/, `scale(${realRate},${realRate})`)
      //   }));
      //   // const { width } = this.currentStyle;
      //   // let _rate = parseFloat(width) + rate;
      //   // let realRate = (this.maxRate && _rate > this.maxRate ? this.maxRate : _rate) + '%';
      //   // // Object.assign(this.styles[this.activeIndex], {
      //   // //   width: realRate,
      //   // //   height: realRate
      //   // // });
      //   // this.$set(this.styles, this.activeIndex, Object.assign({}, this.currentStyle, {
      //   //   width: realRate,
      //   //   height: realRate
      //   // }));
      //   // // this.styles.splice(this.activeIndex,1,this.styles[this.activeIndex]);
      //   // // console.log(this.styles)
      // },
      // narrow(rate) {
      //   let currentRate = parseFloat(/scale\((\d+(?:\.\d+)?),(\d+(?:\.\d+)?)\)/.exec(this.currentStyle.transform)[1]);
      //   let realRate = currentRate + rate < this.minRate ? this.minRate : currentRate;
      //   this.$set(this.styles, this.activeIndex, Object.assign({}, this.currentStyle, {
      //     transform: this.currentStyle.transform.replace(/scale\((\d+(?:\.\d+)?),(\d+(?:\.\d+)?)\)/, `scale(${realRate},${realRate})`)
      //   }));
      //   // const { width } = this.currentStyle;
      //   // let _rate = parseFloat(width) - rate;
      //   // let realRate = (_rate < this.minRate ? this.minRate : _rate) + '%';
      //   // // Object.assign(this.styles[this.activeIndex], {
      //   // //   width: realRate,
      //   // //   height: realRate
      //   // // })
      //   // this.$set(this.styles, this.activeIndex, Object.assign({}, this.currentStyle, {
      //   //   width: realRate,
      //   //   height: realRate
      //   // }));
      // },
      pause() {
        this.isPause = true;
      },
      continue() {
        this.isPause = false;
      },
      drag(e) {
        if (!this.isPause && this.isDragging) {
          const { clientX, clientY } = e;
          const { x, y, top, left } = this.startParams;
          let _styles = {
            marginLeft: left + clientX - x + 'px',
            marginTop: top + clientY - y + 'px'
          };
          // Object.assign(this.styles[this.activeIndex], _styles);
          this.$set(this.styles, this.activeIndex, Object.assign({}, this.currentStyle, _styles));
        }
      },
      dragStart(e) {
        // console.log('dragStart');
        this.isDragging = true;
        this.startParams = {
          x: e.clientX,
          y: e.clientY,
          left: parseFloat(this.currentStyle.marginLeft),
          top: parseFloat(this.currentStyle.marginTop),
        };
        let previewer = this.$refs.previewer;
        this.addListener(document.body, 'mousemove', this.drag);
        this.addListener(document.body, 'mouseup', this.dragEnd);
        this.addListener(previewer, 'mouseleave', this.pause);
        this.addListener(previewer, 'mouseenter', this.continue);
      },
      dragEnd() {
        // console.log('dragEnd');
        this.isDragging = false;
        this.isPause = false;
        this.startParams = {};
        let previewer = this.$refs.previewer;
        this.removeListener(document.body, 'mousemove', this.drag);
        this.removeListener(document.body, 'mouseup', this.dragEnd);
        this.removeListener(previewer, 'mouseleave', this.pause);
        this.removeListener(previewer, 'mouseenter', this.continue);
      }
    }
  };
</script>
<style lang="less" scoped>
  @import "images/iconfont/iconfont.css";
  @deep: ~'>>>';
  .dj-picture-preview {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #99a9bf;
    user-select: none;
    .pic-wrapper {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      height: 100%;
      transition: 70ms ease-out;
      img {
        position: absolute;
        top: 50%;
        left: 50%;
        /*height: 100%;*/
        max-width: 100%;
        max-height: 100%;
        cursor: pointer;
        transform: translate(-50%, -50%);
      }
    }
    .dj-picture-preview_operate {
      position: absolute;
      bottom: 0;
      z-index: 3;
      width: 100%;
      padding: 5px 0;
      color: white;
      text-align: center;
      background: hsla(0, 0%, 60%, 0.6);
      transform: translateY(100%);
      transition: transform 0.3s linear;
      i {
        margin: 0 5px;
        font-size: 18px;
        cursor: pointer;
        &:hover {
          color: #3a8ee6;
        }
      }
    }
    &:hover .dj-picture-preview_operate {
      transform: translateY(0);
    }
  }
  .el-carousel {
    height: 100%;
    @{deep} .el-carousel__indicators {
      bottom: 26px;
    }
  }
</style>
