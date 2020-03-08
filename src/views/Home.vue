<template>
  <div class="home full-width full-height">
    <div class="home__content">
      <div class="home__title">
        <h1 class="home__title">
          <type-writer-effect
            :text="$t('home.title-hello')"
            :blinking-delay="1500"
          />
        </h1>
        <h1 style="display: flex;">
          <type-writer-effect :text="$t('home.title-name')" :delay="2800" />
          &nbsp;
          <type-writer-effect
            class="home__name"
            text="Philippe Eng."
            :delay="3700"
          />
        </h1>
      </div>
      <hr class="separator" />
      <p class="home__subtitle">{{ $t('home.job') }}</p>
      <custom-button :to="ROUTE.ABOUT.PATH">
        {{ $t('home.btn') }}
      </custom-button>
    </div>
    <img
      class="home__portrait"
      alt="Portrait Philippe Eng"
      src="@/assets/images/portrait-philippe-eng.jpg"
    />
  </div>
</template>

<script>
import { ROUTE } from '@/constants'
import CustomButton from '@/components/CustomButton'
import TypeWriterEffect from '@/components/TypeWriterEffect'

export default {
  data: () => ({
    ROUTE
  }),
  components: { TypeWriterEffect, CustomButton }
}
</script>

<style lang="scss" scoped>
h1 {
  margin: 0 !important;
}
.home {
  display: flex;
  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    @include respond-to('large') {
      width: 60%;
      padding-left: 6rem;
    }
    @include respond-to('medium', 'small') {
      height: 100%;
      width: 100%;
      @include themify {
        background: themed('portrait-linear-gradient'),
          url('~@/assets/images/portrait-philippe-eng.jpg') top center fixed;
        background-size: cover;
      }
    }
    @include respond-to('medium') {
      padding: 0 5rem;
    }
    @include respond-to('small') {
      padding: 0 2.7rem;
    }
  }

  &__title,
  &__subtitle {
    @include respond-to('large', 'medium') {
      margin: 2.2rem 0;
    }
    @include respond-to('small') {
      margin: 1.7rem 0;
    }
  }

  &__name {
    @include themify {
      color: themed('primary-brand-color');
    }
  }

  &__portrait {
    width: 40%;
    object-fit: cover;
    @include respond-to('medium', 'small') {
      display: none;
    }
  }
}
</style>
