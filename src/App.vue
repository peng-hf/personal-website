<template>
  <div :class="`theme-${theme} full-height full-width`">
    <div class="app full-height full-width">
      <navigation />
      <btn-floating class="app__btn-floating"></btn-floating>
      <router-view />
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation'
import FloatingButton from '@/components/FloatingButton'
import { mapState } from 'vuex'
export default {
  components: {
    Navigation,
    'btn-floating': FloatingButton
  },
  computed: mapState({
    theme: state => state.theme
  })
}
</script>

<style lang="scss" scoped>
.app {
  display: flex;

  &__btn-floating {
    position: absolute;
    bottom: 2rem;
    right: 2rem;
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
