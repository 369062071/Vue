<template>
  <div id="app">
    <router-link tag="span" class="u-link" to="/prizeList"> 
      <em class="prize-icon"></em>
      奖品
    </router-link>
    <m-roate></m-roate>
    
  </div>
</template>

<script>
import MRoate from '@/components/m-rotate/m-rotate'
import PrizeList from '@/components/prize-list/prize-list'

export default {
  name: 'App',
  components: {
    MRoate,
    PrizeList
  },
  data () {
    return {
      // navList: data.navList,
      // currentTabIndex: 1
    }
  },
  created () {
    // this._getCateforizeList()
  },
  methods: {
  }
}
</script>

<style lang="stylus">
  @import './common/stylus/'
  #app
    width 100%
    height 100%
    box-sizing border-box
    background url(./images/game-bg.jpg) no-repeat
    background-size cover
    overflow hidden
    .u-link
      padding .03rem .1rem
      border-radius .1rem
      font-size .14rem
      color #fff
      background rgba(0,0,0,.4)
      position absolute
      top .08rem
      right .15rem
      z-index 10
      .prize-icon
        display inline-block
        vertical-align: text-bottom;
        width .17rem
        height .17rem
        background url(./images/icon-more.png) no-repeat
        background-size .17rem .17rem
</style>
