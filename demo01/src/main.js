import Vue from 'vue'

import _ from 'lodash'
import Layout from './components/layout.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import IndexPage from './pages/index.vue'
import DetailPage from './pages/detail.vue'
import DetailAnaPage from './pages/detail/analysis.vue'
import DetailCouPage from './pages/detail/count.vue'
import DetailForPage from'./pages/detail/forecast.vue'
import DetailPubPage from './pages/detail/publish.vue'
import OrderList from './pages/orderList.vue'


Vue.use(VueResource)
Vue.use(VueRouter)
let router=new VueRouter({
  mode:'history',
  routes:[
    {
      path:'/',
      component:IndexPage
    },
    {
      path:'/orderList',
      component: OrderList
    },
    {
      path:'/detail',
      component:DetailPage,
      redirect:'/detail/count',
      children: [
        {
          path: 'analysis',
          component : DetailAnaPage
        },
        {
          path: 'count',
          component : DetailCouPage
        },
        {
          path: 'forecast',
          component : DetailForPage
        },
        {
          path: 'publish',
          component : DetailPubPage
        }
      ]
    }
  ]
})



new Vue({
  el: '#app',
  router,
  template: '<Layout/>',
  components: { Layout }
})
