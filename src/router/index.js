import Vue from 'vue'
import Router from 'vue-router'
import Exchange from '@/components/Exchange'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/exchange',
      name: 'Exchange',
      component: Exchange
    },
    { path: '*', redirect: '/exchange' }
  ]
})
