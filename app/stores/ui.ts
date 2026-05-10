import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  const languageToggleEnabled = ref(true)

  function setLanguageToggleEnabled(v: boolean) {
    languageToggleEnabled.value = v
  }

  return { languageToggleEnabled, setLanguageToggleEnabled }
})
