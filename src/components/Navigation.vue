<template>
  <header class="container">
    <nav class="navigation-bar">
      <div class="navigation-bar__logo">필</div>
      <div class="navigation-bar__btn-pages">
        <router-link
          v-for="({ NAME, ICON }, idx) in PAGES"
          :key="idx"
          class="link navigation-bar__link"
          active-class="link--selected"
          :to="{ name: NAME }"
          exact
        >
          <font-awesome-icon :icon="ICON" />
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
          <font-awesome-icon :icon="ICON" />
        </a>
      </div>

      <!-- Menu for medium and small layout only -->
      <div class="navigation-bar__btn-menu">
        <a @click="showMenu = !showMenu" class="link">
          <transition name="rotation-fade" mode="out-in">
            <font-awesome-icon v-if="showMenu" icon="times" key="times" />
            <font-awesome-icon v-else icon="bars" key="bars" />
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
          {{ NAME }}
        </router-link>
      </nav>
    </transition>
  </header>
</template>

<script>
import { ROUTE } from '@/constants'
import { mapGetters } from 'vuex'

const PAGES = [
  { NAME: ROUTE.HOME.NAME, ICON: 'home' },
  { NAME: ROUTE.ABOUT.NAME, ICON: 'user' },
  { NAME: ROUTE.SKILLS.NAME, ICON: 'code' },
  { NAME: ROUTE.WORKS.NAME, ICON: 'toolbox' },
  { NAME: ROUTE.CONTACT.NAME, ICON: 'envelope' }
]

const NETWORKS = [
  { LINK: 'https://github.com/MrLyfing', ICON: ['fab', 'github'] },
  {
    LINK: 'https://www.linkedin.com/in/philippe-eng/',
    ICON: ['fab', 'linkedin']
  }
]

export default {
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
  width: 6rem;
  height: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
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
    height: 100vh;
  }
  @include themify {
    background-color: themed('secondary-background-color');
  }

  &__logo {
    @extend %nav-elt;
  }

  &__btn-pages {
    @include themify {
      color: themed('primary-text-color-10');
    }
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
  padding: 3rem 0;
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

/* Generic rules */
.link {
  cursor: pointer;
  color: inherit;
  transition: color 0.3s ease;
  text-decoration: none;
  &--selected {
    @include themify {
      color: themed('primary-brand-color');
    }
  }
  &:hover {
    @include themify {
      color: themed('primary-brand-color');
    }
  }
}

svg {
  // Disable svg pointer events to prevent from bubbling up to the parent
  pointer-events: none;
}

/* Vue transition animation */
.rotation-fade-enter-active,
.rotation-fade-leave-active {
  transition: all 0.3s ease;
  transition-property: opacity transform;
}

.rotation-fade-enter {
  opacity: 0;
  transform: rotate(-180deg);
}

.rotation-fade-leave-to {
  opacity: 0;
  transform: rotate(180deg);
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.4s ease;
}

.slide-down-enter,
.slide-down-leave-to {
  transform: translateY(-100%);
}
</style>
