<template>
  <header class="header">
    <nav class="navigation-bar">
      <div class="navigation-bar__logo">필</div>
      <div
        :class="['navigation-bar__btn-pages', { 'no-events': disableClick }]"
      >
        <router-link
          v-for="({ NAME, ICON }, idx) in PAGES"
          :key="idx"
          :class="[
            'link',
            { 'link--inactive': NAME !== $route.name },
            'navigation-bar__link'
          ]"
          active-class="link--selected"
          :to="{ name: NAME }"
          exact
        >
          <i :class="`eva eva-${ICON}`" />
        </router-link>
      </div>
      <div class="navigation-bar__btn-networks">
        <a
          v-for="({ LINK, ICON }, idx) in NETWORKS"
          :key="idx"
          class="link navigation-bar__link"
          :href="LINK"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i :class="`eva eva-${ICON}`" />
        </a>
      </div>

      <!-- Menu for medium and small layout only -->
      <div class="navigation-bar__btn-menu">
        <a @click="showMenu = !showMenu" class="link">
          <transition name="rotation-fade" mode="out-in">
            <i class="eva eva-close-outline" key="close" v-if="showMenu" />
            <i class="eva eva-menu-outline" key="menu" v-else />
          </transition>
        </a>
      </div>
    </nav>
    <transition name="slide-down">
      <nav class="navigation-menu" @click="navigatePage" v-if="showMenu">
        <router-link
          v-for="({ NAME, ICON }, idx) in PAGES"
          :key="idx"
          class="link navigation-menu__link"
          active-class="link--selected"
          :to="{ name: NAME }"
          :data-name="NAME"
          exact
        >
          {{ $t(`navigation.${NAME}`) }}
        </router-link>
      </nav>
    </transition>
  </header>
</template>

<script>
import { ROUTE } from '@/constants'
import { mapGetters } from 'vuex'

const PAGES = [
  { NAME: ROUTE.HOME.NAME, ICON: 'home-outline' },
  { NAME: ROUTE.ABOUT.NAME, ICON: 'person-outline' },
  { NAME: ROUTE.SKILLS.NAME, ICON: 'code-outline' },
  { NAME: ROUTE.WORKS.NAME, ICON: 'monitor-outline' },
  { NAME: ROUTE.CONTACT.NAME, ICON: 'email-outline' }
]

const NETWORKS = [
  { LINK: 'https://github.com/MrLyfing', ICON: 'github' },
  {
    LINK: 'https://www.linkedin.com/in/philippe-eng/',
    ICON: 'linkedin'
  }
]

export default {
  props: {
    disableClick: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    showMenu: false,
    PAGES,
    NETWORKS
  }),
  computed: {
    ...mapGetters({
      isSmallLayout: 'window/isSmall'
    })
  },
  watch: {
    isSmallLayout(bool) {
      if (!bool && this.showMenu) {
        // Dismiss the navigation menu if layout is not small
        this.showMenu = false
      }
    }
  },
  methods: {
    navigatePage(e) {
      const name = e.target.dataset.name
      if (name) {
        this.showMenu && (this.showMenu = false)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
%nav-elt {
  width: $navbar-size;
  height: $navbar-size;
  display: flex;
  justify-content: center;
  align-items: center;
}

// Generic rules
.link {
  cursor: pointer;
  color: inherit;
  transition: color 0.4s ease;
  text-decoration: none;

  @include themify {
    color: themed('primary-text-color');
  }

  &--selected {
    @include themify {
      color: themed('primary-brand-color'); // menu-navigation
    }
  }

  &--inactive {
    @include themify {
      color: themed('primary-text-color-10');
    }
  }
  @include respond-to('large', 'medium') {
    @include themify {
      &:hover {
        color: themed('primary-brand-color');
      }
    }
  }
}

i {
  // Disable i pointer events to prevent from bubbling up to the parent
  pointer-events: none;
  font-size: 2.6rem;
}

// Styling component rules
.header {
  display: flex;
  flex-direction: column;
}

.navigation-bar {
  display: flex;
  justify-content: space-between;
  font-size: 2.3rem;
  z-index: 5;

  @include respond-to('large') {
    flex-direction: column;
    height: 100%;
  }
  @include themify {
    background-color: themed('secondary-background-color');
  }

  &__logo {
    @extend %nav-elt;
  }

  &__btn-pages,
  &__btn-networks {
    @include respond-to('small') {
      display: none;
    }
    @include respond-to('medium') {
      display: flex;
    }
  }

  &__link {
    @extend %nav-elt;
  }

  &__btn-menu {
    @extend %nav-elt;
    @include respond-to('large', 'medium') {
      display: none;
    }
  }
}

.navigation-menu {
  position: absolute;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 4;
  font-size: 2.5rem;
  @include themify {
    background: themed('secondary-background-color');
  }
  &__link {
    font-weight: 600;
    letter-spacing: 0.2rem;
    text-transform: uppercase;
    opacity: 0;
    &:not(:first-child) {
      margin-top: 3rem;
    }
    // Stagger animation on links
    @for $i from 1 through 5 {
      &:nth-child(#{$i}) {
        animation: fadeInDown 0.3s #{$i * 0.15}s ease 1 forwards;
      }
    }
  }
}

/* Vue transition animation */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.4s ease;
}

.slide-down-enter,
.slide-down-leave-to {
  transform: translateY(-100%);
}
</style>
