<template>
  <button class="btn">
    <span class="btn__stroke"></span>
    <slot>Submit</slot>
  </button>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.btn {
  // Reset
  padding: 0;
  border: none;
  cursor: pointer;
  font: inherit;
  background-color: transparent;
  color: inherit;

  // Styling
  position: relative;
  padding: 1.2rem 2.5rem;
  border-style: solid;
  border-width: 0.1rem;
  @include themify {
    border-color: themed('primary-text-color');
  }
  font-family: 'Open Sans';
  font-weight: 600;
  font-size: 1.4rem;
  letter-spacing: 0.1rem;
  text-transform: uppercase;

  &__stroke {
    position: absolute;
    height: 0.1rem;
    width: 2rem;
    top: 50%;
    left: -1rem;
    @include themify {
      background: themed('primary-text-color');
    }
  }
}

@keyframes pulse {
  50% {
    transform: translateX(15%);
  }
}
</style>
