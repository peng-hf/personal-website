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
          :disabled="!selectedFilters.includes(filterText)"
          @click.native="selectFilter(filterText)"
        >
          {{ filterText }}
        </project-filter>
      </div>
      <div class="works__filters-subtitle">
        {{ $t('works.filters-subtitle') }}
      </div>
      <div class="projects">
        <template v-for="(work, idx) in WORKS">
          <div class="project" v-if="isWorkDisplayed(work.filters)" :key="idx">
            <div class="project__bar">
              <div class="project__dots">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
              </div>
              <div class="project__title">{{ work.name }}</div>
              <div class="project__bar-void"></div>
            </div>
            <img class="project__thumbnail" :src="work.projectImg" />
            <div
              class="project__ribbon"
              :style="{ background: work.ribbonColor }"
            >
              <span v-if="work.ribbonText">{{ work.ribbonText }}</span>
              <img v-else :src="work.ribbonImg" />
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import ProjectFilter from '@/components/ProjectFilter'

const FILTER = {
  SHOW_ALL: 'show all',
  VANILLA_JS: 'vanilla js',
  VUE: 'vue',
  REACT: 'react',
  REACT_NATIVE: 'react native',
  WEB: 'web',
  MOBILE: 'mobile'
}

const WORKS = [
  {
    name: 'my personal website',
    projectImg: require('@/assets/images/works/personal-website.png'),
    ribbonImg: require('@/assets/images/works/github-ribbon.png'),
    ribbonColor: '#333',
    filters: [FILTER.WEB, FILTER.VUE]
  },
  {
    name: 'piano js',
    projectImg: require('@/assets/images/works/piano-js.png'),
    ribbonImg: require('@/assets/images/works/github-ribbon.png'),
    ribbonColor: '#333',
    filters: [FILTER.WEB, FILTER.VANILLA_JS]
  },
  {
    name: 'winamax live',
    projectImg: require('@/assets/images/works/winamax-live.png'),
    ribbonText: 'winamax',
    ribbonColor: '#B71B1C',
    filters: [FILTER.WEB, FILTER.MOBILE, FILTER.REACT, FILTER.REACT_NATIVE]
  }
]

export default {
  data: () => ({
    WORKS,
    FILTER,
    selectedFilters: [FILTER.SHOW_ALL]
  }),
  methods: {
    selectFilter(val) {
      if (val === FILTER.SHOW_ALL && this.isFilterSelected(val)) {
        // SHOW_ALL filter can't be unselected if it's the only one selected
        return
      }

      if (val === FILTER.SHOW_ALL && !this.isFilterSelected(val)) {
        this.selectedFilters = [FILTER.SHOW_ALL]
      } else if (this.isFilterSelected(val)) {
        this.selectedFilters = this.selectedFilters.filter(f => f !== val)
      } else {
        this.selectedFilters = [val, ...this.selectedFilters].filter(
          f => f !== FILTER.SHOW_ALL
        )
      }
    },
    isFilterSelected(val) {
      return this.selectedFilters.includes(val)
    },
    isWorkDisplayed(filters) {
      return (
        this.isFilterSelected(FILTER.SHOW_ALL) ||
        filters.some(sf => this.selectedFilters.indexOf(sf) > -1)
      )
    }
  },
  components: { ProjectFilter }
}
</script>

<style lang="scss" scoped>
$project-width: 40rem;
$project-spacing: 1.5rem;
$project-thumbnail-height: 22.5rem;
$project-small-width: $project-width * 0.8;

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

.project {
  position: relative;
  margin: $project-spacing;
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
  &__thumbnail {
    @include respond-to('large', 'medium') {
      height: $project-thumbnail-height;
    }
    @include respond-to('small') {
      height: $project-thumbnail-height * 0.8;
    }
    width: 100%;
    display: block;
    filter: brightness(70%);
    transition: filter 0.2s linear;

    &:hover {
      filter: brightness(50%);
      cursor: pointer;
    }
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
