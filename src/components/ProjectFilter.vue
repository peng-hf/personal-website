<template>
  <div :class="['filter', { 'filter--disabled': disabled }]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    text: { type: String, default: '' },
    disabled: { type: Boolean, default: false }
  }
}
</script>

<style lang="scss" scoped>
.filter {
  display: inline-block;
  background: gray;
  margin-bottom: 1rem;
  padding: 0.8rem;
  box-shadow: 0.3rem 0.3rem 0.2rem rgba(0, 0, 0, 0.75);
  text-transform: uppercase;
  font-weight: 700;
  color: white;
  transition: opacity 0.2s linear;

  &--disabled {
    cursor: pointer;
    &:hover {
      opacity: 0.5;
    }
    opacity: 0.3;
  }
}
</style>
