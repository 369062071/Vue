<template>
  <div class="search-box">
    <div class="input-container">
      <em class="search-icon"></em>
      <input
        class="search-input"
        :placeholder="placeholder"
        @focus="focus"
        v-model="query"
        type="text"
      >
      <button class="search-btn" type="button" @click="onSubmit">搜索</button>
    </div>
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
  created () {
    Bus.$on('searchQuery', query => {
      this.query = query
    })
  },
  methods: {
    focus () {
      console.log('获得了焦点')
      Bus.$emit('categoryHide') // 隐藏分类
      Bus.$emit('showData') // 显示搜索历史
    },
    onSubmit () {
      if (this.query === '') {
        return
      }
      console.log(this.query)
      window.location.href = 'https://ai.m.taobao.com/search.html?q=' + this.query + '&pid=mm_130388949_42628004_245686860'
      saveSearch(this.query) // 保存搜索记录
      Bus.$emit('updateQuery', this.query)
    }
  }
}
</script>

<style lang="stylus">
  @import "../../common/stylus/variable"

  .search-save
    position relative
    color #000
    z-index 11
  .input-container
    display flex
    justify-content center
    align-items center
    position relative
    height 100%
    border-radius .5rem
    background $color-background
    .search-icon
      display block
      width .2rem
      height .2rem
      margin-left .1rem
      background url(../../images/search-icon.png) no-repeat
      background-size .2rem .2rem
    .search-input
      flex-grow 1
      margin 0 .05rem
      outline none
      font-size $font-size-medium
    .search-btn
      height .34rem
      padding 0 .15rem
      outline none
      border none
      border-left 1px solid $color-border
      font-size $font-size-medium-x
      color $color-theme
      background transparent
</style>
