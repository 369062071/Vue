<template>
  <div ref="viewport" class="navigator">
    <div class="recommend">
      <div class="m-title" @hover="listShow">
        <em class="more-icon"></em>
        <span>今日推荐</span>
      </div>
      <ul v-show="recommendList" class="list" ref="recommend">
        <li v-for="(item, index) in recommendList" class="item">
          <!-- <a href="#"> -->
            <span v-text="item.name"></span>
          <!-- </a> -->
        </li>
      </ul>
    </div>
    <ul class="tab-list" ref="tabList" v-show="navList ">
      <li v-for="(item, index) in navList" class="tab-item" :key="index">
        <!-- <a href="#"> -->
          <span class="tab-name">{{item.name}}</span>
        <!-- </a> -->
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
import {data} from '@/data'
// import Bus from '@/bus.js'

// const EVENT_CHANGE = 'changeCid'

export default {
  data () {
    return {
      navList: data.nav.navList,
      recommendList: data.nav.recommendList,
      current: 1,
      categoryShow: false
    }
  },
  methods: {
    listShow () {
      console.log(11)
      this.$refs.recommend.className = 'list on'
    }
  }
}
</script>

<style lang='stylus' rel='stylesheet/stylus' type="text/stylus">
  @import "../../common/stylus/variable"

  .navigator
    display flex
    position relative
    background $color-background
    .recommend
      width 170px
      height 40px
      flex 0 0 170px
      line-height 40px
      color $color-text-white
      background $color-theme
      position relative
      .m-title
        display flex
        justify-content center
        align-items center
        &:hover
          display block
        .more-icon
          width 17px
          height 12px
          margin-right 5px
          background url(../../images/more-icon.png) no-repeat
      .list
        position absolute
        top 40px
        left 0
        width 100%
        display flex
        flex-wrap wrap
        background rgba(0,0,0,.6)
        display none
        &.on
          display block
        .item
          width 50%
          display flex
          justify-content center
          color $color-text-white
    .categoty-list
      display flex
      flex-wrap wrap
      padding .14rem .17rem
      box-shadow 0px 2px  5px 0px #aaa
      position relative
      z-index 99
      background $color-background
      .categoty-item
        display inline-block
        width 33.33%
        padding .06rem 0
        text-align center
        font-size $font-size-medium
        color $color-text-list
        .name
          display inline-block
          padding .06rem .12rem
          border-radius .24rem
          background $color-background-d
          border 1px solid transparent
        .link-active
          border 1px solid $color-border-a
          color $color-text-d
          background $color-background
    .category-more
      width .38rem
      height .38rem
      position absolute
      top 0
      right 0
      background $color-background
      &:after
        content ''
        position absolute
        width .05rem
        height .25rem
        top .05rem
        left -.02rem
        background linear-gradient(90deg,rgba(255,255,255,0) 0,#fff)
      .icon-more
        display block
        width 100%
        height 100%
        background url(../../images/icon-more.png) no-repeat center
        background-size .2rem
        transition all .3s
        &.active
          transform: rotate(180deg);
      .line
        position absolute
        top 50%
        left 0
        width 1px
        height 22px
        border-right 1px solid $color-border
        transform translateY(-50%)
    .list-wrapper
      border-bottom 1px solid $color-border
      background: none
      .scroll-content
      //用于横向滚动
        display: inline-block
      .tab-list
        margin: 0 auto
        .tab-item
          display: inline-block
          line-height .4rem
          .tab-name
            display: block
            position: relative
            padding: 0 .15rem 0 .14rem
            font-size: $font-size-medium
            color: #666
            &.link-active
              transition: all 0.2s
              transform: scale(1.04)
              color: $color-text-d
</style>
