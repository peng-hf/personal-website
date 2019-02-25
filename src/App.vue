<template>
  <div :class="`theme-${$store.state.theme} full-height full-width`">
    <div id="app" class="full-height full-width">
      <navigation />
      <router-view />
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation'
export default {
  components: { Navigation }
}
</script>

<style lang="scss" scoped>
#app {
  display: flex;
  @include respond-to('small', 'medium') {
    flex-direction: column;
  }
  @include themify {
    background-color: themed('primary-background-color');
    color: themed('primary-text-color');
  }
}
</style>
