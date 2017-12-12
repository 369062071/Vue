import Vue from 'vue'
import Router from 'vue-router'
import Reacommend from '../components/recommend/recommend'
import Singer from '../components/singer/singer.vue'
import Rank from '../components/rank/rank.vue'
import Search from '../components/searach/search.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/recommend',
      component: Reacommend
    },
    {
      path: '/singer',
      component: Singer
    },
    {
      path: '/rank',
      component: Rank
    },
    {
      path: '/search',
      component: Search
    }
  ]
})
