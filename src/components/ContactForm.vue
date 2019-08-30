<template>
  <form @submit="submitForm" novalidate="true">
    <input
      v-model="email"
      :placeholder="$t('contact.email')"
      type="email"
      ref="email-input"
      :class="{ valid: isEmailValid }"
    />
    <input
      v-model="subject"
      :placeholder="$t('contact.subject')"
      :class="{ valid: !!subject }"
    />
    <textarea
      v-model="message"
      :placeholder="$t('contact.message')"
      :class="{ valid: !!message }"
    />

    <div class="btn-wrapper">
      <button
        type="submit"
        :class="{ active: isFormValid }"
        :disabled="!isFormValid"
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

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
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
    subject: '',
    message: '',
    status: STATUS.IDLE,
    STATUS
  }),
  mounted() {
    this.$refs['email-input'].focus()
  },
  computed: {
    isEmailValid() {
      return validateEmail(this.email)
    },
    isFormValid() {
      return this.isEmailValid && this.subject && this.message
    }
  },
  methods: {
    async submitForm(e) {
      e.preventDefault()
      this.status = STATUS.LOADING
      setTimeout(() => {
        this.status = STATUS.SUCCESS
      }, 1500)
    }
  },
  components: { SpinIcon }
}
</script>
<style lang="scss" scoped>
i.eva-checkmark-outline,
i.eva-close-outline {
  font-size: 2.6rem;
}

form {
  font-size: 1.3rem;
}
input,
textarea {
  display: block;
  width: 100%;
  border: 0;
  margin: 1.2rem 0;
  padding: 0 1.8rem;
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

.btn-wrapper {
  @include respond-to('medium', 'large') {
    text-align: right;
  }
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
}
</style>
