<template>
  <div class="marquee">
    <div v-show="isShow" class="container">
      <p class="user-runlight">
        <span class="dot">&nbsp;·</span>
        <span  v-text="userName"></span>
      </p>
      <p class="msg-runlight" v-text="userMsg"></p>
    </div>
  </div>
</template>

<script>
import {marquee} from '@/common/js/api'

const LATENCY_TIME = 2500

export default {
  data () {
    return {
      timer: '',
      index: 0,
      isShow: false,
      userName: '',
      userMsg: '',
      onceMk: true
    }
  },
  created () {
    this._getMarquee()
  },
  mounted () {
  },
  methods: {
    onInterval () {
      this.timer = setInterval(() => {
        if (!this.isShow) {
          this.onAddIndex()
          this.userName = this.data[this.index].user
          this.userMsg = this.data[this.index].msg
          this.isShow = true
        } else {
          this.isShow = false
        }
      }, LATENCY_TIME)
    },
    onAddIndex () {
      if (this.index === this.data.length - 1) {
        this.index = 0
      } else {
        if (this.onceMk) {
          this.onceMk = false
          return
        }
        this.index++
      }
      // console.log(this.index)
    },
    _getMarquee () {
      marquee().then(res => {
        console.log(res)
        this.data = res.data
      })
    }
  },
  watch: {
    userName (now, old) {
      console.log(now, old)
      this.onInterval()
    }
  },
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="stylus" scoped>
  .container
    padding .05rem .1rem
    border-radius .12rem
    font-size .12rem
    color #fff
    background rgba(0, 0, 0, .6)
    .user-runlight
      padding-bottom .05rem
      .dot
        font-weight bold
    .msg-runlight
      padding-left .1rem
</style>
