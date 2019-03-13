<template>
  <router-link
    :class="['btn', { 'btn--selected': enter }]"
    @mouseover.native="enter = true"
    @mouseout.native="enter = false"
    :to="to"
  >
    <span class="btn__stroke" v-if="isLargeLayout"></span>
    <slot>Submit</slot>
  </router-link>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    to: String
  },
  data: () => ({
    enter: false
  }),
  computed: {
    ...mapGetters({
      isLargeLayout: 'window/isLarge'
    })
  }
}
</script>

<style lang="scss" scoped>
.btn {
  $btn_ref: &;

  // Reset
  padding: 0;
  border: none;
  cursor: pointer;
  font: inherit;
  background-color: transparent;
  color: inherit;

  // Styling
  position: relative;
  padding: 1.2rem 2.5rem;
  border-style: solid;
  border-width: 0.1rem;
  font-family: 'Open Sans';
  font-size: 1.4rem;
  font-weight: 600;
  letter-spacing: 0.1rem;
  text-transform: uppercase;
  text-decoration: none;
  @include themify {
    border-color: themed('primary-text-color');
  }
  @include respond-to('small') {
    font-size: 1.2rem;
    padding: 1rem 2rem;
  }

  &:hover {
    background: white;
    color: black;
  }

  &__stroke {
    position: absolute;
    height: 0.1rem;
    width: 2rem;
    top: 50%;
    left: -1rem;
    transition: all 0.1s ease-in;
    transition-property: transform opacity;
    #{$btn_ref}--selected & {
      transform: translateX(0.8rem);
      opacity: 0;
    }
    @include themify {
      background: themed('primary-text-color');
    }
  }
}
</style>
