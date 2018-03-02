<template>
  <div class="banner" ref="box" id="banner-container">
      
  </div>
</template>

<script>
import {getCategorize} from '@/common/js/api'

export default {
  created () {
    // this._getCategorize()

    setTimeout(() => {
      console.log(this.$refs.box)
      this.loadScript()
    }, 20)
  },
  mounted () {
    // var swiper = new Swiper('.swiper-container')
  },
  methods: {
    loadScript () {
      var script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = 'banner.js'
      console.log(this.$refs.box)
      this.$refs.box.appendChild(script)
    },
    _getCategorize () {
      getCategorize().then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>

  .banner
    color #333
    .swiper-slide
      height 200px
</style>
