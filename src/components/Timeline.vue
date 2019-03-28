<template>
  <div class="timeline full-width full-height">
    <div class="title">
      <div class="title__text">{{ $t('about.timeline.title') }}</div>
      <div class="title__underline"></div>
    </div>

    <div class="event">
      <div class="event__date-location">
        <div class="event__date">SEPTEMBER 2017 - TODAY</div>
        <div class="event__location">Redwood City, USA</div>
      </div>
      <div class="event__time">
        <div class="event__time-point"></div>
        <div class="event__time-bar"></div>
      </div>
      <div class="event__company">
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
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 5rem;
  @include themify {
    background: themed('primary-text-color-10');
  }
}

.title {
  text-align: right;
  margin-bottom: 3rem;
  &__text {
    font-size: 3.5rem;
    text-transform: uppercase;
    font-weight: 600;
  }

  &__underline {
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
  font-size: 1.4rem; // default font size

  &__date-location,
  &__company {
    width: 40%;
  }

  &__date-location {
    text-align: right;
  }

  &__date {
    font-weight: 600;
    margin-bottom: 0.3rem;
    @include themify {
      color: themed('primary-brand-color');
    }
  }

  &__location {
    @include themify {
      color: themed('secondary-text-color');
    }
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
      background: themed('primary-brand-color');
    }
    &:before {
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
    margin-bottom: 2rem;
  }
}
</style>
