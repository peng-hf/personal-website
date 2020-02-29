<template>
  <router-link class="btn" :to="to" aria-label="Link to next page">
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
  computed: {
    ...mapGetters({
      isLargeLayout: 'window/isLarge'
    })
  }
}
</script>

<style lang="scss" scoped>
.btn {
  @include button-reset;
  position: relative;
  display: inline-block;
  border-style: solid;
  border-width: 0.1rem;
  font-family: 'Open Sans';
  font-weight: 600;
  letter-spacing: 0.1rem;
  text-transform: uppercase;
  text-decoration: none;
  @include themify {
    color: themed('primary-text-color');
    border-color: themed('primary-text-color');
  }
  @include respond-to('large', 'medium') {
    font-size: 1.4rem;
    padding: 1.2rem 3rem;
  }
  @include respond-to('small') {
    font-size: 1.2rem;
    padding: 1rem 2rem;
  }

  &:hover {
    @include themify {
      background: themed('primary-text-color');
      color: themed('primary-background-color');
    }
  }

  &__stroke {
    position: absolute;
    height: 0.1rem;
    width: 2rem;
    top: 50%;
    left: -1rem;
    transition: all 0.1s ease-in;
    transition-property: transform opacity;
    @include themify {
      background: themed('primary-text-color');
    }
  }

  &:hover &__stroke {
    transform: translateX(0.8rem);
    opacity: 0;
  }
}
</style>
