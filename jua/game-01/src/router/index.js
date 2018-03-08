import Vue from 'vue'
import Router from 'vue-router'
import PrizeList from '@/components/prize-list/prize-list'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/prizeList',
      component: PrizeList
    }
  ]
})
