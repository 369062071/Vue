<template>
  <div ref="viewport" class="navigator">
    <div class="recommend">
      <div class="m-title" @hover="listShow">
        <em class="more-icon"></em>
        <span>今日推荐</span>
      </div>
      <ul v-show="recommendList" class="recommend-list" ref="recommend">
        <li v-for="(item, index) in recommendList" class="item">
          <a href="#" class="item-link">
            <span v-text="item.name"></span>
          </a>
        </li>
      </ul>
    </div>

    <ul class="tab-list" ref="tabList" v-show="navList ">
      <li v-for="(item, index) in navList" class="tab-item" :key="index">
        <a href="#" class="item-link">
          <span class="tab-name">{{item.name}}</span>
        </a>
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
    width 1190px
    margin 0 auto
    background $color-background
    .recommend
      width 170px
      height 40px
      flex 0 0 170px
      line-height 40px
      color $color-text-white
      background $color-theme
      position relative
      &:hover
        .recommend-list
          display block
      .m-title
        display flex
        justify-content center
        align-items center
        .more-icon
          width 17px
          height 12px
          margin-right 5px
          background url(../../images/more-icon.png) no-repeat
      .recommend-list
        position absolute
        top 40px
        left 0
        width 100%
        display flex
        flex-wrap wrap
        background rgba(0,0,0,.6)
        display none
        font-size 0
        z-index 99
        .item
          display inline-block
          width 50%
          text-align center
          font-size $font-size-medium
          color $color-text-white
          transition all .2s
          .item-link:hover
            text-decoration underline
            color $color-theme
    .tab-list
      display flex
      .tab-item
        padding 0 30px 
        line-height 40px
        .item-link
          color $color-text
          transition all .2s
          &:hover
            text-decoration underline
            color $color-theme
</style>
