<template>
  <form @submit="submitForm" novalidate="true" class="form">
    <div class="input-wrapper" :class="{ valid: isEmailValid }">
      <input
        ref="emailInput"
        v-model="email"
        :placeholder="t('contact.email')"
        type="email"
      />
    </div>
    <div class="input-wrapper" :class="{ valid: !!name }">
      <input v-model="name" :placeholder="t('contact.name')" />
    </div>
    <div class="input-wrapper" :class="{ valid: !!message }">
      <textarea v-model="message" :placeholder="t('contact.message')" />
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
          <ContactSpinIcon v-if="status === STATUS.LOADING" key="loader" />
          <i
            class="eva eva-checkmark-outline"
            v-else-if="status === STATUS.SUCCESS"
          />
          <i class="eva eva-close-outline" v-else-if="status === STATUS.FAIL" />
          <div v-else-if="status === STATUS.IDLE">
            <i class="eva eva-paper-plane-outline" />
            {{ t('contact.send') }}
          </div>
        </transition>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import emailjs from '@emailjs/browser'
import { notify } from '@kyvg/vue3-notification'

const { t } = useI18n()

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
} as const

type StatusValue = typeof STATUS[keyof typeof STATUS]

const emailInput = ref<HTMLInputElement | null>(null)
const email = ref('')
const name = ref('')
const message = ref('')
const status = ref<StatusValue>(STATUS.IDLE)
const isSending = ref(false)

const isEmailValid = computed(() => validateEmail(email.value))
const isFormValid = computed(() => isEmailValid.value && !!name.value && !!message.value)

function validateEmail(val: string) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(val)
}

function isMobileDevice() {
  return (
    typeof window.orientation !== 'undefined' ||
    navigator.userAgent.indexOf('IEMobile') !== -1
  )
}

function resetForm() {
  email.value = ''
  name.value = ''
  message.value = ''
  emailInput.value?.focus()
}

onMounted(() => {
  if (!isMobileDevice()) {
    emailInput.value?.focus()
  }
})

async function submitForm(e: Event) {
  e.preventDefault()
  status.value = STATUS.LOADING
  isSending.value = true

  const templateParams = {
    reply_to: email.value,
    from_name: name.value,
    to_name: EMAILJS.TO_NAME,
    message_html: message.value
  }

  const notifPayload: Record<string, unknown> = { duration: 4000 }

  emailjs
    .send(EMAILJS.SERVICE_ID, EMAILJS.TEMPLATE_ID, templateParams)
    .then(
      () => {
        status.value = STATUS.SUCCESS
        notifPayload.type = 'success'
        notifPayload.title = t('contact.success-notification.title')
        notifPayload.text = t('contact.success-notification.text')
      },
      () => {
        status.value = STATUS.FAIL
        notifPayload.type = 'error'
        notifPayload.title = t('contact.error-notification.title')
        notifPayload.text = t('contact.error-notification.text')
      }
    )
    .finally(() => {
      notify(notifPayload)
      setTimeout(() => {
        if (status.value === STATUS.SUCCESS) resetForm()
        status.value = STATUS.IDLE
        isSending.value = false
      }, 1500)
    })
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
      opacity: 1;
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
