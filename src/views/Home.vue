<template>
  <div class="home">
    <div class="home__content">
      <h1 class="home__title">
        Hello there.<br />My name's
        <span class="home__name">Philippe Eng.</span>
      </h1>
      <hr />
      <p class="home__subtitle">Front-End Developer / Web Freelancer</p>
      <custom-button class="home__btn">view profile</custom-button>
    </div>
    <img
      class="home__portrait"
      alt="portrait"
      src="@/assets/images/portrait.jpg"
    />
  </div>
</template>

<script>
import CustomButton from '@/components/CustomButton'
export default {
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
    width: 60%;
    padding-left: 6rem;
  }

  &__title {
    margin-bottom: 2.2rem;
  }

  &__name {
    @include themify {
      color: themed('primary-brand-color');
    }
  }

  &__subtitle {
    margin: 2.2rem 0;
  }

  &__portrait {
    width: 40%;
    object-fit: cover;
  }
}
</style>
