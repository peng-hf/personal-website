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
            v-for="(skill, idx) in skills"
            :img="skill.img"
            :key="idx"
            :width="skill.curWidth"
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
  { img: '/logo/vue.png', largeWidth: 80 },
  { img: '/logo/webpack.png', largeWidth: 100 },
  { img: '/logo/sass.png', largeWidth: 100 },
  { img: '/logo/javascript.png', largeWidth: 80 },
  { img: '/logo/react.png', largeWidth: 100 },
  { img: '/logo/docker.png', largeWidth: 120 },
  { img: '/logo/nginx.png', largeWidth: 150 },
  { img: '/logo/css.png', largeWidth: 90 },
  // { img: '/logo/express.png', largeWidth: 150 },
  { img: '/logo/html.png', largeWidth: 100 }
]

export default {
  data() {
    const skills = SKILLS.map(s => {
      return { ...s, curWidth: s.largeWidth }
    })
    return {
      ROUTE,
      skills
    }
  },
  watch: [
    { name: 'isSmallLayout', coeff: 0.7 },
    { name: 'isMediumLayout', coeff: 1.3 },
    { name: 'isLargeLayout', coeff: 1 }
  ].reduce((acc, w) => {
    acc[w.name] = {
      handler: function(bool) {
        if (bool) {
          this.skills.forEach(s => {
            s.curWidth = s.largeWidth * w.coeff
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
