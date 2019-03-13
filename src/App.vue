<template>
  <div :class="`theme-${theme} full-height full-width`">
    <div id="app" class="full-height full-width">
      <navigation />
      <router-view />
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation'
import { mapState } from 'vuex'
export default {
  components: { Navigation },
  computed: mapState({
    theme: state => state.theme
  })
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
