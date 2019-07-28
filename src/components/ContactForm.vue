<template>
  <form @submit="submitForm" novalidate="true">
    <input v-model="email" placeholder="email" type="email" ref="email-input" />
    <input v-model="subject" placeholder="subject" />
    <textarea v-model="message" placeholder="message" />

    <div class="btn-wrapper">
      <button
        type="submit"
        :class="{ active: isFormValid }"
        :disabled="!isFormValid"
      >
        <transition name="fade" mode="out-in">
          <spin-icon v-if="loading" key="loader" />
          <div v-else>
            <eva-icon
              width="15"
              height="15"
              name="paper-plane-outline"
              key="sender"
            />
            send
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

export default {
  data: () => ({
    email: '',
    subject: '',
    message: '',
    loading: false
  }),
  mounted() {
    this.$refs['email-input'].focus()
  },
  computed: {
    isFormValid() {
      return validateEmail(this.email) && this.subject && this.message
    }
  },
  methods: {
    submitForm(e) {
      e.preventDefault()
      this.loading = !this.loading
    }
  },
  components: { SpinIcon }
}
</script>
<style lang="scss" scoped>
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
    @include themify {
      opacity: 0.7;
      text-transform: uppercase;
      color: themed('primary-text-color');
      font-weight: 600;
      letter-spacing: 0.1rem;
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
  text-align: right;
}

button {
  @include button-reset;
  height: 5rem;
  width: 10rem;
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
