<template>
  <page-specific-layout
    :title="$t('skills.title')"
    :description="$t('skills.description')"
    :btnText="$t('skills.btn')"
    :btnTo="ROUTE.WORKS.PATH"
  >
    <template v-slot:content-right></template>
  </page-specific-layout>
</template>

<script>
import { ROUTE } from '@/constants'

import PageSpecificLayout from '@/components/PageSpecificLayout'

export default {
  data: () => ({
    ROUTE
  }),
  components: { PageSpecificLayout }
}
</script>
