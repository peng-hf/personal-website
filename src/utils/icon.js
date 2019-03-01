import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faHome,
  faUser,
  faCode,
  faToolbox,
  faEnvelope,
  faBars
} from '@fortawesome/free-solid-svg-icons'
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default () => {
  library.add(
    faHome,
    faUser,
    faCode,
    faToolbox,
    faEnvelope,
    faBars,

    faLinkedin,
    faGithub
  )
  Vue.component('font-awesome-icon', FontAwesomeIcon)
}
