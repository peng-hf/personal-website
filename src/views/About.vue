<template>
  <div class="container full-width full-height">
    <div class="description">
      <h2 class="desription__title">{{ $t('about.title') }}</h2>
      <hr class="description__separator separator" />
      <p class="description__text">{{ $t('about.description') }}</p>
      <custom-button class="description__btn" :to="ROUTE.SKILLS.PATH">
        {{ $t('about.btn') }}
      </custom-button>
    </div>
    <div class="timeline"></div>
  </div>
</template>

<script>
import { ROUTE } from '@/constants'
import CustomButton from '@/components/CustomButton'
export default {
  data: () => ({
    ROUTE
  }),
  components: { CustomButton }
}
</script>
<style lang="scss" scoped>
.container {
  display: flex;
}

.description {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  width: 50%;
  padding: 0 5rem;

  &__title {
  }

  &__separator {
    margin: 1rem 0 3rem 0;
  }

  &__text {
    text-align: right;
  }

  &__btn {
    margin-top: 4rem;
  }
}

.timeline {
  width: 50%;
}
</style>
