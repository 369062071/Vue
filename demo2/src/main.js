import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Goods from './components/goods/goods.vue'
import Ratings from './components/ratings/ratings.vue'
import Seller from './components/seller/seller.vue'

Vue.use(VueRouter)
Vue.use(VueAxios,axios)

let router = new VueRouter({
  linkActiveClass: 'active',
  routes: [{
      path: '/goods',
      component: Goods
    },
    {
      path: '/ratings', 
      component: Ratings
    },
    {
      path: '/seller',
      component: Seller
    },
    {
        path:'/',
        redirect:'/goods'
    }
  ]
});



new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})
