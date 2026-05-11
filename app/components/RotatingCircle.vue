<template>
  <div class="circle" :style="{ width: width + '%' }" ref="circleEl">
    <template v-if="ready">
      <slot></slot>
    </template>
  </div>
</template>

<script setup lang="ts">
import throttle from 'lodash.throttle'

withDefaults(defineProps<{
  width?: number
}>(), {
  width: 100
})

const circleEl = ref<HTMLElement | null>(null)
const clientWidth = ref(0)
const ready = ref(false)

const radius = computed(() => clientWidth.value / 2)
const centerPosition = computed(() => ({ x: radius.value, y: radius.value }))

let nextIndex = 0
const totalItems = ref(0)

function register() {
  totalItems.value++
  return nextIndex++
}

provide('circleContext', { radius, centerPosition, totalItems, register })

let resizeListener: (() => void) | null = null

onMounted(() => {
  clientWidth.value = circleEl.value!.clientWidth
  resizeListener = throttle(() => {
    clientWidth.value = circleEl.value!.clientWidth
  }, 500)
  window.addEventListener('resize', resizeListener)
  ready.value = true
})

onUnmounted(() => {
  if (resizeListener) window.removeEventListener('resize', resizeListener)
})
</script>

<style lang="scss" scoped>
.circle {
  position: relative;
  border-radius: 50%;

  &:before {
    content: '';
    display: block;
    padding-top: 100% !important;
  }
}
</style>
