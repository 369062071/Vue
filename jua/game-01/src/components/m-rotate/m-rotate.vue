<template>
  <div class="rotate">
    <p class="count">今日免费次数:<span v-text="count"></span>次</p>
    <div class="rotate-bg">
      <div class="prize-wrapper" ref="canvas-wrapper">
        <div class="prize" ref="prize"></div>
        <div class="m-btn">
          <button type="button" 
            :class="isRotate ? 'disable' : '' "
            class="btn-play" 
            @click="onPlay"
            ref="btnPlay"
            v-text="hint"
            ></button>
        </div>
      </div>
    </div>

    <div class="pop-modal" v-show="isPopShow">
      <em class="icon-close" @click="onClosePop"></em>
      <transition name="scale" >
        <div class="pop-wrapper" v-show="animat_1">
          <div class="pic-wrapper">
            <img src="" class="pic">
          </div>
          <h3 class="title">恭喜你获得了</h3>
          <p class="txt">iphonex免费赠送，</p>
          <p class="txt">点击领取查看详情</p> 
          <button class="btn-get" type="button" @click="onJump" v-show="isGet">立即领取</button>
          <button class="btn-get" type="button" v-show="!isGet">领取成功</button>
        </div>
      </transition>
    </div>

    <activity-end @actEnd="actEndHide" v-show="isActShow"></activity-end>
  </div>
</template>

<script>
import ActivityEnd from '@/components/activity-end/activity-end'
import {prefixStyle} from '@/common/js/dom'
import {data} from '@/data'
import {loadFq} from '@/common/js/cache.js'

const transform = prefixStyle('transform')
const transition = prefixStyle('transition')

export default {
  components: {
    ActivityEnd
  },
  data () {
    return {
      banners: data.banners,
      isPopShow: false,
      isRotate: false,
      rotateTime: 0,
      rotateAngle: 0,
      initAngle: 212,
      timer: null,
      animat_1: false,
      isGet: true,
      count: 8,
      isActShow: false,
      user: null,
      hint: '点击抽奖'
    }
  },
  created () {
    console.log(loadFq()[0])
  },
  mounted () {
    this.user = loadFq()[0] // 用户帆布信息
    this.init()
  },
  methods: {
    init () {
      this.setAngle(0, 0)
      if (this.timer) {
        clearInterval(this.timer)
      }
      this.timer = setInterval(() => {
        if (this.rotateAngle >= 350) {
          this.rotateAngle = 0
        }
        this.rotateAngle = this.rotateAngle + 0.1
        this.setAngle(this.rotateAngle)
      }, 40)
    },
    onPlay () {
      if (!this.isRotate) {
        if (this.count <= 0) {
          this.isActShow = true
          return
        }
        this.count--
        this.hint = this.count
        clearInterval(this.timer)
        this.timer = null
        this.getRandom() // 获取随机时间
        this.setAngle(this.rotateAngle, this.rotateTime)
        this.isRotate = true
        this.resetRotate(this.rotateTime)
      }
    },
    setAngle (angle, time) {
      this.$refs.prize.style[transition] = 'all ' + time + 's'
      this.$refs.prize.style[transform] = 'rotate(' + angle + 'deg)'
    },
    getRandom () {
      this.rotateTime = (Math.random() * 2 + 2).toFixed(1)
      this.rotateAngle = this.rotateAngle + (Math.floor(Math.random() * 4 + 2) * 360 + this.initAngle + 360 - this.rotateAngle)
      // this.fisrtAngle = 0
      console.log(this.rotateTime, Math.floor(Math.random() * 4 + 3) * 360)
    },
    resetRotate (time) {
      setTimeout(() => {
        console.log('定时器执行了')
        this.isRotate = false
        this.isPopShow = true
        this.animat_1 = true
      }, time * 1000 + 1000)
    },
    // 领取成功页面跳转
    onJump () {
      this.isGet = false
      setTimeout(() => {
        console.log('这里是跳转页面')
      }, 500)
    },
    onClosePop () {
      this.init() // 重置游戏
      this.animat_1 = false
      this.isPopShow = false
      setTimeout(() => {
      }, 500)
    },
    actEndHide () {
      this.isActShow = false
    }
  },
  watch: {
    // w (old, news) {
    //   console.log(old, news)
    //   console.log(this.$refs.canvas)
    //   this.$refs.canvas.width = this.w
    //   this.$refs.canvas.height = this.w
    // }
  }
}
</script>

<style lang="stylus" scoped>
  .rotate 
    position relative
    height 100%
    padding-top 2.85rem
    .count 
      margin-top 0.08rem
      text-align center
      color #fff
      font-size .2rem
    .rotate-bg
      width 3.2rem
      height 3.25rem
      margin  0.1rem auto 0
      background url(../../images/rotate-bg.gif)
      background-size cover
      position relative
      .prize-wrapper
        width 2.25rem
        height 2.25rem
        position absolute
        top 50%
        left 50%
        transform translate(-49%, -50%)
        .prize 
          width 100%
          height 100%
          background url(../../images/prize-dish.png) no-repeat
          background-size cover
        .m-btn 
          width .8rem
          height .8rem
          border-radius 50%
          border 1px solid #333
          background #fe8f22
          position absolute
          top 50%
          left 50%
          transform translate(-50%, -50%)
          .btn-play
            width 90%
            height 90%
            padding .1rem
            font-size .2rem
            color #fff
            background url(../../images/circle.png) no-repeat
            background-size cover
            position absolute
            top 50%
            left 50%
            transform translate(-50%, -50%)
            &.disable
              border-radius 50%
              color #ec1c24
              background url(../../images/disable.png) no-repeat
              background-size cover
    .pop-modal 
      width 100%
      height 100%
      padding-top 1.1rem
      background:rgba(0,0,0, .7)
      position: absolute
      top 0
      left 0
      .icon-close
        display block
        width .28rem
        height .28rem
        background url(../../images/close.png) no-repeat
        background-size cover
        position absolute
        top 1rem
        right .4rem
        z-index 10
      .pop-wrapper
        width 100%
        height 4.3rem
        margin 0 auto
        text-align center
        font-size .14rem
        color #fff
        background url(../../images/prize-bg.png) no-repeat
        background-size cover
        position relative
        &:before
          display table
          content ''
        .pic-wrapper
          width 2.2rem
          height 1.05rem
          margin 1.3rem auto 0.38rem
          background #000
          .pic
            width 100%
            height 100%
        .title
          margin-bottom .17rem
          font-size .16rem
          font-weight bold
        .txt
          line-height .2rem
          font-weight normal
        .btn-get
          margin-top .2rem
          font-size .18rem
          color #ffd800
          background transparent

  .scale-enter-active,.scale-leave-active
    transition : all .5s
  .scale-enter,.scale-leave-to
    transform scale(1)
</style>
