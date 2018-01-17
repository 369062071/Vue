import Vue from 'vue'
import Router from 'vue-router'
import Initial from '../components/initial/initial'
import Student from '../components/student/student'
import Organization from '../components/organization/organization'
import Start from '../components/start/start'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/initial',
      component: Initial
    },
    {
      path: '/student',
      component: Student
    },
    {
      path: '/organization',
      component: Organization
    },
    {
      path: '/start',
      component: Start
    },
    {
      path: '/',
      redirect: '/initial'
    }
  ]
})
