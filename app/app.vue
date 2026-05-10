<template>
  <div :class="['theme-' + themeStore.value, 'full-height', 'full-width']" id="root-rendered">
    <NuxtRouteAnnouncer />
    <div class="app full-height full-width" ref="appRef">
      <Notifications position="top center" classes="custom-vue-notification" width="350" />
      <Navigation :disable-click="disableNavigation" />
      <div :class="['app__content', { 'app__content--scale': scaleView }]">
        <NuxtPage />
        <Settings v-if="settingsVisible" />
      </div>
    </div>
    <LoadingOverlay ref="loadingOverlay" />
  </div>
</template>

<script setup lang="ts">
import { compareRoutePos } from '~/utils/routes'
import { waitFor } from '~/utils/wait-for'

const themeStore = useThemeStore()
const windowStore = useWindowStore()
const router = useRouter()

const appRef = ref<HTMLElement | null>(null)
const loadingOverlay = ref<{ load: (dir: string, pageName: string, cb: (state: string) => void) => void } | null>(null)
const scaleView = ref(false)
const disableNavigation = ref(false)
const settingsVisible = ref(true)

onMounted(() => {
  windowStore.register()

  const appStyle = getComputedStyle(appRef.value!)
  let timingRaw = appStyle.getPropertyValue('--timing-content').trim()
  // strip trailing 'ms'
  const timingMs = Number(timingRaw.slice(0, -2))

  router.beforeEach(async (to, from) => {
    if (!from.name) return // skip initial load

    settingsVisible.value = false
    scaleView.value = true
    disableNavigation.value = true
    await waitFor(timingMs)

    const cmp = compareRoutePos(String(from.name), String(to.name))
    const direction = windowStore.isLarge
      ? cmp === 1 ? 'up' : 'down'
      : cmp === 1 ? 'left' : 'right'

    // Block navigation until overlay enters and loading bar finishes
    await new Promise<void>(resolve => {
      loadingOverlay.value!.load(direction, String(to.name), (state: string) => {
        if (state === 'before-leave') {
          resolve() // navigation proceeds; Nuxt renders the new page
        }
        if (state === 'after-leave') {
          scaleView.value = false
          disableNavigation.value = false
          settingsVisible.value = true
        }
      })
    })
  })
})
</script>

<style lang="scss" scoped>
.app {
  display: flex;
  --timing-content: 300ms;

  &__content {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;

    transition: all var(--timing-content) ease;
    transition-property: transform, opacity;
    &--scale {
      transform: scale(0.9);
      opacity: 0.1;
    }
  }

  @include respond-to('small', 'medium') {
    flex-direction: column;
  }
  @include themify {
    background-color: themed('primary-background-color');
    color: themed('primary-text-color');
  }
}
</style>
