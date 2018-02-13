<template>
  <div class="recommend">
    <scroll class="recommend-container">
      <ul class="data-list">
        <li class="data-item" v-for="(item, index) in dataList" :key="index" @click="onShowCode">
          <img :src="item.picUrls" class="item-pic">
          <div class="item-info">
            <div class="info-title">
              <em class="i-new"></em>
              <em class="i-tb" v-show="item.shopType == 1"></em>
              <em class="i-tm" v-show="item.shopType == 0"></em>
              <span v-text="item.title" class="i-title"></span>
            </div>
            <p class="sell-count">以抢<span v-text="item.sellCount"></span>件</p>
            <div class="item-price">
              <p class="zk-price">优惠价￥<span v-text="item.zkPrice * 0.01" class="text-big"></span></p>
              <p class="reserve-price">￥<span v-text="item.reservePrice * 0.01"></span></p>
            </div>
          </div>
          <div class="item-coupon">
            <div class="coupon-container">
              <p class="coupon-title">优惠价</p>
              <p class="coupon-price">￥<span class="text-big" v-text="item.coupon / 100"></span></p>
              <button class="btn-pull">领券购买</button>
            </div>
          </div>
        </li>
      </ul>
    </scroll>
    <m-command :isShowCode="isShowCode" @isHideCopy="isHideCopy"></m-command>
  </div>
</template>

<script>
import Scroll from '@/base/scroll/scroll'
import MCommand from '@/components/m-command/m-command'

export default {
  components: {
    Scroll,
    MCommand
  },
  created () {
    this.getShopInfo()
  },
  data () {
    return {
      dataList: '',
      isShowCode: false
    }
  },
  methods: {
    getShopInfo () {
      this.axios.get('/shop/info').then(res => {
        this.dataList = res.data.data
        console.log(this.dataList)
      })
    },
    onShowCode () {
      this.isShowCode = true
    },
    isHideCopy () {
      console.log('父组件接收到了值')
      this.isShowCode = false
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/variable"

  .recommend
    position: fixed;
    width: 100%;
    top: .93rem;
    bottom: 0;
    .recommend-container
      height 100%
      font-size $font-size-medium
      color $color-text-info
      overflow hidden
      background $color-background-d
      .data-list
        .data-item
          display flex
          padding .1rem .05rem
          margin .05rem
          border-radius .05rem
          background $color-background
          .item-coupon
            display flex
            flex-direction column
            width .8rem
            flex 0 0 .8rem
            position relative
            &:after,&:before
              content ''
              width .1rem
              height .1rem
              border-radius 50%
              background $color-background-d
            &:before
              position absolute
              top -0.15rem
              left -0.04rem
            &:after
              position absolute
              bottom -0.15rem
              left -0.04rem
            .coupon-container
              flex 1
              display flex
              flex-direction column
              justify-content space-between
              margin  0 0 .1rem
              text-align center
              box-sizing border-box
              border-left 1.5px dashed #f3f3f3
              font-size $font-size-small
              color $color-border-a
              .coupon-title
                font-weight bold
              .coupon-price
                font-weight bold
                .text-big
                  font-size $font-size-large-x
              .btn-pull
                width 90%
                padding .05rem 0
                margin 0 auto
                border none
                border-radius .4rem
                font-size $font-size-small
                color $color-text
                background $color-theme
          .item-pic
            width 1rem
            flex 0 0 1rem
            height 1rem
          .item-info
            margin 0 .05rem
            .info-title
              font-size 0
              .i-new
                display inline-block
                width .24rem
                height .15rem
                background url(../../images/new.png) no-repeat center
                background-size contain
              .i-tb,.i-tm
                display inline-block
                width .15rem
                height .15rem
                margin-left .05rem
              .i-tb
                background url(../../images/tb.png) no-repeat center
                background-size contain
              .i-tm
                background url(../../images/tm.png) no-repeat center
                background-size contain
              .i-title
                line-height .2rem
                font-size $font-size-medium
                // vertical-align middle
            .sell-count
              margin-top .2rem
              font-size .11rem
              line-height .2rem
              color $color-text-list
            .item-price
              display flex
              justify-content space-between
              font-size .11rem
              .zk-price
                color $color-text-d
                .text-big
                  font-size .16rem
                  font-weight bold
              .reserve-price
                margin-top .05rem
                text-decoration line-through
</style>
