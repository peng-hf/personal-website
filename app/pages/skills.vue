<template>
  <PageSpecificLayout
    :title="t('skills.title')"
    :description="(tm('skills.description') as string[])"
    :btn-text="t('skills.btn')"
    btn-to="/works"
  >
    <template #content-right>
      <div class="circle-skills full-width">
        <RotatingCircle :width="80">
          <RotatingCircleItem
            v-for="(skill, idx) in skills"
            :img="skill.img"
            :key="idx"
            :width="skill.curWidth"
            :ref="(el) => { if (el) skillRefs[idx] = el as { spin: () => void } }"
          />
        </RotatingCircle>
      </div>
    </template>
  </PageSpecificLayout>
</template>

<script setup lang="ts">
definePageMeta({ name: 'skills' })

const { t, tm } = useI18n()
const windowStore = useWindowStore()

const SKILL_DEFS = [
  { img: '/logo/vue.png', width: 90 },
  { img: '/logo/nuxt.png', width: 110 },
  { img: '/logo/typescript.png', width: 100 },
  { img: '/logo/javascript.png', width: 90 },
  { img: '/logo/react.png', width: 110 },
  { img: '/logo/aws.png', width: 130 },
  { img: '/logo/docker.png', width: 130 },
  { img: '/logo/sass.png', width: 110 },
  { img: '/logo/css.png', width: 100 },
  { img: '/logo/nodejs.png', width: 100 },
  { img: '/logo/html.png', width: 110 }
]

const skills = reactive(SKILL_DEFS.map(s => ({ ...s, curWidth: 0 })))

watchEffect(() => {
  let coeff = 1
  if (windowStore.isSmall) coeff = 0.6
  else if (windowStore.isMedium) coeff = 1.3
  skills.forEach(s => { s.curWidth = s.width * coeff })
})

const skillRefs = ref<Array<{ spin: () => void }>>([])

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min)
}

function spinSkill() {
  const idx = randomInt(0, SKILL_DEFS.length - 1)
  skillRefs.value[idx]?.spin()
}

let intervalId: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  setTimeout(spinSkill, 1000)
  intervalId = setInterval(spinSkill, 4000)
})

onUnmounted(() => {
  if (intervalId !== null) clearInterval(intervalId)
})
</script>

<style lang="scss" scoped>
.circle-skills {
  display: flex;
  justify-content: center;

  @include respond-to('medium', 'small') {
    margin: 5rem 0;
  }
}
</style>
