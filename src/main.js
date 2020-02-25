import Vue from 'vue'
import Notifications from 'vue-notification'
import * as emailjs from 'emailjs-com'

import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import i18n from '@/i18n'

import '@/sass/vendors/index.scss'
import '@/sass/base/index.scss'
import 'eva-icons/style/eva-icons.css'

emailjs.init('user_bOf6WS7M9nazVfWJzK0VI')

Vue.config.productionTip = false
Vue.use(Notifications, {
  componentName: 'VueNotifications'
})

store.dispatch('window/register')
if (process.env.NODE_ENV === 'development') {
  /*
    During webpack build process in prod mode, all pages are prerendered
    Vue hydrates the DOM to make the app interactive
    Remove data-server-rendered attribute as whole tree is not prerender in dev mode
  */
  document.getElementById('root').removeAttribute('data-server-rendered')
}

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#root')
