<template>
  <div class="container">
    <head-title :title="title"></head-title>
    <div class="main">
      <div class="m-container">
            <div class="u-title">学生报名条件</div>
            <p class="u-text">{{ studentText }}</p>
            <router-link tag="div" class="m-btn" to="/student">
              <m-button>马上报名</m-button>
            </router-link>
        </div>
        <div class="m-container">
            <div class="u-title">机构报名条件</div>
            <p class="u-text">{{ organizationText }}</p>
            <router-link tag="div" class="m-btn" to="/organization">
              <m-button>马上报名</m-button>
            </router-link>
        </div>
    </div>

    <footer-nav></footer-nav>
  </div>
</template>

<script>
import HeadTitle from '../head-title/headTitle'
import MButton from '../../base/m-button/m-button'
import FooterNav from '../footer-nav/footer-nav'

export default {
  components: {
    HeadTitle,
    MButton,
    FooterNav
  },
  data () {
    return {
      title: '招募代理轻松赚钱',
      studentText: '我是学生报名条件我是学生报名条件我是学生报名条件我是学生报名条件我是学生报名条件我是学生报名条件我是学生报名条件我是学生报名条件我是学生报名条件',
      organizationText: '我是学生报名条件我是学生报名条件我是学生报名条件我是学生报名条件我是学生报名条件我是学生报名条件我是学生报名条件我是学生报名条件我是学生报名条件'
    }
  }
}
</script>

<style lang="stylus" scoped>
  .main
    position fixed
    top 44px
    bottom .5rem
    padding .78rem .38rem 0
    background #F9C3AB
    .m-container
      padding-bottom .26rem
    .u-title
      padding-bottom .2rem
      text-align center
    .u-text
      padding-bottom .2rem
      line-height .24rem
      font-size .14rem
      color #000
    .m-btn
      text-align center
</style>
