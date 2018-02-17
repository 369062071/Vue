<template>
  <div ref="viewport" class="navigator-component">
    <scroll ref="scroll" direction="horizontal">
      <ul class="tab-list" ref="tabList">
        <li v-for="(item, index) in navList" class="tab-item" @click="selectNav(item)" :key="index">
          <slot name="item" :text="item.name" :index="item.id">
            <span class="tab-name" :class="{'link-active':isCurrentTab(item.id)}">{{item.name}}</span>
          </slot>
        </li>
      </ul>
    </scroll>

    <div class="category-more">
      <em class="icon-more" ref="more" @click="activeMore"></em>
      <i class="line"></i>
    </div>

    <ul class="categoty-list" v-show="categoryShow">
      <li class="categoty-item" v-for="(item, index) in navList" :key="index">
        <span class="name" :class="{'link-active':isCurrentTab(item.id)}" @click="selectNav(item)">
          {{item.name}}
        </span>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
import Scroll from '@/base/scroll/scroll'
// import CategotyList from '../categoryList'
import Bus from '@/bus.js'

const EVENT_CHANGE = 'change'

export default {
  props: {
    navList: {
      type: Array,
      default () {
        return [{
          name: 'default'
        }]
      }
    },
    currentTabIndex: {
      type: Number,
      default: null
    }
  },
  components: {
    Scroll
  },
  data () {
    return {
      currentTab: 11,
      current: 1,
      categoryShow: false
    }
  },
  created () {
    Bus.$on('categoryHide', () => {
      console.log(111)
      this.categoryShow = false
      this.$refs.more.className = 'icon-more'
    })
  },
  mounted () {
    setTimeout(() => {
      this.init()
    }, 20)
  },
  methods: {
    init () {
      this._initTabListWidth()
      this.$emit(EVENT_CHANGE)
      if (this.currentTabIndex === null) {
        this.current = this.currentTab
      } else {
        this.current = this.currentTabIndex
      }
      setTimeout(() => {
        this._adjust(this.current)
      }, 500)
    },
    isCurrentTab (index) {
      return index === this.current
    },
    selectNav (item) {
      this.categoryShow = false
      this.$refs.more.className = 'icon-more'

      this.current = item.id
      this._adjust(item.id)
      this.$emit(EVENT_CHANGE, item)
    },
    activeMore () {
      if (this.categoryShow) {
        this.categoryShow = false
        this.$refs.more.className = 'icon-more'
      } else {
        this.categoryShow = true
        this.$refs.more.className += ' active'
      }
    },
    _initTabListWidth () {
      const tabList = this.$refs.tabList
      const items = tabList.children
      let width = 0
      for (let i = 0; i < items.length; i++) {
        width += items[i].clientWidth
      }
      tabList.style.width = (width + 41) + 'px'
    },
    _adjust (tabId) {
      const viewportWidth = this.$refs.viewport.clientWidth
      const tabListWidth = this.$refs.tabList.clientWidth
      const minTranslate = Math.min(0, viewportWidth - tabListWidth)
      const middleTranslate = viewportWidth / 2
      const items = this.$refs.tabList.children
      let width = 0
      this.navList.every((item, index) => {
        if (item.id === tabId) {
          console.log(item.id, index, items[index].clientWidth)
          width += items[index].clientWidth / 2
          return false
        }
        width += items[index].clientWidth
        return true
      })
      let translate = middleTranslate - width
      console.log('width', width, 'translate', translate)
      translate = Math.max(minTranslate, Math.min(0, translate))
      console.log(translate, minTranslate)
      this.$refs.scroll.scrollTo(translate, 0, 300)
    }
  }
}
</script>

<style lang='stylus' rel='stylesheet/stylus' type="text/stylus">
  @import "../../common/stylus/variable"
  @import '../../common/stylus/'

  .navigator-component
    position relative
    background $color-background
    z-index 10
    .categoty-list
      display flex
      flex-wrap wrap
      justify-content center
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
