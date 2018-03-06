<template>
  <div class="slider-box" v-if="banners.length">
    <div class="slider-wrapper">
      <slider>
        <div  v-for="(item,index) in banners" :key="index">
          <a :href="item.linkUrl">
            <img class="needsclick" :src="item.picUrl" >
          </a>
        </div>
      </slider>
    </div>
  </div>
</template>

<script>
import Slider from '@/base/slider/slider.vue'
import {data} from '@/data'

export default {
  components: {
    Slider
  },
  data () {
    return {
      banners: data.banners
    }
  },
  methods: {

  }
}
</script>

<style lang="stylus" scoped>
.slider-box
  width 100%
  background #0689d5
  .slider-wrapper
    position relative
    width 1190px
    height 400px
    margin 0 auto
    margin-bottom 26px
    overflow hidden
    // .slider-bg
    //   position absolute
    //   top 0
    //   left 0
    //   width 100%
    //   height 400px
    //   background #0689d5
    //   z-index -10
</style>
