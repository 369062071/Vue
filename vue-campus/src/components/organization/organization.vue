<template>
  <transition name="fade">
    <div>
      <head-title :title="title"></head-title>
      <div class="main">
        
      </div>
    </div>
  </transition>
</template>

<script>
import HeadTitle from '../head-title/headTitle'
import MButton from '../../base/m-button/m-button'

export default {
  components: {
    HeadTitle,
    MButton
  },
  data () {
    return {
      title: '机构报名表'
    }
  }
}
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: all .5s;
    transform: translateX(100%)
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0;
  }
</style>
