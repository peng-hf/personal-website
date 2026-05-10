import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const value = ref<'dark' | 'white'>('dark')

  function set(v: 'dark' | 'white') {
    value.value = v
  }

  return { value, set }
})
