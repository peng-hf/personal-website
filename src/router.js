import Vue from 'vue'
import Router from 'vue-router'
import { sync } from 'vuex-router-sync'

import store from '@/store'
import Home from '@/views/Home.vue'
import { ROUTE } from '@/constants'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: ROUTE.HOME.PATH,
      name: ROUTE.HOME.NAME,
      component: Home
    },
    {
      path: ROUTE.ABOUT.PATH,
      name: ROUTE.ABOUT.NAME,
      component: {
        render: h => h('div', 'about')
      }
    },
    {
      path: ROUTE.SKILLS.PATH,
      name: ROUTE.SKILLS.NAME,
      component: {
        render: h => h('div', 'skills')
      }
    },
    {
      path: ROUTE.WORKS.PATH,
      name: ROUTE.WORKS.NAME,
      component: {
        render: h => h('div', 'works')
      }
    },
    {
      path: ROUTE.CONTACT.PATH,
      name: ROUTE.CONTACT.NAME,
      component: {
        render: h => h('div', 'contact')
      }
    }
  ]
})

sync(store, router)

export default router
