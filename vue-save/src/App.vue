<template>
  <div id="app">
    <m-search></m-search>
    <m-banner></m-banner>
    <navigator
      class="nav-box"
      :navList="navList"
      :currentTabIndex="currentTabIndex"
    >
      </navigator>
    <m-marquee class="m-marquee"></m-marquee>
    <recommend></recommend>
  </div>
</template>

<script>
import MMarquee from '@/components/m-marquee/m-marquee'
import MSearch from '@/components/m-search/m-search'
import Navigator from '@/components/navigator/navigator'
import Recommend from '@/components/recommend/recommend'
import {getCategorize} from '@/common/js/api'

export default {
  name: 'App',
  components: {
    MSearch,
    Navigator,
    Recommend,
    MMarquee
  },
  data () {
    return {
      navList: [],
      currentTabIndex: 1
    }
  },
  created () {
    this._getCateforizeList()
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
