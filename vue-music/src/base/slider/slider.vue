<template>
  <div class="slide" ref="slide">
    <div class="slide-group" ref="slideGroup">
      <slot>
      </slot>
    </div>
    <div v-if="showDot" class="dots">
      <span class="dot"  v-for="(item, index) in dots" :class="{active: currentPageIndex === index }"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { addClass } from '../../common/js/dom'
  import BScroll from 'better-scroll'

  const COMPONENT_NAME = 'slide'

  export default {
    name: COMPONENT_NAME,
    props: {
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 4000
      },
      showDot: {
        type: Boolean,
        default: true
      },
      click: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        dots: [],
        currentPageIndex: 0
      }
    },
    mounted () {
      this.update()
      // 这里是调用resize
      window.addEventListener('resize', () => {
        console.log(11)
        if (!this.slide || !this.slide.enabled) {
          return
        }
        clearTimeout(this.resizeTimer)
        this.resizeTimer = setTimeout(() => {
          if (this.slide.isInTransition) {
            this._onScrollEnd()
          } else {
            if (this.autoPlay) {
              this._play()
            }
          }
          this.refresh()
        }, 60)
      })
    },
    // 这里是激活的时候，就是来回vue-router切换
    activated () {
      if (!this.slide) {
        return
      }
      this.slide.enable()
      let pageIndex = this.slide.getCurrentPage().pageX
      this.slide.goToPage(pageIndex, 0, 0)
      this.currentPageIndex = pageIndex
      if (this.autoPlay) {
        this._play()
      }
    },
    // 路由切换清除计时器
    deactivated () {
      this.slide.disable()
      clearTimeout(this.timer)
    },
    beforeDestroy () {
      this.slide.disable()
      clearTimeout(this.timer)
    },
    methods: {
      update () {
        if (this.slide) {
          this.slide.destroy()
        }
        this.$nextTick(() => {
          this.init()
        })
      },
      refresh () {
        this._setSlideWidth(true)
        this.slide.refresh()
      },
      next () {
        this.slide.next()
      },
      init () {
        clearTimeout(this.timer)
        this.currentPageIndex = 0
        this._setSlideWidth()
        if (this.showDot) {
          this._initDots()
        }
        this._initSlide()

        if (this.autoPlay) {
          this._play()
        }
      },
      _setSlideWidth (isResize) {
        // 容器下面轮播的图片盒子
        this.children = this.$refs.slideGroup.children

        let width = 0
        // 获取宽度=屏幕宽度
        let slideWidth = this.$refs.slide.clientWidth
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          addClass(child, 'slide-item')

          child.style.width = slideWidth + 'px'
          width += slideWidth
        }
        // loop需要多两个dom结构
        if (this.loop && !isResize) {
          width += 2 * slideWidth
        }
        // 总的宽度
        this.$refs.slideGroup.style.width = width + 'px'
      },
      _initSlide () {
        // 初始化
        this.slide = new BScroll(this.$refs.slide, {
          scrollX: true,
          momentum: false,
          snap: {
            loop: this.loop,
            threshold: 0.3,
            speed: 400
          },
          click: this.click
        })

        this.slide.on('scrollEnd', this._onScrollEnd)

        this.slide.on('touchend', () => {
          if (this.autoPlay) {
            this._play()
          }
        })

        this.slide.on('beforeScrollStart', () => {
          if (this.autoPlay) {
            clearTimeout(this.timer)
          }
        })
      },
      _onScrollEnd () {
        let pageIndex = this.slide.getCurrentPage().pageX
        this.currentPageIndex = pageIndex
        if (this.autoPlay) {
          this._play()
        }
      },
      // 小圆点
      _initDots () {
        this.dots = new Array(this.children.length)
      },
      _play () {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.slide.next()
        }, this.interval)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"

  .slide
    min-height: 1px
    .slide-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slide-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      transform: translateZ(1px)
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-d
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>