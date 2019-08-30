import Vue from 'vue'

import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import i18n from '@/i18n'

import '@/sass/vendors/index.scss'
import '@/sass/base/index.scss'
import 'eva-icons/style/eva-icons.css'

Vue.config.productionTip = false

store.dispatch('window/register')

const vue = new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#root')

if (process.env.NODE_ENV !== 'production') {
  window.vue = vue
}
