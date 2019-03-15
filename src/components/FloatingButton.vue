<template>
  <div
    :class="['floating', { 'floating--expanded': isExpanded }]"
    v-click-outside="onClickOutside"
  >
    <div class="floating__content">
      <div class="floating__content__inner">
        <slot></slot>
      </div>
    </div>

    <button class="floating__btn" @click="isExpanded = !isExpanded">
      <transition name="rotation-fade" mode="out-in">
        <eva-icon
          :name="isExpanded ? 'close-outline' : 'settings-outline'"
          width="28"
          height="28"
          :key="isExpanded ? 'close' : 'settings'"
        ></eva-icon>
      </transition>
    </button>
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside'

export default {
  data: () => ({
    isExpanded: false
  }),
  methods: {
    onClickOutside() {
      if (this.isExpanded) {
        this.isExpanded = false
      }
    }
  },
  directives: {
    clickOutside: vClickOutside.directive
  }
}
</script>

<style lang="scss" scoped>
.floating {
  $root: &;
  position: relative;
  &__btn,
  &__content {
    @include themify {
      background: themed('secondary-background-color');
    }
  }

  &__btn {
    // Reset
    padding: 0;
    border: none;
    cursor: pointer;
    font: inherit;
    background-color: transparent;
    color: inherit;

    // Styling
    position: absolute;
    right: 0;
    bottom: 0;
    height: 6.3rem;
    width: 6.3rem;
    border-radius: 5rem;
    &:focus {
      outline: 0;
    }

    transition: fill 0.4s ease;
    @include themify {
      fill: themed('primary-text-color');
    }
    &:hover {
      @include themify {
        fill: themed('primary-brand-color');
      }
    }
  }

  &__content {
    height: 6.3rem;
    width: 6.3rem;
    border-radius: 5rem;
    box-shadow: 0 0 0.7rem 0 rgba(0, 0, 0, 0.75);
    padding-bottom: 6.3rem; // btn height
    overflow: hidden;
    transition: all 0.5s ease;
    transition-property: width height;

    &__inner {
      opacity: 0;
      transition: opacity 1s ease;
    }
    #{$root}--expanded &__inner {
      opacity: 1;
    }

    #{$root}--expanded & {
      height: 25rem;
      width: 20rem;
      border-radius: 1rem;
    }
  }
}
</style>
