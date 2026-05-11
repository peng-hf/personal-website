<template>
  <component
    :is="tag"
    class="text"
    ref="textEl"
    :class="{ 'border-transparent': hideCursor }"
    :style="{ borderWidth: cursorWidth + 'px' }"
  >&#8203;{{ typingText }}</component>
</template>

<script setup lang="ts">
import { waitFor } from '~/utils/wait-for'

const props = withDefaults(defineProps<{
  text?: string
  blinkingDelay?: number
  startTypingDelay?: number
  keystrokeDelay?: number
  tag?: string
  manual?: boolean
  id?: string
  cursorWidth?: number
}>(), {
  text: 'Put your text here..',
  blinkingDelay: 0,
  startTypingDelay: 0,
  keystrokeDelay: 50,
  tag: 'div',
  manual: false,
  cursorWidth: 4
})

const emit = defineEmits<{ done: [id: string | undefined] }>()

const textEl = ref<HTMLElement | null>(null)
const typingText = ref('')
const hideCursor = ref(false)
const hasFinishedTyping = ref(false)
const initialText = props.text

watch(() => props.text, (val) => {
  if (hasFinishedTyping.value) typingText.value = val
})

async function run() {
  if (hideCursor.value) hideCursor.value = false
  await waitFor(props.blinkingDelay)
  hideCursor.value = true
  await waitFor(props.startTypingDelay)
  hideCursor.value = false
  if (textEl.value) textEl.value.style.animationIterationCount = '0'
  for (const c of initialText) {
    await waitFor(props.keystrokeDelay)
    typingText.value += c
  }
  hideCursor.value = true
  hasFinishedTyping.value = true
  emit('done', props.id)
}

onMounted(() => {
  if (!props.manual) run()
  else hideCursor.value = true
})

defineExpose({ run })
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
