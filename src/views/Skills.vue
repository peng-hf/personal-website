<template>
  <page-specific-layout
    :title="$t('skills.title')"
    :description="$t('skills.description')"
    :btnText="$t('skills.btn')"
    :btnTo="ROUTE.WORKS.PATH"
  >
    <template v-slot:content-right>
      <div class="circle-skills full-width">
        <rotating-circle :width="80">
          <rotating-circle-item
            v-for="(skill, idx) in SKILLS"
            :img="skill.img"
            :key="idx"
            :width="skill.curWidth"
            :ref="'skill-' + idx"
          ></rotating-circle-item>
        </rotating-circle>
      </div>
    </template>
  </page-specific-layout>
</template>

<script>
import { mapGetters } from 'vuex'

import { ROUTE } from '@/constants'

import PageSpecificLayout from '@/components/PageSpecificLayout'
import RotatingCircle from '@/components/RotatingCircle'
import RotatingCircleItem from '@/components/RotatingCircleItem'

const SKILLS = [
  { img: '/logo/vue.png', width: 90 },
  { img: '/logo/webpack.png', width: 110 },
  { img: '/logo/sass.png', width: 110 },
  { img: '/logo/javascript.png', width: 90 },
  { img: '/logo/react.png', width: 110 },
  { img: '/logo/docker.png', width: 130 },
  { img: '/logo/nginx.png', width: 160 },
  { img: '/logo/css.png', width: 100 },
  { img: '/logo/nodejs.png', width: 100 },
  { img: '/logo/html.png', width: 110 }
]

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

export default {
  data() {
    return {
      intervalId: null,
      ROUTE,
      SKILLS: SKILLS.map(s => {
        s.curWidth = 0
        return s
      })
    }
  },
  mounted() {
    setTimeout(this.spinSkill, 1000)
    this.intervalId = setInterval(this.spinSkill, 4000)
  },
  destroyed() {
    clearInterval(this.intervalId)
  },
  watch: [
    { name: 'isSmallLayout', coeff: 0.6 },
    { name: 'isMediumLayout', coeff: 1.3 },
    { name: 'isLargeLayout', coeff: 1 }
  ].reduce((acc, w) => {
    acc[w.name] = {
      handler: function(bool) {
        if (bool) {
          this.SKILLS.forEach(s => {
            s.curWidth = s.width * w.coeff
          })
        }
      },
      immediate: true
    }
    return acc
  }, {}),
  computed: mapGetters({
    isSmallLayout: 'window/isSmall',
    isMediumLayout: 'window/isMedium',
    isLargeLayout: 'window/isLarge'
  }),
  methods: {
    spinSkill() {
      const skillIdx = randomInt(0, SKILLS.length - 1)
      this.$refs['skill-' + skillIdx][0].spin()
    }
  },
  components: { PageSpecificLayout, RotatingCircle, RotatingCircleItem }
}
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
