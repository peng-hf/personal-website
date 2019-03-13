<template>
  <div class="home">
    <div class="home__content">
      <h1 class="home__title">
        Hello there.<br />My name's
        <span class="home__name">Philippe Eng.</span>
      </h1>
      <hr />
      <p class="home__subtitle">Front-End Developer / Web Freelancer</p>
      <custom-button :to="ROUTE.ABOUT.PATH">view profile</custom-button>
    </div>
    <img
      class="home__portrait"
      alt="portrait"
      src="@/assets/images/portrait.jpg"
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
  flex: 1;
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
      width: 100%;
      background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
        url('~@/assets/images/portrait.jpg') top center fixed;
      background-size: cover;
    }
    @include respond-to('medium') {
      padding: 0 5rem;
    }
    @include respond-to('small') {
      padding: 0 3rem;
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
