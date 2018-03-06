<template>
  <div class="slider-wrapper" v-if="banners.length">
    <slider>
      <div  v-for="(item,index) in banners" :key="index">
        <a :href="item.linkUrl">
          <img class="needsclick" :src="item.picUrl" >
        </a>
      </div>
    </slider>
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
  .slider-wrapper
    position relative
    height 400px
    width 100%
    margin-bottom 26px
    overflow hidden
</style>
