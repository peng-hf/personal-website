import Vue from 'vue'
import EvaIcons from 'vue-eva-icons'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

import '@/sass/vendors/index.scss'
import '@/sass/base/index.scss'

Vue.config.productionTip = false
Vue.use(EvaIcons)

store.dispatch('window/register')

const vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#root')

if (process.env.NODE_ENV !== 'production') {
  window.vue = vue
}
