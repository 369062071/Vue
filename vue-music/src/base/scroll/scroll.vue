<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    props: {
      // 监听滚动
      probeType: {
        type: Number,
        default: 1
      },
      // 手动派发点击事件
      click: {
        type: Boolean,
        default: true
      },
      // 数据动态变化时需要refresh scroll
      data: {
        type: Array,
        default: null
      }
    },
    mounted () {
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },
    methods: {
      // 初始化
      _initScroll () {
        // wrapper 没有值的时候就return
        if (!this.$refs.wrapper) {
          return
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click
        })
      },
      enable () {
        this.scroll && this.scroll.enable()
      },
      disable () {
        this.scroll && this.scroll.disable()
      },
      refresh () {
        console.log('我是子组件scroll')
        this.scroll && this.scroll.refresh()
      }
    },
    watch: {
      // data变化就刷新scroll,重新计算
      data () {
        setTimeout(() => {
          this.refresh()
        }, 20)
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>


