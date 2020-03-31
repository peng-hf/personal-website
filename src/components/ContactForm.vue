<template>
  <form @submit="submitForm" novalidate="true" class="form">
    <div class="input-wrapper" :class="{ valid: isEmailValid }">
      <input
        v-model="email"
        :placeholder="$t('contact.email')"
        type="email"
        ref="email-input"
      />
    </div>
    <div class="input-wrapper" :class="{ valid: !!name }">
      <input v-model="name" :placeholder="$t('contact.name')" />
    </div>
    <div class="input-wrapper" :class="{ valid: !!message }">
      <textarea v-model="message" :placeholder="$t('contact.message')" />
    </div>

    <div class="btn-wrapper">
      <button
        type="submit"
        :class="{
          active: isFormValid,
          'disable-events': !isEmailValid || isSending
        }"
      >
        <transition name="fade" mode="out-in">
          <spin-icon v-if="status === STATUS.LOADING" key="loader" />
          <i
            class="eva eva-checkmark-outline"
            v-else-if="status === STATUS.SUCCESS"
          />
          <i class="eva eva-close-outline" v-else-if="status === STATUS.FAIL" />
          <div v-else-if="status === STATUS.IDLE">
            <i class="eva eva-paper-plane-outline" />
            {{ $t('contact.send') }}
          </div>
        </transition>
      </button>
    </div>
  </form>
</template>

<script>
import SpinIcon from '@/components/ContactSpinIcon'
import * as emailjs from 'emailjs-com'
import { setTimeout } from 'timers'

function isMobileDevice() {
  return (
    typeof window.orientation !== 'undefined' ||
    navigator.userAgent.indexOf('IEMobile') !== -1
  )
}

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

const EMAILJS = {
  SERVICE_ID: 'peng_gmail',
  TEMPLATE_ID: 'template_kNakphlQ',
  TO_NAME: 'Philippe Eng'
}

const STATUS = {
  LOADING: 'loading',
  IDLE: 'idle',
  SUCCESS: 'success',
  FAIL: 'fail'
}

export default {
  data: () => ({
    email: '',
    name: '',
    message: '',
    status: STATUS.IDLE,
    STATUS,
    isSending: false
  }),
  mounted() {
    if (!isMobileDevice()) {
      this.$refs['email-input'].focus()
    }
  },
  computed: {
    isEmailValid() {
      return validateEmail(this.email)
    },
    isFormValid() {
      return this.isEmailValid && this.name && this.message
    }
  },
  methods: {
    resetForm() {
      this.email = ''
      this.name = ''
      this.message = ''
      this.$refs['email-input'].focus()
    },
    async submitForm(e) {
      e.preventDefault()
      this.status = STATUS.LOADING
      const templateParams = {
        reply_to: this.email,
        from_name: this.name,
        to_name: EMAILJS.TO_NAME,
        message_html: this.message
      }
      var notifPayload = { duration: 4000 }
      this.isSending = true
      emailjs
        .send(EMAILJS.SERVICE_ID, EMAILJS.TEMPLATE_ID, templateParams)
        .then(
          res => {
            this.status = STATUS.SUCCESS
            notifPayload.type = 'success'
            notifPayload.title = this.$t('contact.success-notification.title')
            notifPayload.text = this.$t('contact.success-notification.text')
          },
          _ => {
            this.status = STATUS.FAIL
            notifPayload.type = 'error'
            notifPayload.title = this.$t('contact.error-notification.title')
            notifPayload.text = this.$t('contact.error-notification.text')
          }
        )
        .finally(() => {
          this.$notify(notifPayload)
          setTimeout(() => {
            // Small delay makes loading anim more realistic in case of super fast connection lol
            if (this.status === STATUS.SUCCESS) this.resetForm()
            this.status = STATUS.IDLE
            this.isSending = false
          }, 1500)
        })
    }
  },
  components: { SpinIcon }
}
</script>
<style lang="scss" scoped>
.form {
  font-size: 1.3rem;
}

.input-wrapper {
  position: relative;
  input,
  textarea {
    display: block;
    width: 100%;
    border: 0;
    margin: 1.2rem 0;
    outline: none;
    opacity: 0.3;
    transition: opacity 0.5s ease;
    @include themify {
      background: themed('primary-text-color-10');
      color: themed('primary-text-color');
    }
    &::placeholder {
      opacity: 0.7;
      text-transform: uppercase;
      font-weight: 600;
      letter-spacing: 0.1rem;
      @include themify {
        color: themed('primary-text-color');
      }
    }
    &:focus {
      opacity: 1;
    }
  }
  input {
    padding: 0 1.8rem;
    height: 3.8rem;
  }
  textarea {
    padding: 1.5rem 1.8rem;
    height: 20rem;
    resize: none;
  }
  &.valid {
    &::after {
      content: '\EA66';
      font-family: 'Eva-Icons';
      position: absolute;
      top: 0.7rem;
      right: 1rem;
      font-size: 2rem;
    }
    input,
    textarea {
      opacity: 1; // Keep the input visible if content valid
    }
  }
}

.btn-wrapper {
  @include respond-to('medium', 'large') {
    text-align: right;
  }
  button {
    @include button-reset;
    height: 5rem;
    width: 11.5rem;
    opacity: 0.3;
    letter-spacing: 0.1rem;
    font-size: 1.4rem;
    transition: opacity 0.5s;
    outline: none;
    @include themify {
      background: themed('primary-text-color-10');
      color: themed('primary-text-color');
      text-transform: uppercase;
    }
    i {
      &.eva-close-outline,
      &.eva-checkmark-outline {
        font-size: 2.8rem;
      }
      margin-right: 0.4rem;
      @include themify {
        fill: themed('primary-text-color');
      }
    }

    & > div {
      display: inline-flex;
      justify-content: center;
      align-items: center;
    }

    &.active {
      opacity: 0.7;
      cursor: pointer;
      &:hover {
        opacity: 1;
      }
    }
    &.disable-events {
      pointer-events: none;
    }
  }
}
</style>
