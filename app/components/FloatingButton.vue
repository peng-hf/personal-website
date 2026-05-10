<template>
  <div ref="el" :class="['floating', { 'floating--expanded': isExpanded }]">
    <div class="floating__content">
      <transition name="fade">
        <template v-if="isExpanded">
          <slot></slot>
        </template>
      </transition>
    </div>

    <button class="floating__btn" @click="onClickBtn" aria-label="settings">
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

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'

const el = ref<HTMLElement | null>(null)
const isExpanded = ref(false)

onClickOutside(el, () => {
  isExpanded.value = false
})

function onClickBtn() {
  isExpanded.value = !isExpanded.value
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
    padding: 0;
    border: none;
    cursor: pointer;
    font: inherit;
    background-color: transparent;
    color: inherit;

    position: absolute;
    right: 0;
    bottom: 0;
    height: $btn-dimension;
    width: $btn-dimension;
    border-radius: $btn-radius;
    transition: color $timing-hover ease;
    font-size: 2.6rem;

    > div {
      display: flex;
      justify-content: center;
      vertical-align: center;
    }

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

.fade-enter-active {
  transition: opacity $timing-content $timing-expand ease;
}
.fade-enter-from {
  opacity: 0;
}
</style>
