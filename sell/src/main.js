import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Goods from './components/goods/goods.vue'
import Ratings from './components/ratings/ratings.vue'
import Seller from './components/seller/seller.vue'

Vue.use(VueRouter)
Vue.use(VueResource)

let router = new VueRouter({
    linkActiveClass:'active',
   mode: "history",
   routes:[
       {
         path:'/goods',
         component: Goods
       },
       {
           path:'/ratings',
           component: Ratings
       },
       {
           path:'/seller',
           component: Seller
       }
   ]
});


new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})
