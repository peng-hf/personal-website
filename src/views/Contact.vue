<template>
  <page-specific-layout
    :title="$t('contact.title')"
    :description="$t('contact.description')"
  >
    <template v-slot:content-left>
      <div class="form full-width">
        <custom-input placeholder="email" />
        <custom-input placeholder="subject" />
        <custom-input :text-area="true" placeholder="message" />
      </div>
    </template>
    <template v-slot:content-right>
      <div>STUFF HERE</div>
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
.form {
  width: 80%;
  margin-top: 1.5rem;
}
</style>
