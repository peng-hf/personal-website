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
  { img: '/logo/vue.png', width: 80 },
  { img: '/logo/webpack.png', width: 100 },
  { img: '/logo/sass.png', width: 100 },
  { img: '/logo/javascript.png', width: 80 },
  { img: '/logo/react.png', width: 100 },
  { img: '/logo/docker.png', width: 120 },
  { img: '/logo/nginx.png', width: 150 },
  { img: '/logo/css.png', width: 90 },
  // { img: '/logo/express.png', width: 150 },
  { img: '/logo/html.png', width: 100 }
]

export default {
  data() {
    return {
      ROUTE,
      SKILLS
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
            s.curWidth *= w.coeff
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
