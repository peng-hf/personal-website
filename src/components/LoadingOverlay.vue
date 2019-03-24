<template>
  <div
    :class="[
      'wrapper',
      'full-width',
      'full-height',
      { backward: !isAnimating }
    ]"
  >
    <transition
      :name="`slide-${direction}`"
      @after-enter="afterEnter"
      @after-leave="afterLeave"
    >
      <div class="page full-width full-height" v-show="show">
        <div class="page__loader"></div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data: () => ({
    direction: '',
    show: false, // show overlay
    isAnimating: false,
    cb: null
  }),
  methods: {
    load(direction, cb) {
      this.direction = direction
      this.isAnimating = true
      this.show = true
      this.cb = cb
    },
    afterEnter() {
      this.cb('after-enter')
      // loading animation..
      this.show = false // Trigger leaving animation
    },
    afterLeave() {
      this.isAnimating = false
      this.cb('after-leave')
    }
  }
}
</script>

<style lang="scss" scoped>
.backward {
  z-index: -1;
}
.wrapper {
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;

  @include respond-to('large') {
    padding-left: $navbar-width;
  }

  @include respond-to('medium', 'small') {
    padding-top: $navbar-width;
  }
}
.page {
  display: flex;
  justify-content: center;
  align-items: center;

  @include themify {
    background: themed('primary-background-color');
  }

  &__loader {
    background: red;
    height: 100px;
    width: 100px;
  }
}

// Vue transition animations
.slide-down-enter-active,
.slide-down-leave-active,
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter {
  transform: translateY(-100%);
}
.slide-down-leave-to {
  transform: translateY(100%);
}

.slide-up-enter {
  transform: translateY(100%);
}

.slide-up-leave-to {
  transform: translateY(-100%);
}
</style>
