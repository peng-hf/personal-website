<template>
  <div class="theme-dark full-height full-width" id="root-rendered" ref="theme">
    <div class="app full-height full-width" ref="app">
      <vue-notifications
        position="top center"
        classes="custom-vue-notification"
        width="350"
      />
      <navigation :disable-click="disableNavigation" />
      <div :class="['app__content', { 'app__content--scale': scaleView }]">
        <component :is="currentView" />
        <settings />
      </div>
    </div>
    <loading-overlay ref="loadingOverlay" />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import { ROUTE } from '@/constants'
import { waitFor } from '@/utils'

import Navigation from '@/components/Navigation'
import Settings from '@/components/Settings'
import LoadingOverlay from '@/components/LoadingOverlay'

import Home from '@/views/Home'
import About from '@/views/About'
import Skills from '@/views/Skills'
import Works from '@/views/Works'
import Contact from '@/views/Contact'

function compareRoutePos(aName, bName) {
  const routeNames = Object.keys(ROUTE).map(key => ROUTE[key].NAME)
  const indexFrom = routeNames.indexOf(aName)
  const indexTo = routeNames.indexOf(bName)
  if (indexFrom > indexTo) return 1
  if (indexFrom < indexTo) return -1
  return 0
}

export default {
  data: () => ({
    currentView: '',
    scaleView: false,
    disableNavigation: false
  }),
  computed: {
    ...mapState({
      theme: state => state.theme
    }),
    ...mapGetters({
      isLargeLayout: 'window/isLarge'
    })
  },
  watch: {
    theme(val, oldVal) {
      this.$refs.theme.classList.add(`theme-${val}`)
      this.$refs.theme.classList.remove(`theme-${oldVal}`)
    }
  },
  created() {
    this.currentView = this.$route.name
  },
  mounted() {
    const appStyle = getComputedStyle(this.$refs['app'])
    var timingContent = appStyle.getPropertyValue('--timing-content')
    timingContent = timingContent.substring(0, timingContent.length - 2) // remove 'ms'
    var self = this

    this.$router.afterEach(async function(to, from, next) {
      self.scaleView = true
      self.disableNavigation = true
      await waitFor(timingContent) // wait for scaling animation to finish

      var direction
      if (self.isLargeLayout) {
        direction = compareRoutePos(from.name, to.name) === 1 ? 'up' : 'down'
      } else {
        // small and medium layout
        direction = compareRoutePos(from.name, to.name) === 1 ? 'left' : 'right'
      }

      self.$refs['loadingOverlay'].load(direction, to.name, state => {
        if (state === 'before-leave') {
          self.currentView = self.$route.name
        }
        if (state === 'after-leave') {
          self.scaleView = false
          self.disableNavigation = false
        }
      })
    })
  },
  components: {
    Navigation,
    Settings,
    LoadingOverlay,

    [ROUTE.HOME.NAME]: Home,
    [ROUTE.ABOUT.NAME]: About,
    [ROUTE.SKILLS.NAME]: Skills,
    [ROUTE.WORKS.NAME]: Works,
    [ROUTE.CONTACT.NAME]: Contact
  }
}
</script>

<style lang="scss" scoped>
.app {
  display: flex;
  --timing-content: 300ms;

  &__content {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;

    transition: all var(--timing-content) ease;
    transition-property: transform, opacity;
    &--scale {
      transform: scale(0.9);
      opacity: 0.1;
    }
  }

  @include respond-to('small', 'medium') {
    flex-direction: column;
  }
  @include themify {
    background-color: themed('primary-background-color');
    color: themed('primary-text-color');
  }
}
</style>
