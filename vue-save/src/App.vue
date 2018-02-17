<template>
  <div id="app">
    <m-search></m-search>
    <navigator
      class="nav-box"
      :navList="navList"
      :currentTabIndex="currentTabIndex"
    >
      </navigator>
    <recommend></recommend>
  </div>
</template>

<script>
import MSearch from '@/components/m-search/m-search'
import Navigator from '@/components/navigator/navigator'
import Recommend from '@/components/recommend/recommend'

export default {
  name: 'App',
  components: {
    MSearch,
    Navigator,
    Recommend
  },
  data () {
    return {
      navList: [],
      currentTabIndex: 1
    }
  },
  created () {
    this.getCateforizeList()
  },
  methods: {
    getCateforizeList () {
      this.axios.get('/shop/categorize').then(res => {
        this.navList = res.data.data
        console.log(this.navList)
      })
    }
  }
}
</script>

<style lang="stylus">
  #app
    max-width 980px
    margin 0 auto
</style>
