<template>
  <div id="app">
    <m-search></m-search>
    <navigator></navigator>
    <!-- <m-marquee class="m-marquee"></m-marquee>
    <move-link></move-link>
    <product></product> -->
  </div>
</template>

<script>
import MMarquee from '@/components/m-marquee/m-marquee'
import MSearch from '@/components/m-search/m-search'
import Navigator from '@/components/navigator/navigator'
import Product from '@/components/product/product'
import MoveLink from '@/components/move-link/move-link'
import {getCategorize} from '@/common/js/api.js'

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
      // navList: data.navList,
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
  @import './common/stylus/'
  #app
    max-width 1190px
    margin 0 auto
    padding 30px 0
    position relative
</style>
