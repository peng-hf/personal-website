<template>
  <div id="navigation" class="full-height">
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
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 5.5rem;
  // padding: 1rem 0;
  @include themify {
    background-color: themed('secondary-background-color');
  }
  padding: 1.5rem 0;
  font-size: 2.5rem;

  .pages,
  .networks {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

svg {
  display: block;
  cursor: pointer;
  &:not(:last-child) {
    margin-bottom: 2.5rem;
  }
  &:hover {
    @include themify {
      color: themed('primary-brand-color');
    }
  }
}
</style>
