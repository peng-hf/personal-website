<template>
  <button class="btn" @mouseover="enter = true" @mouseout="enter = false">
    <span :class="['btn__stroke', { 'btn__stroke--disappear': enter }]"></span>
    <slot>Submit</slot>
  </button>
</template>

<script>
export default {
  data: () => ({
    enter: false
  })
}
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
  font-size: 1.4rem;
  font-weight: 600;
  letter-spacing: 0.1rem;
  text-transform: uppercase;

  &:hover {
    background: white;
    color: black;
  }

  &__stroke {
    position: absolute;
    height: 0.1rem;
    width: 2rem;
    top: 50%;
    left: -1rem;
    @include themify {
      background: themed('primary-text-color');
    }
    transition: all 0.1s ease-in;
    transition-property: transform opacity;
    &--disappear {
      transform: translateX(0.8rem);
      opacity: 0;
    }
  }
}
</style>
