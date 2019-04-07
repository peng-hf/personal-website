<template>
  <div class="timeline full-width">
    <div class="title">
      <div class="title__text">{{ $t('about.timeline.title') }}</div>
    </div>

    <div
      class="event"
      v-for="(event, idx) in $t('about.timeline.events')"
      :key="idx"
    >
      <div
        :class="[
          'event__date-location',
          { 'first-column': idx % 2 === 0, 'third-column': idx % 2 !== 0 }
        ]"
      >
        <div class="event__date">{{ event.date }}</div>
        <div class="event__location">{{ event.city }}</div>
      </div>
      <div class="event__time second-column">
        <div class="event__time-point"></div>
        <div class="event__time-bar"></div>
      </div>
      <div
        :class="[
          'event__company',
          { 'first-column': idx % 2 !== 0, 'third-column': idx % 2 === 0 }
        ]"
      >
        <div class="event__company-name">{{ event.company }}</div>
        <div class="event__company-description">
          {{ event['company-description'] }}
        </div>
        <div class="event__company-job">{{ event.job }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.timeline {
  height: 85%;
  overflow: auto;
  padding: 3rem 4rem;
  @include respond-to('large') {
    margin: 0 4rem;
  }
  @include respond-to('medium', 'small') {
    margin: 2rem 3rem;
  }
  @include themify {
    background: themed('primary-text-color-10');
  }
  &::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 7px;
  }

  &::-webkit-scrollbar-thumb {
    @include themify {
      background-color: themed('secondary-background-color');
    }
  }
}

.title {
  display: flex;
  justify-content: center;
  margin-bottom: 4.5rem;

  &__text {
    position: relative;
    font-size: 3.5rem;
    text-transform: uppercase;
    font-weight: 600;
    &:before {
      content: '';
      position: absolute;
      bottom: -1rem;
      right: 0;
      display: inline-block;
      height: 0.5rem;
      width: 5rem;
      @include themify {
        background: themed('primary-brand-color');
      }
    }
  }
}

.event {
  display: flex;
  font-size: 1.3rem; // default font size

  &__date-location,
  &__company {
    width: 40%;
  }

  &__date {
    margin-bottom: 0.3rem;
    text-transform: uppercase;
    font-weight: 600;
    @include themify {
      color: themed('primary-brand-color');
    }
  }

  &__location {
    font-family: 'PT Sans';
  }

  &__time {
    width: 20%;
  }

  &__time-bar {
    position: relative;
    height: 100%;
    width: 0.3rem;
    margin: 0 auto;
    @include themify {
      // TODO add gradient bottom opacity
      background: themed('primary-brand-color');
    }
    &:before {
      // time point
      content: '';
      position: absolute;
      top: -0.1rem;
      left: -0.4rem;
      width: 1.1rem;
      height: 1.1rem;
      border-radius: 50%;

      @include themify {
        background: themed('primary-brand-color');
      }
    }
  }

  &__company {
    margin-bottom: 4rem; // extend timebar height
  }

  &__company-name {
    text-transform: uppercase;
    font-weight: 600;
    font-size: 1.5rem;
  }

  &__company-description {
    font-size: 1.2rem;
    font-family: 'PT Sans';
    @include themify {
      color: themed('secondary-text-color');
    }
  }

  &__company-job {
    margin-top: 1rem;
    font-family: 'PT Sans';
  }
}

// Helper classes
.first-column {
  text-align: right;
  order: 1;
}

.second-column {
  order: 2;
}

.third-column {
  order: 3;
}
</style>
