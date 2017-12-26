<template>
  <scroll class="listview" 
          :data="data" 
          ref="listview" 
          :listen-scroll="listenScroll" 
          :probeType="probeType"
          @scroll = "scroll">
    <ul>
      <li v-for="(group,index) in data" class="list-group" ref="listGroup" :key="index">
        <h2 class="list-group-title">{{ group.title }}</h2>
        <ul>
          <li v-for="(item,index) in group.items" class="list-group-item" :key="index" @click="selectItem(item)">
            <img class="avatar" v-lazy="item.avatar">
            <span class="name">{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
      <ul>
        <li v-for="(item,index) in shortcutList" 
        class="item" 
        :data-index="index"
        :class="{'current' : currentIndex === index}"
        :key="index"
        >
          {{ item }}
        </li>
      </ul>
    </div>
    <div class="list-fixed" v-show="fixedTitle" ref="fixed">
      <h1 class="fixed-title">{{ fixedTitle }}</h1>
    </div>
    <div v-show="!data.length" class="loading-container">
      <loading></loading>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
  import Scroll from '../../base/scroll/scroll.vue'
  import {getData} from '../../common/js/dom'
  import Loading from '../../base/loading/loading.vue'

  const ANCHOR_HEIGHT = 18
  const TITLE_HEIGHT = 30

  export default {
    components: {
      Scroll,
      Loading
    },
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    data () {
      return {
        scrollY: -1,
        currentIndex: 0,
        diff: -1 // 歌手nav偏移值
      }
    },
    computed: {
      shortcutList () {
        return this.data.map((group) => {
          return group.title.substr(0, 1)
        })
      },
      // 歌手顶部nav显示及内容
      fixedTitle () {
        if (this.scrollY > 0) {
          return ''
        }
        // currentIndex 被watch监听
        return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
      }
    },
    created () {
      this.touch = {}
      this.listenScroll = true
      this.listHeight = []
      // 不截流 3
      this.probeType = 3
    },
    methods: {
      // 点击传递歌手信息
      selectItem (item) {
        this.$emit('select', item)
      },
      // 手指点击移动
      onShortcutTouchStart (e) {
        let anchorIndex = getData(e.target, 'index')
        let firstTouch = e.touches[0]
        // 记录初始 Y值
        this.touch.y1 = firstTouch.pageY

        // 记录初始 anchorIndex值
        this.touch.anchorIndex = anchorIndex
        // console.log(e.touches, this.touch)
        // 跟新侧栏位置（传入el）
        this._scrollTo(anchorIndex)
      },
      // 滚动  start的时候获取到 Y值，move的时候也获取到 Y值
      onShortcutTouchMove (e) {
        let firstTouch = e.touches[0]
        this.touch.y2 = firstTouch.pageY
        // data在 Y轴 上的偏移锚点数
        let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0

        // console.log('data在 Y轴 上的偏移锚点数' + delta)
        // 歌手dom的偏移量
        let anchorIndex = parseInt(this.touch.anchorIndex) + delta
        // console.log('这是歌手dom的偏移量' + anchorIndex)

        // 更新侧栏位置
        this._scrollTo(anchorIndex)
      },
      scroll (pos) {
        // console.log('子组件传来的', pos.y)
        // better-scroll滚动到Y轴的距离
        this.scrollY = pos.y
      },
       // 更新侧栏位置（传入el）
      _scrollTo (index) {
        // 点击侧栏条空白位置处理
        if (!index && index !== 0) {
          return
        }
        // 处理边界情况
        if (index < 0) {
          index = 0
        } else if (index > this.listHeight.length - 2) {
          index = this.listHeight.length - 2
        }
        this.scrollY = -this.listHeight[index]
        console.log(index, 'scrolly', this.scrollY)
        this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 1000)
      },
      // 计算歌手列表高度
      _calculateHeight () {
        this.listHeight = []
        const list = this.$refs.listGroup
        let height = 0
        this.listHeight.push(height)
        // 遍历歌手dom，获取clintHeight
        for (let item of list) {
          // console.log(item.clientHeight)
          height += item.clientHeight
          this.listHeight.push(height)
        }
        // console.log(this.listHeight)
      }
    },
    watch: {
      data () {
        setTimeout(() => {
          // console.log('data变化啦')
          this._calculateHeight()
        }, 20)
      },
      scrollY (newY) {
        const listHeight = this.listHeight
        // console.log('watch观察到了scrollY更新')
        // console.log(listHeight)
        // 当滚动到顶部， newY > 0
        if (newY >= 0) {
          this.currentIndex = 0
          return
        }
        // 在中间滚动
        for (let i = 0; i < listHeight.length - 1; i++) {
          let height1 = listHeight[i]
          let height2 = listHeight[i + 1]
          // 某个区间的上限和下限
          if (-newY >= height1 && -newY < height2) {
            this.currentIndex = i
            // console.log(this.currentIndex)
            this.diff = height2 + newY
            console.log('diff的值', this.diff, 'newY的值', newY)
            return
          }
        }
        // 当滚动到底部，且 -newY大于最后一个元素的上限
        this.currentIndex = listHeight.length - 2
        // console.log('我到底部啦' + this.currentIndex)
      },
      diff (newVal) {
        console.log('diff的newVal', newVal)
        // 偏移量赋值
        let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
        // 有值才计算
        if (this.fixedTop === fixedTop) {
          return
        }
        this.fixedTop = fixedTop
        console.log('fixed的值', fixedTop, 'this.fiexedTop的值', this.fixedTop)
        // 修改偏移
        this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
