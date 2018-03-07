<template>
  <div class="product">
    <ul class="data-list1">
      <li class="item" v-for="(item, index) in dataList" :key="index">
        <div class="img-wrapper">
          <img v-lazy="item.picUrls" class="item-img">
        </div>
        <div class="item-info">
          <em class="t-icon"></em>
          <p class="title" v-text="item.title"></p>
          <p class="count">
            已抢<span v-text="item.sellcount"></span>件
          </p>
        </div>
        <div class="item-price">
          <div class="ticket">
            <p class="ticket-name">优惠券</p>
            <p>￥<span class="text-big" v-text="item.coupon"></span></p>
          </div>
          <div class="original">
            <p class="before-price" >
              ￥<span v-text="item.reserveprice"></span>
            </p>
            <p class="after-price">
              券后价￥<span class="text-big" v-text="item.zkprice"></span>
            </p>
          </div>
          <button class="sell-btn" type="button">领券购买</button>
        </div>
      </li>
      <!-- <loading v-show="hasMore" :class="dataList ? 'loading-padding' : '' "></loading> -->
    </ul>
    
    <ul class="data-list2">
      <li class="item" v-for="(item, index) in dataList" :key="index">
        <div class="img-wrapper">
          <img v-lazy="item.picUrls" class="item-img">
        </div>
        <div class="item-info">
          <em class="t-icon"></em>
          <p class="title" v-text="item.title"></p>
          <p class="count">
            已抢<span v-text="item.sellcount"></span>件
          </p>
        </div>
        <div class="item-price">
          <div class="ticket">
            <p class="ticket-name">优惠券</p>
            <p>￥<span class="text-big" v-text="item.coupon"></span></p>
          </div>
          <div class="original">
            <p class="before-price" >
              ￥<span v-text="item.reserveprice"></span>
            </p>
            <p class="after-price">
              券后价￥<span class="text-big" v-text="item.zkprice"></span>
            </p>
          </div>
          <button class="sell-btn" type="button">领券购买</button>
        </div>
      </li>
    </ul>

    <ul class="data-list3">
      <li class="item" v-for="(item, index) in dataList" :key="index">
        <div class="img-wrapper">
          <img v-lazy="item.picUrls" class="item-img">
        </div>
        <div class="item-info">
          <em class="t-icon"></em>
          <p class="title" v-text="item.title"></p>
          <p class="count">
            已抢<span v-text="item.sellcount"></span>件
          </p>
        </div>

        <div class="item-price">
          <div class="original">
            <p class="before-price" >
              ￥<span v-text="item.reserveprice"></span>
            </p>
            <p>券后价</p>
            <p class="after-price">
              ￥<span v-text="item.zkprice" class="text-big"></span>
            </p>
          </div>
          <div class="ticket-wrapper">
            <div class="ticket">
              <p class="ticket-name">优惠券</p>
              <p>￥<span class="text-big" v-text="item.coupon"></span></p>
            </div>
            <button class="sell-btn" type="button">领券购买></button>
          </div>
        </div>
      </li>
    </ul>

  </div>
</template>

<script>
import Bus from '@/bus.js'
import {getItemVo} from '@/common/js/api'
import {data} from '../../data'
// const PAGE_START = 1

