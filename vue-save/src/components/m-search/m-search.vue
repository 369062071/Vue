<template>
  <div class="m-search">
    <div class="input-container">
      <em class="search-icon"></em>
      <input class="search-input" placeholder="搜索你想要的商品" v-model="search" type="text">
      <button class="search-btn" type="button">搜索</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      search: ''
    }
  }
}
</script>

<style lang="stylus">
  @import "../../common/stylus/variable"

  .m-search
    height .52rem
    padding .09rem .1rem
    box-sizing border-box
    background $color-theme
    .input-container
      display flex
      justify-content center
      align-items center
      position relative
      height 100%
      border-radius .5rem
      background $color-background
      .search-icon
        display block
        width .2rem
        height .2rem
        margin-left .1rem
        background url(../../images/search-icon.png) no-repeat
        background-size .2rem .2rem
      .search-input
        flex-grow 1
        margin 0 .05rem
        outline none
        font-size $font-size-medium
      .search-btn
        height .34rem
        padding 0 .15rem
        outline none
        border none
        border-left 1px solid $color-border
        font-size $font-size-medium-x
        color $color-theme
        background transparent
</style>
