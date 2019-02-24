<template>
  <div :class="`theme-${$store.state.theme}`">
    <div id="app" class="full-height">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
