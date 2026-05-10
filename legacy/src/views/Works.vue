<template>
  <div class="works full-height full-width">
    <div class="works__title">
      <h1>{{ $t('works.title') }}</h1>
      <hr class="separator" />
    </div>
    <div class="works__content">
      <div class="filters">
        <project-filter
          v-for="(filterText, idx) in Object.values(FILTER)"
          :key="idx"
          :disabled="selectedFilter !== filterText"
          @click.native="selectedFilter = filterText"
        >
          {{
            filterText === FILTER.SHOW_ALL
              ? $t('works.filter-show-all')
              : filterText
          }}
        </project-filter>
      </div>
      <div class="works__filters-subtitle">
        {{ $t('works.filters-subtitle') }}
      </div>
      <transition-group name="projects" class="projects" tag="div">
        <div
          class="wrapper-project"
          v-for="work in visibleWorks"
          :key="work.name"
        >
          <a
            class="project"
            :href="work.href"
            target="_blank"
            :aria-label="'Link to ' + work.name"
          >
            <div class="project__bar">
              <div class="project__dots">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
              </div>
              <div class="project__title">{{ work.name }}</div>
              <div class="project__bar-void"></div>
            </div>
            <img
              class="project__thumbnail"
              :src="work.projectImg"
              :alt="work.name"
            />
            <div class="project__filters">
              <div>
                <project-filter
                  v-for="(filterText, idx) in work.filters"
                  :key="idx"
                  >{{ filterText }}
                </project-filter>
              </div>
            </div>
            <div
              class="project__ribbon"
              :style="{ background: work.ribbonColor }"
            >
              <span v-if="work.ribbonText">{{ work.ribbonText }}</span>
              <img v-else :src="work.ribbonImg" alt="platform" />
            </div>
          </a>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { GITHUB_NAME } from '@/constants'
import ProjectFilter from '@/components/ProjectFilter'

const FILTER = {
  SHOW_ALL: 'show all',
  VANILLA_JS: 'vanilla js',
  VUE: 'vue',
  REACT: 'react',
  REACT_NATIVE: 'react native',
  WEB: 'web',
  MOBILE: 'mobile',
  'UI/UX': 'ui/ux',
  RESPONSIVE: 'responsive',
  ANIMATION: 'animation'
}

const WORKS = [
  {
    name: 'my personal website',
    projectImg: require('@/assets/images/works/personal-website.jpg'),
    ribbonImg: require('@/assets/images/works/github-ribbon.png'),
    ribbonColor: '#333',
    filters: [FILTER.WEB, FILTER.VUE, FILTER['UI/UX'], FILTER.RESPONSIVE, FILTER.ANIMATION],
    href: `https://github.com/${GITHUB_NAME}/personal-website`
  },
  {
    name: 'wordle-vue',
    projectImg: require('@/assets/images/works/wordle-vue.png'),
    ribbonImg: require('@/assets/images/works/github-ribbon.png'),
    ribbonColor: '#333',
    filters: [FILTER.WEB, FILTER.VUE, FILTER.RESPONSIVE, FILTER.ANIMATION],
    href: `https://github.com/${GITHUB_NAME}/wordle-vue`
  },
  {
    name: 'piano-js',
    projectImg: require('@/assets/images/works/piano-js.jpg'),
    ribbonImg: require('@/assets/images/works/github-ribbon.png'),
    ribbonColor: '#333',
    filters: [FILTER.WEB, FILTER.VANILLA_JS],
    href: `https://github.com/${GITHUB_NAME}/piano-js`
  },
  {
    name: 'enveloppe-vue',
    projectImg: require('@/assets/images/works/enveloppe-vue.png'),
    ribbonImg: require('@/assets/images/works/github-ribbon.png'),
    ribbonColor: '#333',
    filters: [FILTER.WEB, FILTER.VUE, FILTER.ANIMATION],
    href: `https://github.com/${GITHUB_NAME}/enveloppe-vue`
  },
  {
    name: 'winamax live',
    projectImg: require('@/assets/images/works/winamax-live.jpg'),
    ribbonText: 'winamax',
    ribbonColor: '#B71B1C',
    filters: [FILTER.WEB, FILTER.MOBILE, FILTER.REACT, FILTER.REACT_NATIVE],
    href:
      'https://play.google.com/store/apps/details?id=com.winamax.events&hl=en_US'
  }
]

