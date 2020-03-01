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
          <div
            class="loader__text"
            v-html="$t('loading', { page: formattedPageName })"
          ></div>
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

<script>
const INITIAL_DATA = {
  direction: '',
  show: false, // show overlay
  isAnimating: false,
  toPageName: '',
  cb: null,
  loading: false
}

export default {
  data: () => ({ ...INITIAL_DATA }),
  computed: {
    formattedPageName() {
      const pageName = this.$t(`navigation.${this.toPageName}`)
      return pageName.charAt(0).toUpperCase() + pageName.slice(1)
    }
  },
  methods: {
    load(direction, toPageName, cb) {
      this.direction = direction
      this.isAnimating = true
      this.show = true
      this.toPageName = toPageName
      this.cb = cb
    },
    afterEnterSlide() {
      this.cb('after-enter')
      this.loading = true // triger loading animation
    },
    afterEnterLoading() {
      // Loading finished, trigger closing slide animation
      this.show = false
    },
    beforeLeaveSlide() {
      this.cb('before-leave')
    },
    afterLeaveSlide() {
      this.cb('after-leave')
      this.reset()
    },
    reset() {
      Object.assign(this, INITIAL_DATA)
    }
  }
}
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
  height: var(--vh, 1vh);

  @include respond-to('large') {
    padding-left: $navbar-size;
  }

  @include respond-to('medium', 'small') {
    padding-top: $navbar-size;
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
  padding-bottom: 8rem; // vertically center loading bar
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

.loading-enter {
  width: 0;
}
.loading-enter-to {
  @extend %bar-size;
}

.slide-active {
  transition: transform $timing-slide ease;
}

.slide-down-enter,
.slide-up-leave-to {
  transform: translateY(-100%);
}

.slide-down-leave-to,
.slide-up-enter {
  transform: translateY(100%);
}

.slide-right-enter,
.slide-left-leave-to {
  transform: translateX(-100%);
}

.slide-right-leave-to,
.slide-left-enter {
  transform: translateX(100%);
}
</style>
