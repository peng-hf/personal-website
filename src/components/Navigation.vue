<template>
  <div id="navigation">
    <div class="logo">필</div>
    <div class="pages">
      <font-awesome-icon icon="home" />
      <font-awesome-icon icon="user" />
      <font-awesome-icon icon="code" />
      <font-awesome-icon icon="toolbox" />
      <font-awesome-icon icon="envelope" />
    </div>
    <div class="networks">
      <font-awesome-icon :icon="['fab', 'github']" />
      <font-awesome-icon :icon="['fab', 'linkedin']" />
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
#navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 2.3rem;

  @include respond-to('large') {
    flex-direction: column;
    padding: 1.5rem 1rem;
  }

  @include respond-to('small', 'medium') {
    padding: 1rem 1.5rem;
    width: 100vw;
  }
  @include themify {
    background-color: themed('secondary-background-color');
  }

  .pages,
  .networks {
    display: flex;
    align-items: center;

    @include respond-to('large') {
      flex-direction: column;
    }
  }
}

svg {
  display: block;
  cursor: pointer;
  &:not(:last-child) {
    @include respond-to('large') {
      margin-bottom: 2.5rem;
    }
    @include respond-to('small', 'medium') {
      margin-right: 2.5rem;
    }
  }
  &:hover {
    @include themify {
      color: themed('primary-brand-color');
    }
  }
}
</style>