export default {
  data: () => ({
    FILTER,
    selectedFilter: FILTER.SHOW_ALL
  }),
  computed: {
    visibleWorks() {
      return this.selectedFilter === FILTER.SHOW_ALL
        ? WORKS
        : WORKS.filter(w => w.filters.includes(this.selectedFilter))
    }
  },
  components: { ProjectFilter }
}
</script>

<style lang="scss" scoped>
$project-width: 40rem;
$project-spacing: 1.5rem;
$project-thumbnail-height: 22rem;
$project-small-width: $project-width * 0.8;
$max-filters-count: 5;

.works {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__title {
    position: relative;
    display: inline-block;
    margin-top: 5%;
    margin-bottom: 5rem;
    hr {
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }

  &__content {
    @include respond-to('large') {
      width: ($project-width + $project-spacing * 2) * 2;
    }
    @include respond-to('medium') {
      width: ($project-width + $project-spacing * 2);
    }
    @include respond-to('small') {
      width: ($project-small-width + $project-spacing * 2);
    }
  }

  &__filters-subtitle {
    padding: 0 $project-spacing;
    margin-top: 1.5rem;
    font-size: 1.1rem;
    font-weight: 500;
    @include themify {
      color: themed('secondary-text-color');
    }
  }
}

.filters {
  padding: 0 $project-spacing;

  & > .filter:not(:last-child) {
    margin-right: 1rem;
  }
}

.projects {
  display: flex;
  flex-wrap: wrap;
}

// Vue transition group
.projects-enter,
.projects-leave-to {
  opacity: 0;
}

.projects-leave-active {
  position: absolute;
}

.wrapper-project {
  transition: all 0.5s;
  &:last-child {
    margin-bottom: 3rem;
  }
}

.project {
  display: block;
  position: relative;
  margin: $project-spacing;
  text-decoration: none;

  @include respond-to('large', 'medium') {
    width: $project-width;
  }
  @include respond-to('small') {
    width: $project-small-width;
  }

  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.75);
  overflow: hidden;

  &__bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 2.2rem;
    padding: 0 1rem;
    background: lightgrey;
  }

  &__title {
    color: black;
    text-transform: uppercase;
    font-weight: 600;
  }

  &__dots,
  &__bar-void {
    width: 5rem;
  }

  &__dots {
    .dot {
      display: inline-block;
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      margin-right: 0.5rem;

      &:first-child {
        background: crimson;
      }
      &:nth-child(2) {
        background: gold;
      }
      &:last-child {
        background: limegreen;
      }
    }
  }

  &__filters {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: none;
    padding: 0 10rem;
    flex-wrap: wrap;
    > div {
      text-align: center;
    }
  }

  @media not all and (hover: none) {
    // Support only on non mobile devices
    &__filters .filter {
      margin: 0.5rem;
      opacity: 0;

      @for $i from 1 through $max-filters-count {
        &:nth-child(#{$i}) {
          animation: fadeInDown 0.2s #{$i * 0.1}s ease 1 forwards;
        }
      }
    }

    &:hover &__filters {
      display: flex;
      justify-content: center;
      align-items: center;
      filter: brightness(80%);
    }

    &:hover &__thumbnail {
      filter: brightness(40%);
    }
  }

  &__thumbnail {
    @include respond-to('large', 'medium') {
      height: $project-thumbnail-height;
    }
    @include respond-to('small') {
      height: $project-thumbnail-height * 0.8;
    }
    width: 100%;
    display: block;
    transition: filter 0.2s linear;
    filter: brightness(90%);
  }
  &__ribbon {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 24px;
    right: -60px;
    background: blue;
    height: 3.5rem;
    width: 20rem;
    transform: rotate(45deg);
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.75);

    img {
      object-fit: cover;
    }

    span {
      font-size: 1.7rem;
      color: white;
      text-transform: capitalize;
      font-weight: 700;
    }
  }
}
</style>
