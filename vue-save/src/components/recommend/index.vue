<template>
  <div class="recommend">
    <scroll class="recommend-container">
      <ul class="data-list">
        <li class="data-item" v-for="(item, index) in dataList" :key="index">
          <img :src="item.picUrls" class="item-pic">
          <div class="item-info">
            <div class="info-title">
              <em class="i-new"></em>
              <em class="i-tb" v-show="item.shopType == 1"></em>
              <em class="i-tm" v-show="item.shopType == 0"></em>
              <p v-text="item.title"></p>
            </div>
            <p>以抢<span v-text="item.sellCount"></span>件</p>
            <div class="item-price">
              <p class="zk-price">优惠价￥<span v-text="item.zkPrice"></span></p>
              <p class="reserve-price">￥<span v-text="item.reservePrice"></span></p>
            </div>
          </div>
          <div class="item-coupon">
            <p>优惠价</p>
            <p>￥<span class="" v-text="item.coupon"></span></p>
            <button class="btn-pull">领券购买</button>
          </div>
        </li>
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
      .data-item
        display flex
        .item-pic
          width 1rem
          height 1rem
</style>
