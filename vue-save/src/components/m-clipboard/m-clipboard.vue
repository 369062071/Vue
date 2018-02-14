<template>
  <div class="main" v-show="isShowCode">
    <transition name="move">
      <div class="command" v-show="isShowCode">
        <div class="command-bg">
          <p class="code" v-text="code"></p>
          <div class="btn-copy"
            :class="isCopy ? 'btn-success' : ''"
            v-clipboard:copy="code"
            v-clipboard:success="onCopy"
            >
          </div>
          <p class="u-open">打开手机淘宝购买</p>
          <p class="u-open">没有安装手淘？<span class="u-jump">点击浏览器购买</span></p>
        </div>
        <div class="close" @click="onClose"></div>
      </div>
    </transition>
  </div>
</template>

<script>
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)

export default {
  props: {
    code: {
      type: String,
      default: '￥AADg0n6umi9￥'
    },
    isShowCode: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isCopy: false
    }
  },
  methods: {
    onCopy (e) {
      this.isCopy = true
      console.log(e.text)
    },
    onClose () {
      this.isCopy = false
      this.$emit('isHideCopy')
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/variable"
  .main
    width 100%
    position absolute
    top -0.41rem
    bottom 0
    background rgba(0,0,0,.7)
    z-index 99
    .command
      &.move-enter-active,&.move-leave-active
        transition all .8s
      &.move-enter,&.move-leave-to
        transform translateY(-100%)
      .close
        width .26rem
        height .25rem
        margin  .3rem auto 0
        background url(../../images/close.png) no-repeat center
        background-size cover
      .command-bg
        margin-top 1rem
        height 2.8rem
        background url(../../images/command-bg.png) no-repeat center
        background-size cover
        .code
          padding-top .95rem
          text-align center
          font-weight bold
          font-size .16rem
          color #ff430a
        .btn-copy
          width 1.35rem
          height .31rem
          margin .35rem auto .2rem
          background url(../../images/copy.png) no-repeat center
          background-size cover
        .btn-success
          background url(../../images/copy-success.png) no-repeat center
          background-size cover
        .u-open
          line-height .2rem
          text-align center
          font-size $font-size-medium
          .u-jump
            color #fff001
</style>
