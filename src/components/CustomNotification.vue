<template>
  <vue-notifications position="top center">
    <template slot="body" slot-scope="props">
      <div>
        <a class="title">
          {{ props.item.title }}
        </a>
        <div v-html="props.item.text"></div>
      </div>
    </template>
  </vue-notifications>
</template>

<style scoped></style>
