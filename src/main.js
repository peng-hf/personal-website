import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

import '@/sass/vendors/index.scss'
import '@/sass/base/index.scss'

Vue.config.productionTip = false

store.dispatch('window/register')

const vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#root')

if (process.env.NODE_ENV !== 'production') {
  window.vue = vue
}
