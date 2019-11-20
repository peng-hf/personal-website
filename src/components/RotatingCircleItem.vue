<template>
  <div
    class="circle-item"
    :style="{
      width: width + 'px',
      height: width + 'px',
      left: initPos.x + 'px',
      top: initPos.y + 'px'
    }"
    ref="circleItem"
  >
    <img class="circle-item__img" :src="img" alt="technology" />
  </div>
</template>

<script>
const FULL_ROTATION_DEGREE = 360
export default {
  inject: ['root'],
  props: {
    width: {
      // width = height
      type: Number,
      default: 80
    },
    img: {
      type: String,
      default: '/logo/vue.png'
    }
  },
  computed: {
    offset() {
      return {
        x: this.width / 2,
        y: this.width / 2
      }
    },
    initPos() {
      return {
        x: this.root.centerPosition.x - this.offset.x,
        y: this.root.centerPosition.y - this.offset.y
      }
    }
  },
  mounted() {
    var fromAngle = 0 // Initial circle item angle
    var toAngle = 0 // Dest circle item angle
    var curAngle = 0 // Current angle during rotation animation

    for (let i = 0; i < this.root.$children.length; ++i) {
      const c = this.root.$children[i]
      if (c === this) {
        fromAngle = (FULL_ROTATION_DEGREE / this.root.$children.length) * i
        toAngle = fromAngle + FULL_ROTATION_DEGREE
        break
      }
    }

    curAngle = fromAngle
    var update = () => {
      if (!this.$refs.circleItem) return
      if (curAngle === toAngle) curAngle = fromAngle
      this.$refs.circleItem.style.transform = `
        rotate(${curAngle}deg)
        translateX(${this.root.radius}px)
        rotate(-${curAngle}deg)
      `
      curAngle += 0.1
      requestAnimationFrame(update)
    }
    update()
  }
}
</script>

<style lang="scss" scoped>
.circle-item {
  position: absolute;
  &__img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
}
</style>
