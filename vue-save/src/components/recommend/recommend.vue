<template>
  <div class="recommend">
    <product-list @clipboardShow="clipboardShow"></product-list>
    <m-clipboard :isShowCode="isShowCode" @isHideCopy="isHideCopy"></m-clipboard>
  </div>
</template>

<script>
import MClipboard from '@/components/m-clipboard/m-clipboard'
import ProductList from '@/components/productList/productList'

export default {
  components: {
    MClipboard,
    ProductList
  },
  data () {
    return {
      dataList: [],
      isShowCode: false,
      pullUpLoad: true,
      page: 1
    }
  },
  methods: {
    isHideCopy () {
      this.isShowCode = false
    },
    clipboardShow () {
      this.isShowCode = true
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
