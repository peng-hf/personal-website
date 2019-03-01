<template>
  <div id="navigation">
    <div class="logo"></div>
    <div class="pages" @click="navigatePage">
      <a
        v-for="({ PATH, ICON }, idx) in PAGES"
        :key="idx"
        :class="{ selected: $route.path === PATH }"
        :data-path="PATH"
      >
        <font-awesome-icon :icon="ICON" />
      </a>
    </div>
    <div class="networks" @click="navigateNetwork">
      <a v-for="({ LINK, ICON }, idx) in NETWORKS" :key="idx" :data-link="LINK">
        <font-awesome-icon :icon="ICON" />
      </a>
    </div>

    <div class="menu-btn">
      <a>
        <font-awesome-icon icon="bars" />
      </a>
    </div>
  </div>
</template>

<script>
import { ROUTE } from '@/constants'

const PAGES = [
  { PATH: ROUTE.HOME.PATH, ICON: 'home' },
  { PATH: ROUTE.ABOUT.PATH, ICON: 'user' },
  { PATH: ROUTE.SKILLS.PATH, ICON: 'code' },
  { PATH: ROUTE.WORKS.PATH, ICON: 'toolbox' },
  { PATH: ROUTE.CONTACT.PATH, ICON: 'envelope' }
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
    PAGES,
    NETWORKS
  }),
  methods: {
    navigatePage(e) {
      const path = e.target.dataset.path
      if (path) {
        this.$router.push({ path })
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
%nav-elt-dimension {
  width: 5rem;
  height: 5rem;
}

#navigation {
  display: flex;
  justify-content: space-between;
  font-size: 2.3rem;
  text-align: center;

  @include respond-to('large') {
    flex-direction: column;
  }
  @include themify {
    background-color: themed('secondary-background-color');
  }

  .logo {
    @extend %nav-elt-dimension;
    &:before {
      content: '필';
      display: block;
      transform: translateY(50%);
    }
  }

  .pages,
  .networks {
    @include respond-to('small') {
      display: none;
    }
  }
  .pages {
    @include themify {
      color: themed('primary-text-color-10');
    }
  }

  .menu-btn {
    @include respond-to('large', 'medium') {
      display: none;
    }
  }
}

a {
  @extend %nav-elt-dimension;
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
  @include respond-to('small', 'medium') {
    display: inline-block;
  }
  @include respond-to('large') {
    display: block;
  }
  svg {
    transform: translateY(50%);
    // Disable svg pointer events to prevent from bubbling up to the parent
    pointer-events: none;
  }
}
</style>
