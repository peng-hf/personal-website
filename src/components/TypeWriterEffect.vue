<template>
  <div class="text-area" ref="text">{{ typingText }}</div>
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
      default: 'Hello world'
    }
  },
  data: () => ({
    typingText: ''
  }),
  async mounted() {
    await waitFor(2000)
    for (let i = 0; i < this.text.length; ++i) {
      const char = this.text[i]
      await waitFor(200)
      this.typingText += char
    }
    this.$refs.text.style.animationPlayState = 'paused'
  }
}
</script>

<style lang="scss" scoped>
.text-area {
  animation: blink 0.9s step-end infinite;
  border-right: 0.4rem solid red;
  height: 6rem;
  @include themify {
    padding-right: 0.3rem;
  }
}

@keyframes blink {
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: red;
  }
}
</style>
