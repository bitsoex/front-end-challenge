import Vue from 'vue'
import Router from 'vue-router'
import Market from '@/components/Market'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Market',
      component: Market
    },
    { path: '*', redirect: '/' }
  ]
})
