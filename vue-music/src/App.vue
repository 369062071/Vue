<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <!-- router-view 承载子路由 -->
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import MHeader from './components/m-header/m-header'
import Tab from './components/tab/tab'
import Player from './components/player/player'

export default {
  components: {
    MHeader,
    Tab,
    Player
  }
}
</script>

<style  lang="stylus">
  @import './common/stylus/reset';
  @import './common/stylus/icon';
</style>

