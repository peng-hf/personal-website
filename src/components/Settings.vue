<template>
  <btn-floating class="btn-floating settings">
    <div class="settings__title">Settings</div>
    <hr />
    <div class="settings__theme-mode"></div>
    <div class="settings__language"></div>
  </btn-floating>
</template>

<script>
import FloatingButton from '@/components/FloatingButton'

export default {
  components: {
    'btn-floating': FloatingButton
  }
}
</script>

<style lang="scss" scoped>
.btn-floating {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
}

.settings {
  &__title {
  }
}
</style>
