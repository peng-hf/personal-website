<template>
  <PageSpecificLayout
    class="override-page-layout"
    :title="t('contact.title')"
    :description="(tm('contact.description') as string[])"
    :reverse-content="true"
  >
    <template #content-left>
      <div class="form full-width">
        <ContactForm />
      </div>
    </template>
    <template #content-right>
      <img
        class="contact__img full-width full-height"
        alt="portrait"
        src="~/assets/images/contact.jpg"
      />
    </template>
  </PageSpecificLayout>
</template>

<script setup lang="ts">
definePageMeta({ name: 'contact' })

const { t, tm } = useI18n()
</script>

<style lang="scss" scoped>
.override-page-layout {
  @include respond-to('large') {
    :deep(.content-left) {
      width: 60%;
    }
    :deep(.content-right) {
      width: 40%;
    }
  }
}

.form {
  width: 100%;
  margin-top: 1.5rem;
  @include respond-to('large') {
    max-width: 70rem;
  }
}

.contact {
  &__img {
    object-fit: cover;
    @include respond-to('medium', 'small') {
      display: none;
    }
    @include themify {
      filter: brightness(#{themed('contact-img-brightness')});
    }
  }
}
</style>
