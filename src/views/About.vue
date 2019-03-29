<template>
  <div class="about full-width full-height">
    <div class="description">
      <h1>{{ $t('about.title') }}</h1>
      <hr class="description__separator separator" />
      <p class="description__text">{{ $t('about.description') }}</p>
      <custom-button class="description__btn" :to="ROUTE.SKILLS.PATH">
        {{ $t('about.btn') }}
      </custom-button>
    </div>
    <div class="timeline-wrapper">
      <timeline />
    </div>
  </div>
</template>

<script>
import { ROUTE } from '@/constants'

import CustomButton from '@/components/CustomButton'
import Timeline from '@/components/Timeline'

export default {
  data: () => ({
    ROUTE
  }),
  components: { CustomButton, Timeline }
}
</script>
<style lang="scss" scoped>
.about {
  @include respond-to('large') {
    display: flex;
  }
}

.description {
  display: flex;
  flex-direction: column;

  @include respond-to('large') {
    justify-content: center;
    align-items: flex-end;
    width: 50%;
    padding: 0 5rem;
  }

  @include respond-to('medium', 'small') {
    align-items: flex-start;
    width: 100%;
    padding: 2rem 3rem;
  }

  &__separator {
    @include respond-to('large') {
      margin: 1rem 0 3rem 0;
    }

    @include respond-to('medium', 'small') {
      margin: 0.3rem 0 2rem 0;
    }
  }

  &__text {
    @include respond-to('large') {
      text-align: right;
    }

    @include respond-to('medium', 'small') {
      text-align: justify;
    }
  }

  &__btn {
    @include respond-to('large') {
      margin-top: 4rem;
    }

    @include respond-to('medium', 'small') {
      margin-top: 3rem;
    }
  }
}

.timeline-wrapper {
  display: flex;

  @include respond-to('large') {
    align-items: center;
    width: 50%;
    padding: 0 4rem;
  }

  @include respond-to('medium', 'small') {
    justify-content: center;
    width: 100%;
    padding: 2rem 3rem;
  }

  & > .timeline {
    height: 85%;
  }
}
</style>
