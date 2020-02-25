<template>
  <div class="home full-width full-height">
    <div class="home__content">
      <h1 class="home__title">
        <i18n path="home.title.#inter">
          <template v-slot:term>
            <div>
              {{ $t('home.title.intro') }}
              <span class="home__name">Philippe Eng.</span>
            </div>
          </template>
        </i18n>
      </h1>
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
export default {
  data: () => ({
    ROUTE
  }),
  components: { CustomButton }
}
</script>

<style lang="scss" scoped>
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
