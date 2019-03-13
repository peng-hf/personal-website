import Vue from 'vue'
import Vuex from 'vuex'

import window from '@/store/window'
import { THEME, LANG } from '@/constants'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    theme: THEME.DARK,
    lang: LANG.EN
  },
  mutations: {
    theme(state, payload) {
      state.theme = payload
    },
    lang(state, payload) {
      state.lang = payload
    }
  },
  actions: {},
  modules: { window }
})
