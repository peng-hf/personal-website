<template>
  <page-specific-layout
    class="override-page-layout"
    :title="$t('contact.title')"
    :description="$t('contact.description')"
    :reverse-content="true"
  >
    <template v-slot:content-left>
      <div class="form full-width">
        <contact-form />
      </div>
    </template>
    <template v-slot:content-right>
      <img
        class="contact__img full-width full-height"
        alt="portrait"
        src="@/assets/images/contact.jpg"
      />
    </template>
  </page-specific-layout>
</template>

<script>
import PageSpecificLayout from '@/components/PageSpecificLayout'
import ContactForm from '@/components/ContactForm'

export default {
  components: { PageSpecificLayout, ContactForm }
}
</script>

<style lang="scss" scoped>
.override-page-layout {
  @include respond-to('large') {
    // Dirty but laziness took me over
    /deep/ .content-left {
      width: 60%;
    }
    /deep/ .content-right {
      width: 40%;
    }
  }
}
.form {
  width: 100%;
  margin-top: 1.5rem;
  @include respond-to('large') {
    max-width: 60rem;
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
