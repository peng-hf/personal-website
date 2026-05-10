<template>
  <button
    class="vue-js-switch"
    :class="{ toggled: value }"
    role="switch"
    :aria-checked="value"
    :disabled="disabled"
    :style="{ width: width + 'px' }"
    @click="!disabled && $emit('change', { value: !value })"
  >
    <div class="v-switch-core">
      <div class="v-switch-button" />
    </div>
  </button>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  value: boolean
  width?: number
  disabled?: boolean
  cssColors?: boolean
}>(), {
  width: 42,
  disabled: false,
  cssColors: false,
})

defineEmits<{
  change: [payload: { value: boolean }]
}>()
</script>

<style lang="scss" scoped>
.vue-js-switch {
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
  display: inline-block;
  vertical-align: middle;

  &:disabled {
    cursor: no-drop;
    opacity: 0.5;
  }
  &:focus {
    outline: none;
  }
}

.v-switch-core {
  position: relative;
  height: 22px;
  border-radius: 11px;
  transition: background 0.3s ease;
  overflow: hidden;
}

.v-switch-button {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  transition: transform 0.3s ease;
}

.toggled .v-switch-button {
  transform: translateX(20px);
}
</style>
