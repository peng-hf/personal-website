<template>
  <textarea v-if="textArea" :placeholder="placeholder" />
  <input v-else :placeholder="placeholder" />
</template>

<script>
export default {
  props: {
    placeholder: String,
    textArea: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
input,
textarea {
  display: block;
  width: 100%;
  border: 0;
  margin: 1.2rem 0;
  padding: 0 1.8rem;
  opacity: 0.5;
  font-size: 1.2rem;
  outline: none;

  @include themify {
    background: themed('primary-text-color-10');
    color: themed('primary-text-color');
  }
  &::placeholder {
    @include themify {
      text-transform: uppercase;
      color: themed('primary-text-color');
      font-size: 1.2rem;
      font-weight: 600;
      letter-spacing: 0.1rem;
    }
  }
}

input {
  height: 3.8rem;
}

textarea {
  padding-top: 1rem;
  padding-bottom: 1rem;
  height: 15rem;
  resize: none;
}
</style>
