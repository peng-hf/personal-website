<template>
  <div :class="['loading-container', { backward: !isAnimating }]">
    <transition
      :name="`slide-${direction}`"
      enter-active-class="slide-active"
      leave-active-class="slide-active"
      @after-enter="afterEnterSlide"
      @before-leave="beforeLeaveSlide"
      @after-leave="afterLeaveSlide"
    >
      <div class="page full-width full-height" v-if="show">
        <div class="loader">
          <div class="loader__logo">필</div>
          <i18n-t keypath="loading" tag="div" class="loader__text" scope="global">
            <template #page>
              <b>{{ formatName($t('navigation.' + toPageName)) }}</b>
            </template>
          </i18n-t>
          <div class="loader__bar">
            <transition name="loading" @after-enter="afterEnterLoading">
              <div class="loader__bar__inner" v-if="loading"></div>
            </transition>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
const direction = ref('')
const show = ref(false)
const isAnimating = ref(false)
const toPageName = ref('')
const loading = ref(false)
let cb: ((state: string) => void) | null = null

function formatName(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1)
}

function load(dir: string, pageName: string, callback: (state: string) => void) {
  direction.value = dir
  isAnimating.value = true
  show.value = true
  toPageName.value = pageName
  cb = callback
}

function afterEnterSlide() {
  cb?.('after-enter')
  loading.value = true
}

function afterEnterLoading() {
  show.value = false
}

function beforeLeaveSlide() {
  cb?.('before-leave')
}

function afterLeaveSlide() {
  cb?.('after-leave')
  reset()
}

function reset() {
  direction.value = ''
  show.value = false
  isAnimating.value = false
  toPageName.value = ''
  loading.value = false
  cb = null
}

defineExpose({ load })
</script>

<style lang="scss" scoped>
$timing-slide: 0.5s;
$timing-loading: 1s;

%bar-size {
  height: 0.5rem;
  @include respond-to('large', 'medium') {
    width: 35rem;
  }
  @include respond-to('small') {
    width: 29rem;
  }
}

.backward {
  z-index: -1;
}

.loading-container {
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  width: 100vw;
  height: 100vh;

  @include respond-to('large') {
    padding-left: $navbar-size;
  }

  @include respond-to('medium', 'small') {
    padding-top: $navbar-size;
    height: var(--w-inner-height, 1vh);
  }
}

.page {
  display: flex;
  justify-content: center;
  align-items: center;

  @include themify {
    background: themed('primary-background-color');
  }
}

.loader {
  text-align: center;
  padding-bottom: 8rem;
  @include themify {
    color: themed('primary-text-color');
  }

  &__logo {
    font-size: 2rem;
  }

  &__text {
    margin: 1.2rem 0;
    font-size: 1.4rem;
    font-family: 'PT Sans', sans-serif;
  }

  &__bar {
    position: relative;
    @extend %bar-size;
    @include themify {
      background: themed('primary-text-color-10');
    }

    &__inner {
      position: absolute;
      top: 0;
      left: 0;
      @extend %bar-size;

      @include themify {
        background: themed('primary-brand-color');
      }
    }
  }
}

// Vue transition animations
.loading-enter-active,
.loading-leave-active {
  transition: width $timing-loading ease-out;
}

.loading-enter-from {
  width: 0;
}
.loading-enter-to {
  @extend %bar-size;
}

.slide-active {
  transition: transform $timing-slide ease;
}

.slide-down-enter-from,
.slide-up-leave-to {
  transform: translateY(-100%);
}

.slide-down-leave-to,
.slide-up-enter-from {
  transform: translateY(100%);
}

.slide-right-enter-from,
.slide-left-leave-to {
  transform: translateX(-100%);
}

.slide-right-leave-to,
.slide-left-enter-from {
  transform: translateX(100%);
}
</style>