export default {
  components: {
  },
  data () {
    return {
      dataList: data.productList.list,
      banners: data.banner,
      scrollTop: 0,
      clientHeight: 0,
      scrollHeight: 0,
      isLoad: true
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
    window.addEventListener('scroll', () => {
      this.getScrollTop()
      this.getClientHeight()
      this.getScrollHeight()

      if (this.scrollTop + this.clientHeight >= this.scrollHeight - 300) {
        if (this.isLoad) {
          console.log('加载执行了')
          this.isLoad = false
          setTimeout(() => {
            this.isLoad = true
            this.dataList = this.dataList.concat(data.productList.list)
          }, 500)
        }
      }
    })
  },
  methods: {
    // 获取当前滚动条的位置
    getScrollTop () {
      if (document.documentElement && document.documentElement.scrollTop) {
        this.scrollTop = document.documentElement.scrollTop
      } else if (document.body) {
        this.scrollTop = document.body.scrollTop
      }
    },
    // 获取当前可视范围的高度
    getClientHeight () {
      if (document.body.clientHeight && document.documentElement.clientHeight) {
        this.clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight)
      } else {
        this.clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight)
      }
    },
    // 获取文档完整的高度
    getScrollHeight () {
      this.scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
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
    width 1190px
    margin 0 auto
    .data-list1
      font-size 0
      .item
        display inline-block
        width 290px
        margin-bottom 7px
        margin-right 7px
        border 1px solid #ddd
        box-sizing border-box
        .img-wrapper
          width 288px
          height 288px
          .item-img
            width 100%
            height 100%
        .item-info
          display flex
          height 40px
          margin 0 5px 4px 5px
          font-size $font-size-small
          color $color-text
          position relative
          .t-icon
            width 25px
            flex 0 0 25px
            height 25px
            margin-right 10px
            background url(../../images/tb.png) no-repeat
            background-size cover
          .title
            line-height 20px
          .count
            position absolute
            right 0
            bottom 0
            line-height 20px
            color $color-text-d
        .item-price
          display flex
          font-size $font-size-medium-x
          color #fff
          background $color-theme
          .ticket
            width 80px
            flex 0 0 80px
            padding 20px 0 14px
            text-align center
            .ticket-name
              margin-bottom 4px
            .text-big
              font-size $font-size-large-x
          .original
            flex-grow 1
            padding 20px 0 14px
            border-right  2px dashed $color-btn
            .before-price
              margin 4px 0
              font-size $font-size-small
              text-decoration line-through
            .after-price
              .text-big
                font-size 24px
          .sell-btn
            width 70px
            flex 0 0 70px
            outline none
            border none
            font-size $font-size-large
            color $color-theme
            background $color-btn
            cursor pointer

    .data-list2
      font-size 0
      .item
        display inline-block
        width 290px
        margin 0 7px 7px 0
        padding-bottom 10px
        border 1px solid #ddd
        box-sizing border-box
        .img-wrapper
          width 288px
          height 288px
          .item-img
            width 100%
            height 100%
        .item-info
          display flex
          height 40px
          margin 0 5px 14px 5px
          font-size $font-size-small
          color $color-text
          position relative
          .t-icon
            width 25px
            flex 0 0 25px
            height 25px
            margin-right 10px
            background url(../../images/tb.png) no-repeat
            background-size cover
          .title
            line-height 20px
          .count
            position absolute
            right 0
            bottom 0
            line-height 20px
            color $color-text-d
        .item-price
          display flex
          height 56px
          font-size $font-size-medium-x
          color $color-theme
          .ticket
            width 80px
            flex 0 0 80px
            text-align center
            .ticket-name
              margin-bottom 4px
            .text-big
              font-size 34px
          .original
            flex-grow 1
            .before-price
              margin-top 18px
              font-size $font-size-small
              text-decoration line-through
            .after-price
              font-size $font-size-medium
              .text-big
                font-size $font-size-large
          .sell-btn
            width 92px
            flex 0 0 92px
            height 56px
            outline none
            border none
            font-size $font-size-medium-x
            color #fff
            background $color-theme
            cursor pointer

    .data-list3
      font-size 0
      .item
        display inline-block
        width 290px
        margin 0 7px 7px 0
        border 1px solid #f5f5f5
        box-sizing border-box
        .img-wrapper
          width 288px
          height 288px
          .item-img
            width 100%
            height 100%
        .item-info
          display flex
          height 40px
          margin 0 5px 14px 5px
          font-size $font-size-small
          color $color-text
          position relative
          .t-icon
            width 25px
            flex 0 0 25px
            height 25px
            margin-right 10px
            background url(../../images/tb.png) no-repeat
            background-size cover
          .title
            line-height 20px
          .count
            position absolute
            right 0
            bottom 0
            line-height 20px
            color $color-text-d
        .item-price
          display flex
          height 72px
          font-size $font-size-medium-x
          color $color-theme
          background #f5f5f5
          .ticket-wrapper
            flex-grow 1
            display flex
            align-items center
            .ticket
              width 80px
              flex 0 0 80px
              text-align center
              .ticket-name
                margin-top 14px
                margin-bottom 4px
              .text-big
                font-size 34px
            .sell-btn
              width 108px
              flex 0 0 108px
              height 34px
              border-radius 17px
              outline none
              border none
              font-size $font-size-medium-x
              color #fff
              background $color-theme
              cursor pointer
          .original
            width 94px
            flex 0 0 94px
            display flex
            flex-direction column
            justify-content space-around
            align-items center
            padding 8px 0
            border-right 2px dashed #fff
            font-size $font-size-medium
            position relative
            &:before,&:after
              position absolute
              content ''
              width 10px
              height 10px
              border-radius 50%
              background #fff
            &:before
              top -5px
              right -5px
            &:after
              bottom -5px
              right -5px
            .before-price
              font-size $font-size-small
              text-decoration line-through
            .after-price
              font-size $font-size-small
              .text-big
                font-size $font-size-large
        
</style>
