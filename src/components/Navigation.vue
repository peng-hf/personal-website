<template>
  <div id="navigation">
    <div class="logo"></div>
    <div class="pages" @click="navigatePage">
      <a
        v-for="({ NAME, ICON }, idx) in PAGES"
        :key="idx"
        :class="{ selected: $route.name === NAME }"
        :data-name="NAME"
      >
        <font-awesome-icon :icon="ICON" />
      </a>
    </div>
    <div class="networks" @click="navigateNetwork">
      <a v-for="({ LINK, ICON }, idx) in NETWORKS" :key="idx" :data-link="LINK">
        <font-awesome-icon :icon="ICON" />
      </a>
    </div>

    <!-- Menu for medium and small layout only -->
    <div class="menu">
      <a @click="showMenu = !showMenu">
        <font-awesome-icon v-if="!showMenu" icon="bars" />
        <font-awesome-icon v-else icon="times" />
      </a>
    </div>
    <div class="menu-navigation" @click="navigatePage" v-if="showMenu">
      <a
        v-for="({ NAME, ICON }, idx) in PAGES"
        :key="idx"
        :data-name="NAME"
        :class="{ selected: $route.name === NAME }"
      >
        {{ NAME }}
      </a>
    </div>
  </div>
</template>

<script>
import { ROUTE } from '@/constants'

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
  methods: {
    navigatePage(e) {
      const name = e.target.dataset.name
      if (name) {
        this.$router.push({ name })
      }
    },
    navigateNetwork(e) {
      const link = e.target.dataset.link
      if (link) {
        window.open(link, '_blank')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$nav-elt-width: 6rem;
$nav-elt-height: 6rem;
%nav-elt {
  width: $nav-elt-height;
  height: $nav-elt-width;
  display: flex;
  justify-content: center;
  align-items: center;
}

#navigation {
  display: flex;
  justify-content: space-between;
  font-size: 2.3rem;

  @include respond-to('large') {
    flex-direction: column;
  }
  @include themify {
    background-color: themed('secondary-background-color');
  }

  .logo {
    @extend %nav-elt;
    &:before {
      content: '필';
      display: block;
    }
  }

  .pages {
    @include themify {
      color: themed('primary-text-color-10');
    }
  }

  .pages,
  .networks {
    @include respond-to('small') {
      display: none;
    }
    @include respond-to('medium') {
      display: flex;
    }
  }

  .pages,
  .networks,
  .menu {
    a {
      @extend %nav-elt;
    }
  }

  .menu,
  .menu-navigation {
    @include respond-to('large', 'medium') {
      display: none;
    }
  }

  .menu-navigation {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: calc(100vh - #{$nav-elt-height});
    width: 100vw;
    margin-top: $nav-elt-height;
    a {
      font-weight: 600;
      letter-spacing: 0.2rem;
      text-transform: uppercase;
      margin-top: 3rem;
    }
  }
}

a {
  cursor: pointer;
  &.selected {
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
</style>
