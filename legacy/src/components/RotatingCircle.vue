<template>
  <div class="circle" :style="{ width: width + '%' }" ref="circle">
    <template v-if="ready">
      <slot></slot>
    </template>
  </div>
</template>
<script>
import throttle from 'lodash.throttle'

export default {
  props: {
    width: {
      type: Number,
      default: 100
    }
  },
  data: () => ({
    clientWidth: 0,
    resizeListener: null,
    ready: false
  }),
  provide() {
    return {
      root: this
    }
  },
  computed: {
    radius() {
      return this.clientWidth / 2
    },
    centerPosition() {
      return { x: this.radius, y: this.radius }
    }
  },
  mounted() {
    this.clientWidth = this.$refs.circle.clientWidth
    this.resizeListener = throttle(e => {
      this.clientWidth = this.$refs.circle.clientWidth
    }, 500)
    window.addEventListener('resize', this.resizeListener)
    this.ready = true
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeListener)
  }
}
</script>

<style lang="scss" scoped>
.circle {
  position: relative;
  // border: 1px solid red;
  border-radius: 50%;

  &:before {
    // keep circle aspect ratio
    content: '';
    display: block;
    padding-top: 100% !important;
  }
}
</style>
