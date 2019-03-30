<template>
  <div class="timeline full-width full-height">
    <div class="title">{{ $t('about.timeline.title') }}</div>

    <div class="event" v-for="idx in [0, 1, 2, 3, 4]" :key="idx">
      <div
        :class="[
          'event__date-location',
          { 'first-column': idx % 2 === 0, 'third-column': idx % 2 !== 0 }
        ]"
      >
        <div class="event__date">SEPTEMBER 2017 - TODAY</div>
        <div class="event__location">Redwood City, USA</div>
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
        <div class="event__company-name">Heartflow</div>
        <div class="event__company-description">Medical Software Company</div>
        <div class="event__company-job">
          Front End engineer working on Heartflow’s medical platforms and tools
          to detect Coronary Artery diseases.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.timeline {
  padding: 3rem 5rem;
  overflow: auto;
  @include themify {
    background: themed('primary-text-color-10');
  }
}

.title {
  position: relative;
  width: 15.7rem; // hardcoded width to enable margin 0 auto
  margin: 0 auto;
  margin-bottom: 4rem;
  font-size: 3.5rem;
  text-transform: uppercase;
  font-weight: 600;

  &:before {
    content: '';
    position: absolute;
    bottom: -0.7rem;
    right: 0;
    display: inline-block;
    height: 0.5rem;
    width: 5rem;
    @include themify {
      background: themed('primary-brand-color');
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
    font-weight: 600;
    margin-bottom: 0.3rem;
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
    margin-bottom: 3rem; // extend timebar height
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
