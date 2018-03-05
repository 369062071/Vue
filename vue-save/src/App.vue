<template>
  <div id="app">
    <m-search></m-search>
    <navigator
      class="nav-box"
      :navList="navList"
      :currentTabIndex="currentTabIndex"
    >
      </navigator>
    <m-marquee class="m-marquee"></m-marquee>
    <move-link></move-link>
    <product></product>
  </div>
</template>

<script>
import MMarquee from '@/components/m-marquee/m-marquee'
import MSearch from '@/components/m-search/m-search'
import Navigator from '@/components/navigator/navigator'
import Product from '@/components/product/product'
import MoveLink from '@/components/move-link/move-link'
import {getCategorize} from '@/common/js/api.js'
import {data} from './data'

export default {
  name: 'App',
  components: {
    MSearch,
    Navigator,
    Product,
    MMarquee,
    MoveLink
  },
  data () {
    return {
      navList: data.navList,
      currentTabIndex: 1
    }
  },
  created () {
    // this._getCateforizeList()
  },
  methods: {
    _getCateforizeList () {
      getCategorize().then(res => {
        this.navList = res.data
      })
    }
  }
}
</script>

<style lang="stylus">
  #app
    max-width 980px
    margin 0 auto
    position relative
    .m-marquee
      position absolute
      bottom -0.8rem
      left .1rem
      z-index 99
</style>
