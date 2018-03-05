<template>
  <div class="product">
    <!-- 
      下拉 action
      :pullDownRefresh="pullDownRefreshObj"
      @pullingDown="onPullingDown"
     -->
    <scroll
      class="product-container"
      :data="dataList"
      :pullUpLoad="pullUpLoad"
      @pullingUp="loadMore"
      ref="scroll"
    >
      <div>
        <div class="slider-wrapper" v-if="banners.length" style="height: 180px">
          <slider>
            <div  v-for="(item,index) in banners" :key="index">
              <a :href="item.linkUrl">
                <img class="needsclick" @load="loadImage" :src="item.picUrl" >
              </a>
            </div>
          </slider>
        </div>
        <ul class="data-list">
          <li  v-for="(item, index) in dataList" :key="index">
            <div class="data-item">
               <div class="link-left">
                <img v-lazy="item.picurls" class="item-pic" >
                <div class="item-info">
                  <div class="info-title" ref="info" style="-webkit-box-orient: vertical">
                    <em class="i-new"></em>
                    <em class="i-tb" v-show="item.shoptype == 1"></em>
                    <em class="i-tm" v-show="item.shoptype == 0"></em>
                    <!-- <span v-text="item.title" class="i-title"></span> -->
                    {{ item.title }}
                  </div>
                  <div class="info-bottom">
                    <p class="sell-count">以抢<span v-text="item.sellcount"></span>件</p>
                    <div class="item-price">
                      <p class="zk-price">优惠价￥<span v-text="item.zkprice" class="text-big"></span></p>
                      <p class="reserve-price">￥<span v-text="item.reserveprice"></span></p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="item-coupon">
                <div class="coupon-container">
                  <p class="coupon-title">优惠价</p>
                  <p class="coupon-price">￥<span class="text-big" v-text="item.coupon / 100"></span></p>
                  <button class="btn-pull">领券购买</button>
                </div>
              </div>
            </div>
           

            <div class="inset-item" v-show="item.sum">
             
              <img v-lazy="item.picurls" class="inset-pic">
              <div class="inset-info">
            
                <span class="title">免费体验 满意付款</span>
        
                <div class="info-bottom">
                  <p class="sell-count">以抢<span v-text="item.sellcount"></span>件</p>
                  <div class="inset-price">
                    <p class="zk-price">优惠券￥<span v-text="item.zkprice" class="text-big"></span></p>
                    <p class="reserve-price">￥
                      <span v-text="item.reserveprice"></span>
                    </p>
                  </div>
                </div>
              </div>
          
             
              <div class="coupon-container">
                <p class="title">优惠</p>
                <p class="coupon-price">￥
                  <span class="text-big" v-text="item.coupon"></span>
                </p>
                <button class="btn-pull">马上抢</button>
              </div>

            </div>
          </li>

          <loading v-show="hasMore" :class="dataList ? 'loading-padding' : '' "></loading>

        </ul>
      </div>
      <p v-show="!hasMore" class="no-data">没有更多了</p>
    </scroll>
  </div>
</template>

<script>
import Scroll from '@/base/scroll/scroll'
import Loading from '@/components/loading/loading'
import Slider from '@/base/slider/slider'
import InsertItem from '@/components/insert-item/insert-item'
import Bus from '@/bus.js'
import {getItemVo} from '@/common/js/api'
import {data} from '../../data'
// const PAGE_START = 1

