<template>
  <div id="app">
    <transition name="fade">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import './common/js/t-rem'
export default {
  name: 'App'
}
</script>

<style>
@import url(./common/css/reset.css);

 .fade-enter-active, .fade-leave-active {
    transition: all .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
    transform: translateX(100%);
  }
  /* .fade-leave-to{
    opacity: 0;
    transform: translateX(-100%);
  } */
  #app{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #000;
  }

</style>
