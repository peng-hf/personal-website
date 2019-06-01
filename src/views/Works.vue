<template>
  <div class="works full-height full-width">
    <div class="works__title">
      <h1>{{ $t('works.title') }}</h1>
      <hr class="separator" />
    </div>

    <div class="list-projects">
      <div class="wrapper-project" v-for="(work, idx) in WORKS" :key="idx">
        <div class="project">
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
      </div>
    </div>
  </div>
</template>

<script>
const WORKS = [
  {
    name: 'my personal website',
    projectImg: require('@/assets/images/works/personal-website.png'),
    ribbonImg: require('@/assets/images/works/github-ribbon.png'),
    ribbonColor: '#333'
  },
  {
    name: 'piano js',
    projectImg: require('@/assets/images/works/piano-js.png'),
    ribbonImg: require('@/assets/images/works/github-ribbon.png'),
    ribbonColor: '#333'
  },
  {
    name: 'winamax live',
    projectImg: require('@/assets/images/works/winamax-live.png'),
    ribbonText: 'winamax',
    ribbonColor: '#B71B1C'
  }
]

export default {
  data: () => ({
    WORKS
  })
}
</script>

<style lang="scss" scoped>
$project-width: 40rem;
$project-spacing: 1.5rem;
$project-thumbnail-height: 22.5rem;

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
}

.list-projects {
  display: flex;
  flex-wrap: wrap;
  @include respond-to('large') {
    width: ($project-width + $project-spacing * 2) * 2;
  }
  @include respond-to('medium') {
    width: ($project-width + $project-spacing * 2);
  }
  @include respond-to('small') {
    justify-content: center;
  }
}

.wrapper-project {
  padding: $project-spacing;
}

.project {
  position: relative;
  @include respond-to('large', 'medium') {
    width: $project-width;
  }
  @include respond-to('small') {
    width: $project-width * 0.8;
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
    transition: filter 0.3s ease;

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
