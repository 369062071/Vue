<template>
  <div class="m-search">
    <div class="search-container">
      <search-box></search-box>
    </div>
    <show-data class="search-save"></show-data>
  </div>
</template>

<script>
import ShowData from '@/components/showData/showData'
import SearchBox from '@/base/SearchBox/SearchBox'

export default {
  components: {
    ShowData,
    SearchBox
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="stylus">
  @import "../../common/stylus/variable"

.m-search
  position relative
  .search-save
    position absolute
    width 100%
  .search-container
    height .52rem
    padding .09rem .1rem
    box-sizing border-box
    background $color-theme
    .search-save
      position relative
      color #000
      z-index 11
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
