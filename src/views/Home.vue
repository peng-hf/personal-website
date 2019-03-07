<template>
  <div class="home">
    <div class="home__content">
      <h1 class="home__title">
        Hello there.<br />My name's
        <span class="home__name">Philippe Eng.</span>
      </h1>
      <hr />
      <p class="home__subtitle">Front-End Developer / Web Freelancer</p>
    </div>
    <img
      class="home__portrait"
      alt="portrait"
      src="@/assets/images/portrait.jpg"
    />
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex: 1;
  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 60%;
    padding-left: 6rem;
  }

  &__title {
    margin-bottom: 2.5rem;
  }

  &__name {
    @include themify {
      color: themed('primary-brand-color');
    }
  }

  &__subtitle {
    margin-top: 2.5rem;
  }

  &__portrait {
    width: 40%;
    object-fit: cover;
  }
}
</style>
