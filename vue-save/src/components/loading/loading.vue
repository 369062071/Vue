<template>
  <div class="mf-loading-container">
    <img src="../../images/loading.gif">
    <p class="desc">{{title}}</p>
  </div>
</template>
<script type="text/ecmascript-6">
const COMPONENT_NAME = 'loading'

export default {
  name: COMPONENT_NAME,
  props: {
    title: {
      type: String,
      default: '正在载入...'
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .mf-loading-container
    display flex
    justify-content center
    align-items center
    padding .1rem 0
    img
      width: .24rem
      height: .24rem
      margin-right .02rem
    .desc
      line-height .2rem
      font-size .14rem
      color #666
</style>
