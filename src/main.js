import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

import initIcons from '@/utils/icon'
import '@/sass/base/index.scss'

Vue.config.productionTip = false

initIcons()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#root')
