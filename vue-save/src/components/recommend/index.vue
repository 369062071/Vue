<template>
  <div class="recommend">
    <scroll class="recommend-container">
      <ul class="">

      </ul>
    </scroll>
  </div>
</template>

<script>
import Scroll from '@/base/scroll/'

export default {
  components: {
    Scroll
  },
  created () {
    this.getShopInfo()
  },
  data () {
    return {
      dataList: ''
    }
  },
  methods: {
    getShopInfo () {
      this.axios.get('/shop/info').then(res => {
        this.dataList = res.data.data
        console.log(this.dataList)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .recommend
    position: fixed;
    width: 100%;
    top: .93rem;
    bottom: 0;
    .recommend-container
      height 100%
      overflow hidden
</style>
