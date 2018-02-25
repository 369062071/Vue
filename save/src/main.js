// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import VueAxiops from 'vue-axios'
import router from './router'
import 'babel-polyfill'
import '@/common/js/t-rem'
// import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.use(VueAxiops, axios)
Vue.config.productionTip = false

Vue.use(VueLazyLoad, {
  loading: require('./images/default.png')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
