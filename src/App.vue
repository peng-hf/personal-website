<template>
  <div :class="`theme-${$store.state.theme}`">
    <div id="app">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
