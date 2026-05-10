<template>
  <page-specific-layout
    :title="$t('about.title')"
    :description="$t('about.description')"
    :btnText="$t('about.btn')"
    :btnTo="ROUTE.SKILLS.PATH"
  >
    <template v-slot:content-right>
      <timeline />
    </template>
  </page-specific-layout>
</template>

<script>
import { ROUTE } from '@/constants'

import PageSpecificLayout from '@/components/PageSpecificLayout'
import Timeline from '@/components/Timeline'

export default {
  data: () => ({
    ROUTE
  }),
  components: { PageSpecificLayout, Timeline }
}
</script>
