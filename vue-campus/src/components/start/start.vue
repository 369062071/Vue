<template>
  <div>
    <head-title :title="title"></head-title>
    <div class="main">
      <div class="u-bg"></div>
        <p class="u-text">恭喜你！成为一名赚钱小能手！</p>
        <button type="botton" class="btn-start">开始赚钱</button>
    </div>
  </div>
</template>

<script>
import HeadTitle from '../head-title/headTitle'

export default {
  components: {
    HeadTitle
  },
  data () {
    return {
      title: '报名成功'
    }
  }
}
</script>

<style scoped>
  .main{
    position: fixed;
    top: 44px;
    bottom: 0;
    width: 100%;
    background: #F9C3AB;
  }
  .u-bg{
    width: 2.10rem;
    height: 1.7rem;
    margin: 0 auto .32rem;
    background: url(http://oss.lanlanlife.com/10aea2a971bb16b457c648a895b724cb_342x422.png);
    background-size: 100% 1.7rem;
}
.u-text{
    margin-bottom: .32rem;
    text-align: center;
    font-size: .16rem;
    color: #414244;
}
.btn-start{
    width: 100%;
    padding: .16rem 0 .14rem;
    border-radius: 22px;
    border: none;
    font-size: .14rem;
    color: #fff;
    background: #F6704F;
}
</style>
