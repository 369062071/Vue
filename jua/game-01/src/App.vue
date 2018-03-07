<template>
  <div id="app">
    <m-roate></m-roate>
  </div>
</template>

<script>
import MRoate from "@/components/m-rotate/m-rotate"

export default {
  name: 'App',
  components: {
    MRoate
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
    position fixed
    width 100%
    height 100%
    padding-top 2.85rem
    box-sizing border-box
    background url(./images/game-bg.jpg) no-repeat
    background-size cover
</style>
