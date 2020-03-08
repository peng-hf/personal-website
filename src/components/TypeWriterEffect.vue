<template>
  <div class="container">
    <span class="text" ref="text" v-if="show">{{ typingText }}</span>
  </div>
</template>

<script>
function waitFor(ms = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}
export default {
  props: {
    text: {
      type: String,
      default: 'Put your text here..'
    },
    blinkingDelay: {
      type: Number,
      default: 0
    },
    delay: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    typingText: '',
    show: false
  }),
  async mounted() {
    await waitFor(this.delay)
    this.show = true
    await waitFor(this.blinkingDelay)
    this.$refs.text.style.animationIterationCount = 0
    await waitFor(this.typingStartDelay)
    for (let i = 0; i < this.text.length; ++i) {
      const char = this.text[i]
      await waitFor(75)
      this.typingText += char
    }
    this.$refs.text.style.animationPlayState = 'paused'
    this.$refs.text.style.border = 'transparent'
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 6rem;
  padding-right: 0.2rem;
}

.text {
  border-right: 0.4rem solid white;
  animation: blink 0.75s step-end infinite;
}

@keyframes blink {
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: white;
  }
}
</style>
