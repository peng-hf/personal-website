import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import throttle from 'lodash.throttle'

export const useWindowStore = defineStore('window', () => {
  const width = ref(0)
  const height = ref(0)

  const isSmall = computed(() => width.value <= 599)
  const isMedium = computed(() => width.value >= 600 && width.value <= 1050)
  const isLarge = computed(() => width.value >= 1051)

  function update() {
    width.value = globalThis.innerWidth
    height.value = globalThis.innerHeight
    document.body.style.setProperty('--w-inner-height', `${globalThis.innerHeight}px`)
  }

  function register() {
    update()
    globalThis.addEventListener('resize', throttle(update, 100, { leading: true }))
  }

  return { width, height, isSmall, isMedium, isLarge, register }
})
