<template>
  <div class="container">
    <a class="back"></a>
    <h1>{{title}}</h1>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    }
  }
}
</script>

<style lang="stylus" scoped>
  .container
    height 44px
    line-height 44px
    text-align center
    font-size 17px
    color #2B2D2F
    background #fff
    position relative
    .back
      position absolute
      top 0
      left 0
      width 44px
      height 44px
      padding 10px
      box-sizing border-box
      background #666
</style>
