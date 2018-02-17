<template>
  <div class="mf-loading-container">
    <img src="./loading.gif">
  </div>
</template>
<script type="text/ecmascript-6">
const COMPONENT_NAME = 'loading'

export default {
  name: COMPONENT_NAME
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .mf-loading-container
    padding-bottom .1rem
    img
      width: .24rem
      height: .24rem
      display: block
      margin  0 auto
</style>
