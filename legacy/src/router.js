import Vue from 'vue'
import Router from 'vue-router'
import { sync } from 'vuex-router-sync'

import store from '@/store'
import { ROUTE } from '@/constants'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: ROUTE.HOME.PATH,
      name: ROUTE.HOME.NAME
    },
    {
      path: ROUTE.ABOUT.PATH,
      name: ROUTE.ABOUT.NAME
    },
    {
      path: ROUTE.SKILLS.PATH,
      name: ROUTE.SKILLS.NAME
    },
    {
      path: ROUTE.WORKS.PATH,
      name: ROUTE.WORKS.NAME
    },
    {
      path: ROUTE.CONTACT.PATH,
      name: ROUTE.CONTACT.NAME
    }
  ]
})

sync(store, router)

export default router