export default {
  components: {
    Scroll,
    Loading,
    Slider,
    InsertItem
  },
  data () {
    return {
      dataList: data.productList.list,
      banners: data.banner,
      isShowCode: false,
      pullUpLoad: true,
      page: 1,
      cid: 1204,
      hasMore: true,
      pullDownRefresh: true,
      pullDownRefreshThreshold: 90,
      pullDownRefreshStop: 60,
      insert: ''
    }
  },
  created () {
    setTimeout(() => {
      // this._getShopInfo()
      // this._getItemVo()
      this.dataList = this.dataList.concat(data.productList.insert)
      console.log(this.dataList)
    }, 1500)

    Bus.$on('changeCid', cid => {
      console.log('我是cid', cid)
      this.$refs.scroll.scrollTo(0, 0)
      // 切换后输出
    })

    Bus.$on('updateQuery', query => {
      console.log('传递过来的query', query)
      // search(query).then(res => {
      //   console.log(res)
      //   console.log(this.$refs.dataBox)
      //   this.$refs.dataBox.scrollTo(0, 0)
      //   this.dataList = res.data
      // })
    })
  },
  mounted () {
  },
  methods: {
    onPullingDown() {
        // 模拟更新数据
      console.log('pulling down and load data')
      setTimeout(() => {
        if (this._isDestroyed) {
          return
        }
        // if (Math.random() > 0.5) {
        //   // 如果有新数据
        //   this.items.unshift(this.$i18n.t('normalScrollListPage.newDataTxt') + +new Date())
        // } else {
        //   // 如果没有新数据
        //   this.$refs.scroll.forceUpdate()
        // }
        this.$refs.scroll.forceUpdate()
      }, 2000)
    },
    _getItemVo () {
      this.page = 1
      this.hasMore = true
      if (this.$refs.scroll) {
        this.$refs.scroll.scrollTo(0, 0)
      }
      getItemVo(this.page, this.cid).then(res => {
        console.log(res)
        this.dataList = res.list
      })
    },
    isHideCopy () {
      console.log('父组件接收到了值')
      this.isShowCode = false
    },
    loadMore () {
      if (!this.hasMore) {
        return
      }
      this.page++

      let timer
      console.log('下拉加载了,page=', this.page)

      timer = setTimeout(() => {
        if (timer) {
          clearTimeout(timer)
        }
        // this.axios.get('/shop/info').then(res => {
        //   console.log('下拉加载了')
        //   this.dataList = this.dataList.concat(res.data.data)
        // })
        this.dataList = this.dataList.concat(data.productList.list)
        this._checkMore(data)
      }, 1500)
    },
    loadImage () {
      if (!this.checkLoaded) {
        this.$refs.scroll.refresh()
        console.log('执行了')
        this.checkLoaded = true
      }
    },
    _checkMore (res) {
      const data = res.productList
      console.log(this.page, data.pageSize)
      if (!data.list.length || this.page >= data.pageSize) {
        console.log('hasmore')
        this.hasMore = false
      }
    }
  },
  computed: {
    pullDownRefreshObj: function () {
      return this.pullDownRefresh ? {
        threshold: parseInt(this.pullDownRefreshThreshold),
        stop: parseInt(this.pullDownRefreshStop)
      } : false
    }
  },
  watch: {
    pullDownRefreshObj: {
      handler() {
        this.rebuildScroll()
      },
      deep: true
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/variable"

  .product
    position: fixed;
    width: 100%
    max-width 980px
    top: .93rem
    bottom: 0
    .product-container
      height 100%
      font-size $font-size-medium
      color $color-text-info
      overflow hidden
      background $color-background-d
      .no-data
        padding .1rem 0
        text-align center
        font-size .14rem
        color #999
      .slider-wrapper
        position relative
        width 100%
        overflow hidden
      .data-list
        // padding-top .1rem
        .loading-padding
          padding 0 0 .1rem 0
        .inset-item
          display flex
          justify-content space-between
          margin .05rem
          border-radius .05rem
          color $color-theme
          background #fff
          .inset-pic
            width 1rem
            flex 0 0 1rem
            height 1rem
            padding .1rem 0 .1rem .05rem 
          .inset-info
            display flex
            flex-grow 1
            flex-direction column
            justify-content space-between
            margin 0 .1rem 0 .05rem
            padding .1rem 0 .1rem .05rem 
            .title
              font-size .18rem
              font-weight bold
            .info-bottom
              .sell-count
                font-size .11rem
                line-height .2rem
                color $color-text-list
              .inset-price
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
                  color #666
          .coupon-container
            display flex
            flex-direction column
            justify-content space-around
            width .85rem
            flex 0 0 .85rem
            position relative
            padding .15rem 0 .1rem 
            border-radius .05rem
            align-items center
            color #fff
            background $color-theme
            &:after,&:before
              content ''
              width .1rem
              height .1rem
              border-radius 50%
              background $color-background-d
            &:before
              position absolute
              top -0.05rem
              left -0.04rem
            &:after
              position absolute
              bottom -0.05rem
              left -0.04rem
            .title
              font-size .16rem
            .coupon-price
              .text-big
                font-size .24rem
            .btn-pull
              width 90%
              padding .05rem 0
              margin 0 auto
              border none
              border-radius .4rem
              outline none
              font-size $font-size-small
              color $color-theme
              background #fff
        .data-item
          display flex
          justify-content space-between
          padding .1rem .05rem
          margin .05rem
          border-radius .05rem
          background $color-background
          .link-left
            display flex
            flex-grow 1
          .item-coupon
            display flex
            flex-direction column
            width .8rem
            flex 0 0 .8rem
            position relative
            padding-top .1rem
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
              padding-left .05rem
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
                outline none
                font-size $font-size-small
                color $color-text
                background $color-theme
          .item-pic
            width 1rem
            flex 0 0 1rem
            height 1rem
          .item-info
            display flex
            flex-grow 1
            flex-direction column
            justify-content space-between
            margin 0 .1rem 0 .05rem
            .info-title
              line-height .2rem
              font-size $font-size-medium
              color $color-theme
              display -webkit-box
              overflow hidden
              -webkit-box-orient vertical
              -webkit-line-clamp 2
              .insert-title
                font-weight bold
                font-size .18rem
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
              .i-tb
                background url(../../images/tb.png) no-repeat center
                background-size contain
              .i-tm
                background url(../../images/tm.png) no-repeat center
                background-size contain
              .i-title
                display inline
                line-height .2rem
                font-size $font-size-medium
                // vertical-align middle
            .info-bottom
              .sell-count
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
                  color #666
</style>
