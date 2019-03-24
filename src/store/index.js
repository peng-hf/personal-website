import Vue from 'vue'
import Vuex from 'vuex'

import window from '@/store/window'
import { THEME } from '@/constants'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    theme: THEME.DARK
  },
  mutations: {
    theme(state, payload) {
      state.theme = payload
    }
  },
  actions: {},
  modules: { window }
})
