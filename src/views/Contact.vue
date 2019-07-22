<template>
  <page-specific-layout
    class="override-page-layout"
    :title="$t('contact.title')"
    :description="$t('contact.description')"
    :reverse-content="true"
  >
    <template v-slot:content-left>
      <div class="form full-width">
        <custom-input placeholder="email" />
        <custom-input placeholder="subject" />
        <custom-input :text-area="true" placeholder="message" />
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
import CustomInput from '@/components/CustomInput'

export default {
  components: { PageSpecificLayout, CustomInput }
}
</script>

<style lang="scss" scoped>
.override-page-layout {
  @include respond-to('large') {
    // Dirty but laziness took over
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
  max-width: 60rem;
  margin-top: 1.5rem;
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
