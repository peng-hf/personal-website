<template>
  <!-- Add zero width space &#8203; char to make the cursor visible before typing -->
  <component
    :is="tag"
    class="text"
    ref="text"
    :class="{ 'border-transparent': hideCursor }"
    :style="{ borderWidth: this.cursorWidth + 'px' }"
    >&#8203;{{ typingText }}
  </component>
</template>

<script>
import { waitFor } from '@/utils'

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
    startTypingDelay: {
      // Before start typing
      type: Number,
      default: 0
    },
    keystrokeDelay: {
      type: Number,
      default: 50
    },
    tag: {
      type: String,
      default: 'div'
    },
    manual: {
      type: Boolean,
      default: false
    },
    id: String,
    cursorWidth: {
      type: Number,
      default: 4
    }
  },
  watch: {
    text(val) {
      if (this.hasFinishedTyping) this.typingText = val
    }
  },
  data: () => ({
    initialText: '',
    typingText: '',
    hideCursor: false,
    hasFinishedTyping: false
  }),
  created() {
    this.initialText = this.text
  },
  async mounted() {
    if (!this.manual) this.run()
    else this.hideCursor = true
  },
  methods: {
    async run() {
      if (this.hideCursor) this.hideCursor = false
      await waitFor(this.blinkingDelay)
      this.hideCursor = true
      await waitFor(this.startTypingDelay)
      this.hideCursor = false
      // Start typing animation
      this.$refs.text.style.animationIterationCount = 0 // Block cursor
      for (const c of this.initialText) {
        await waitFor(this.keystrokeDelay)
        this.typingText += c
      }
      this.hideCursor = true
      this.hasFinishedTyping = true
      this.$emit('done', this.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.text {
  padding-right: 0.2rem;
  border-right-style: solid;
  border-right-color: inherit;
  animation: blink 0.7s step-end infinite;
}

.border-transparent {
  border: transparent;
}

@keyframes blink {
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: inherit;
  }
}
</style>
