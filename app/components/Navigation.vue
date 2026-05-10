<template>
  <header class="header">
    <nav class="navigation-bar">
      <div class="navigation-bar__logo">
        <NuxtLink @click="showMenu = false" to="/">
          필
        </NuxtLink>
      </div>
      <div
        :class="['navigation-bar__btn-pages', { 'no-events': disableClick }]"
      >
        <NuxtLink
          v-for="({ name, path, icon }, idx) in PAGES"
          :key="idx"
          :class="[
            'link',
            { 'link--inactive': name !== route.name },
            'navigation-bar__link'
          ]"
          active-class="link--selected"
          :to="path"
          :aria-label="'Link to ' + name"
        >
          <i :class="`eva eva-${icon}`" />
        </NuxtLink>
      </div>
      <div class="navigation-bar__btn-networks">
        <a
          v-for="({ link, icon }, idx) in NETWORKS"
          :key="idx"
          class="link navigation-bar__link"
          :href="link"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="'Link to ' + icon"
        >
          <i :class="`eva eva-${icon}`" />
        </a>
      </div>

      <!-- Menu for small layout only -->
      <div class="navigation-bar__btn-menu">
        <a @click="showMenu = !showMenu" class="link" aria-label="Menu button">
          <transition name="rotation-fade" mode="out-in">
            <i class="eva eva-close-outline" key="close" v-if="showMenu" />
            <i class="eva eva-menu-outline" key="menu" v-else />
          </transition>
        </a>
      </div>
    </nav>
    <transition name="slide-down">
      <nav class="navigation-menu" @click="navigatePage" v-if="showMenu">
        <NuxtLink
          v-for="({ name, path }, idx) in PAGES"
          :key="idx"
          class="link navigation-menu__menu-link"
          active-class="link--selected"
          :to="path"
          :data-name="name"
          :aria-label="'Link to ' + name"
        >
          {{ t(`navigation.${name}`) }}
        </NuxtLink>
        <div class="navigation-menu__networks">
          <a
            v-for="({ link, icon }, idx) in NETWORKS"
            :key="idx"
            class="link"
            :href="link"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="'Link to ' + icon"
          >
            <i :class="`eva eva-${icon}`" />
          </a>
        </div>
      </nav>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { GITHUB_NAME } from '~/utils/constants'

const { t } = useI18n()
const route = useRoute()
const windowStore = useWindowStore()

const PAGES = [
  { name: 'home', path: '/', icon: 'home-outline' },
  { name: 'about', path: '/about', icon: 'person-outline' },
  { name: 'skills', path: '/skills', icon: 'code-outline' },
  { name: 'works', path: '/works', icon: 'monitor-outline' },
  { name: 'contact', path: '/contact', icon: 'email-outline' },
]

const NETWORKS = [
  { link: `https://github.com/${GITHUB_NAME}`, icon: 'github' },
  { link: 'https://www.linkedin.com/in/philippe-eng/', icon: 'linkedin' },
]

defineProps<{ disableClick?: boolean }>()

const showMenu = ref(false)

watch(() => windowStore.isSmall, (isSmall) => {
  if (!isSmall && showMenu.value) {
    showMenu.value = false
  }
})

function navigatePage(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (target.dataset.name) {
    showMenu.value = false
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
      color: themed('primary-brand-color');
    }
  }

  &--inactive {
    @include themify {
      color: themed('primary-text-color-10');
    }
  }
  @include themify {
    &:hover,
    &:active {
      color: lighten(themed('primary-brand-color'), 8%);
    }
  }
}

i {
  pointer-events: none;
  font-size: 2.6rem;
}

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
    a {
      color: inherit;
      text-decoration: inherit;
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
  height: var(--w-inner-height, 1vh);
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 4;
  @include themify {
    background: themed('secondary-background-color');
  }
  &__menu-link {
    font-size: 2.5rem;
    font-weight: 600;
    letter-spacing: 0.2rem;
    text-transform: uppercase;
    opacity: 0;
    &:not(:first-child) {
      margin-top: 3rem;
    }
    @for $i from 1 through 5 {
      &:nth-child(#{$i}) {
        animation: fadeInDown 0.3s #{$i * 0.15}s ease 1 forwards;
      }
    }
  }
  &__networks {
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    opacity: 0;
    animation: fadeInDown 0.3s #{6 * 0.15}s ease 1 forwards;

    a {
      width: 6rem;
      height: 6rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    i {
      font-size: 3.3rem;
    }
  }
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.4s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-100%);
}
</style>
