<template>
  <div
    class="circle-item"
    :style="{
      width: props.width + 'px',
      height: props.width + 'px',
      left: initPos.x + 'px',
      top: initPos.y + 'px'
    }"
    ref="circleItemEl"
  >
    <img
      class="circle-item__img spin"
      :src="props.img"
      alt="technology"
      @mouseover="spin"
      ref="imgEl"
    />
  </div>
</template>

<script setup lang="ts">
const FULL_ROTATION_DEGREE = 360

interface CircleContext {
  radius: Readonly<Ref<number>>
  centerPosition: Readonly<Ref<{ x: number; y: number }>>
  totalItems: Ref<number>
  register: () => number
}

const props = withDefaults(defineProps<{
  width?: number
  img?: string
}>(), {
  width: 80,
  img: '/logo/vue.png'
})

const ctx = inject<CircleContext>('circleContext')!
const myIndex = ctx.register()

const circleItemEl = ref<HTMLElement | null>(null)
const imgEl = ref<HTMLElement | null>(null)
const isSpinning = ref(false)

const initPos = computed(() => ({
  x: ctx.centerPosition.value.x - props.width / 2,
  y: ctx.centerPosition.value.y - props.width / 2
}))

let animationId: number | null = null

onMounted(() => {
  const fromAngle = (FULL_ROTATION_DEGREE / ctx.totalItems.value) * myIndex
  const toAngle = fromAngle + FULL_ROTATION_DEGREE
  let curAngle = fromAngle

  const update = () => {
    if (!circleItemEl.value) return
    if (curAngle >= toAngle) curAngle = fromAngle
    circleItemEl.value.style.transform = `
      rotate(${curAngle}deg)
      translateX(${ctx.radius.value}px)
      rotate(-${curAngle}deg)
    `
    curAngle += 0.1
    animationId = requestAnimationFrame(update)
  }
  animationId = requestAnimationFrame(update)
})

onUnmounted(() => {
  if (animationId !== null) cancelAnimationFrame(animationId)
})

function spin() {
  if (isSpinning.value) return
  const elt = imgEl.value
  if (!elt) return
  isSpinning.value = true
  elt.addEventListener('animationend', () => {
    elt.classList.remove('play')
    isSpinning.value = false
  }, { once: true })
  elt.classList.add('play')
}

defineExpose({ spin })
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
.play.spin {
  animation-name: spin;
  animation-duration: 2.5s;
}
@keyframes spin {
  to {
    transform: perspective(400px) rotateY(360deg);
  }
}
</style>
