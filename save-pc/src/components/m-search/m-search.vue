<template>
  <div class="search-box">
    <em class="search-icon"></em>
    <input
      class="search-input"
      v-model="query"
      :placeholder="placeholder"
      type="text"
    >
    <button class="search-btn" type="button" @click="onSubmit">搜索</button>
  </div>
</template>

<script>
import {saveSearch} from '@/common/js/cache'
import Bus from '@/bus'

export default {
  props: {
    placeholder: {
      type: String,
      default: '搜索你想要的商品'
    }
  },
  data () {
    return {
      query: ''
    }
  },
  methods: {
    onSubmit () {
      if (this.query === '') {
        return
      }
      console.log(this.query)

      window.location.href = 'https://ai.m.taobao.com/search.html?q=' + this.query
      saveSearch(this.query) // 保存搜索记录
      Bus.$emit('updateQuery', this.query)
    }
  }
}
</script>

<style lang="stylus">
  @import "../../common/stylus/variable"

  .search-box
    width 740px
    height 48px
    margin 0 auto 30px
    border-radius 24px
    border 2px solid $color-theme
    box-sizing border-box
    display flex
    align-items center
    .search-icon
      display block
      width 26px
      height 26px
      margin 0 14px 0 20px
      background url(../../images/search-icon.png) no-repeat
    .search-input
      flex-grow 1
      margin-right 20px
      outline none
      font-size $font-size-medium
    .search-btn
      width 84px
      height 100%
      padding 0
      border-top-right-radius 24px
      border-bottom-right-radius 24px
      outline none
      border none
      font-size $font-size-medium
      color $color-text-white
      background $color-theme
      position relative
      right -3px
</style>
