import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

import { registerIcons } from '@/utils'
import '@/sass/base/index.scss'

Vue.config.productionTip = false

registerIcons()
store.dispatch('window/register')

const vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#root')

if (process.env.NODE_ENV !== 'production') {
  window.vue = vue
}
