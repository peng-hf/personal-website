<template>
  <div
    :class="['floating', { 'floating--expanded': isExpanded }]"
    v-click-outside="onClickOutside"
  >
    <div class="floating__content">
      <transition name="fade">
        <template v-if="isExpanded">
          <slot></slot>
        </template>
      </transition>
    </div>

    <!-- Button is layout as an overlay over floating__content -->
    <button class="floating__btn" @click="onClickBtn">
      <transition name="rotation-fade" mode="out-in">
        <div v-if="isExpanded" key="close">
          <i class="eva eva-close-outline" />
        </div>
        <div v-else key="settings">
          <i class="eva eva-settings-2-outline" />
        </div>
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
    onClickBtn() {
      this.isExpanded = !this.isExpanded
    },
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
$btn-dimension: 6.3rem;
$btn-radius: 5rem;

$expand-height: 22rem;
$expand-width: 18rem;
$expand-border-radius: 0.5rem;

$timing-expand: 0.5s;
$timing-hover: 0.4s;
$timing-content: 0.2s;

.floating {
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
    height: $btn-dimension;
    width: $btn-dimension;
    border-radius: $btn-radius;
    transition: color $timing-hover ease;
    font-size: 2.6rem;

    &:focus {
      outline: none;
    }
    @include themify {
      color: themed('primary-text-color');
    }
    @include respond-to('large', 'medium') {
      @include themify {
        &:hover {
          color: themed('primary-brand-color');
        }
      }
    }
  }

  &__content {
    height: $btn-dimension;
    width: $btn-dimension;
    border-radius: $btn-radius;
    box-shadow: 0 0 0.5rem 0 rgba(0, 0, 0, 0.75);
    padding-bottom: $btn-dimension;
    overflow: hidden;
    transition: all $timing-expand ease;
    transition-property: width height;
  }

  &--expanded &__content {
    height: $expand-height;
    width: $expand-width;
    border-radius: $expand-border-radius;
  }
}
// Vue transitions animations
.fade-enter-active {
  transition: opacity $timing-content $timing-expand ease;
}
.fade-enter {
  opacity: 0;
}
</style>
