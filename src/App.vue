<template>
  <div :class="`theme-${theme.VALUE} full-height full-width`">
    <div class="app full-height full-width">
      <navigation />
      <router-view />
      <settings />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Navigation from '@/components/Navigation'
import Settings from '@/components/Settings'

export default {
  computed: mapState({
    theme: state => state.theme
  }),
  components: { Navigation, Settings }
}
</script>

<style lang="scss" scoped>
.app {
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
