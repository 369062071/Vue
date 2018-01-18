<template>
    <div class="initial">
      <head-title class="head-title" :title="title"></head-title>
      <div class="main">
        <div class="m-container">
              <div class="u-title">学生报名条件</div>
              <p class="u-text">{{ studentText }}</p>
              <router-link tag="div" class="m-btn" to="/student">
                <button type="button" class="btn-jump">马上报名</button>
              </router-link>
          </div>
          <div class="m-container">
              <div class="u-title">机构报名条件</div>
              <p class="u-text">{{ organizationText }}</p>
              <router-link tag="div" class="m-btn" to="/organization">
                <button type="button" class="btn-jump">马上报名</button>
              </router-link>
          </div>
      </div>

      <footer-nav></footer-nav>
    </div>
</template>

<script>
import HeadTitle from '../head-title/headTitle'
import FooterNav from '../footer-nav/footer-nav'

export default {
  components: {
    HeadTitle,
    FooterNav
  },
  data () {
    return {
      title: '招募代理轻松赚钱',
      studentText: '我是学生报名条件我是学生报名条件我是学生报名条件我是学生报名条件我是学生报名条件我是学生报名条件我是学生报名条件我是学生报名条件我是学生报名条件',
      organizationText: '我是学生报名条件我是学生报名条件我是学生报名条件我是学生报名条件我是学生报名条件我是学生报名条件我是学生报名条件我是学生报名条件我是学生报名条件'
    }
  },
  created () {
    this.axios.get('').then((res) => {
      console.log(res)
    })
  }
}
</script>

<style scoped>
.initial{
  width: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
}
.main{
  flex-grow: 1;
  padding: .78rem .38rem 0;
  background: #F9C3AB
}

.m-container {
  padding-bottom: .26rem;
}

.u-title {
  padding-bottom: .2rem;
  text-align: center;
}

.u-text{
  padding-bottom: .2rem;
  line-height: .24rem;
  font-size:  .14rem;
  color: #000;
}

.m-btn{
  text-align: center;
}

.btn-jump {
  width: 1.6rem;
  margin: 0 auto;
  padding: .14rem 0 .12rem;
  border-radius: 22px;
  border: none;
  font-size: .14rem;
  color: #fff;
  background: #F6704F;
}
</style>
