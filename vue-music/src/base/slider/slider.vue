<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item,index) in dots" :key="index" 
      :class="{active : currentPageIndex === index}"></span>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import {addClass} from '../../common/js/dom'

  export default{
    props: {
      loop: {
        type: Boolean,
        default: false
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 4000
      }
    },
    data () {
      return {
        dots: [],
        currentPageIndex: 0
      }
    },
    mounted () {
      setTimeout(() => {
        // 设置宽度
        this._setSliderWidth()
        // 初始dots
        this._initDots()
        // 初始化slider
        this._initSlider()

        if (this.autoPlay) {
          this._play()
        }
      }, 20)
    },
    methods: {
      _setSliderWidth () {
        // 获得slider子元素的宽度
        this.children = this.$refs.sliderGroup.children

        let width = 0
        let sliderWidth = this.$refs.slider.clientWidth
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          // 添加class
          addClass(child, 'slider-item')
          child.style.width = sliderWidth + 'px'
          width += sliderWidth
        }
        // 循环滚动会clone两个dom
        if (this.loop) {
          width += 2 * sliderWidth
        }
        console.log(width)
        this.$refs.sliderGroup.style.width = width + 'px'
      },
      // 初始dots
      _initDots () {
        this.dots = new Array(this.children.length)
      },
      // 初始化slider
      _initSlider () {
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: {
            loop: this.loop,
            threshold: 0.3,
            speed: 400
          },
          click: true
        })
        // 维护currentPageIndex
        this.slider.on('scrollEnd', () => {
          // 获取当前激活view
          let pageIndex = this.slider.getCurrentPage().pageX
          this.currentPageIndex = pageIndex
          // 手动拖动先清除之前的轮播
          if (this.autoPlay) {
            clearTimeout(this.timer)
            this._play()
          }
        })
      },
      // 自动播放
      _play () {
        let pageIndex = this.currentPageIndex + 1
        this.timer = setTimeout(() => {
          // 0：X轴；400间隔
          this.slider.goToPage(pageIndex, 0, 400)
        }, this.interval)
      }
    }
  }
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/variable';

.slider {
  min-height: 1px;

  .slider-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;

    .slider-item {
      float: left;
      box-sizing: border-box;
      overflow: hidden;
      text-align: center;

      a {
        display: block;
        width: 100%;
        overflow: hidden;
        text-decoration: none;
      }

      img {
        display: block;
        width: 100%;
      }
    }
  }

  .dots {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 12px;
    text-align: center;
    font-size: 0;

    .dot {
      display: inline-block;
      margin: 0 4px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: $color-text-l;

      &.active {
        width: 20px;
        border-radius: 5px;
        background: $color-text-ll;
      }
    }
  }
}
</style>
