import Vue from 'vue'
import Vuex from 'vuex'

import window from '@/store/window'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    theme: 'dark'
  },
  mutations: {},
  actions: {},
  modules: { window }
})
