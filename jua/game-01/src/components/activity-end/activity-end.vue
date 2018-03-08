<template>
  <div class="activity-end">
    <em class="icon-close" @click="onClose"></em>
    <div class="bg-wrapper">
      <div class="pic-wrapper">
        <img src="" class="pic">
        <a class="jump" type="button">立即参与 > </a>
      </div>
      <div class="pic-wrapper">
        <img src="" class="pic">
        <a class="jump" type="button">立即参与 > </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShow: false
    }
  },
  methods: {
    onClose () {
      this.$emit('actEnd')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .activity-end
    position absolute
    top 0
    left 0  
    width 100%
    height 100%
    padding-top .8rem
    background rgba(0,0,0, .8)
    .bg-wrapper
      width 3.16rem
      height 3.3rem
      margin 0 auto
      padding-top 1.5rem
      background url(../../images/prize-bg2.png) no-repeat
      background-size cover
      .pic-wrapper
        width 2.8rem
        height 1.15rem
        margin 0 0 0.5rem .2rem
        border-radius 8px
        position relative
        .pic
          width 100%
          height 100%
        .jump
          width 1.2rem
          padding .17rem 0
          text-align center
          font-size .16rem
          font-weight bold
          color #a40f1a
          background url(../../images/btn-01.png) no-repeat
          background-size cover
          position absolute
          left 50%
          bottom -0.3rem
          transform translateX(-50%)
    .icon-close
      display block
      width .28rem
      height .28rem
      background url(../../images/close.png) no-repeat
      background-size cover
      position absolute
      top .8rem
      left 50%
      transform translateX(-50%)
      z-index 10
</style>
