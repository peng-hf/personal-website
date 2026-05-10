import emailjs from '@emailjs/browser'

export default defineNuxtPlugin(() => {
  emailjs.init({ publicKey: 'user_bOf6WS7M9nazVfWJzK0VI' })
})
