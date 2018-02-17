<template>
  <div class="search-box" v-show="isShow">
    <h2 class="title">搜索历史</h2>
    <ul class="list">
      <li class="item" v-for="item in searches" v-text="item" @click="onSearch(item)"></li>
    </ul>
  </div>
</template>

<script>
import {loadSearch} from '@/common/js/cache.js'
import Bus from '@/bus'

export default {
  data () {
    return {
      searches: '',
      isShow: false
    }
  },
  created () {
    this.searches = loadSearch()

    Bus.$on('updateQuery', () => {
      this.searches = loadSearch()
      this.isShow = false
    })

    Bus.$on('showData', () => {
      console.log(this.searches)
      if (this.searches.length > 0) {
        this.isShow = true
      }
    })

    Bus.$on('hideData', () => {
      this.isShow = false
    })
  },
  methods: {
    click () {
      this.searches = loadSearch()
      console.log(this.searches, 11)
    },
    onSearch (query) {
      this.isShow = false
      Bus.$emit('searchQuery', query)
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/variable"

  .search-box
    padding 0.09rem 0.1rem
    box-sizing border-box
    background $color-background
    box-shadow 0px 2px 5px 0px #aaa
    .title
      font-size $font-size-medium
    .list
      display flex
      flex-wrap wrap
      .item
        max-width 100%
        margin .1rem .1rem 0 0
        padding .06rem .12rem
        border-radius .14rem
        background $color-background-d
        text-align center
        box-sizing border-box
        font-size $font-size-medium
        color $color-text-list
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
</style>
