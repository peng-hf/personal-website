<template>
  <PageSpecificLayout
    :title="t('about.title')"
    :description="(tm('about.description') as string[])"
    :btn-text="t('about.btn')"
    btn-to="/skills"
  >
    <template #content-right>
      <Timeline />
    </template>
  </PageSpecificLayout>
</template>

<script setup lang="ts">
definePageMeta({ name: 'about' })

const { t, tm } = useI18n()
</script>
