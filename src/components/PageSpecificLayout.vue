<template>
  <div class="page full-width full-height">
    <div class="content-left">
      <template v-if="title">
        <h1>{{ title }}</h1>
        <hr class="description__separator separator" />
      </template>
      <p v-if="description" class="description__text">{{ description }}</p>
      <custom-button
        v-if="btnText && btnTo"
        class="description__btn"
        :to="btnTo"
      >
        {{ btnText }}
      </custom-button>
      <slot name="content-left" />
    </div>
    <div class="content-right">
      <slot name="content-right" />
    </div>
  </div>
</template>

<script>
// Specific generic layout for About and Skills pages
import CustomButton from '@/components/CustomButton'

export default {
  props: {
    title: String,
    description: String,
    btnText: String,
    btnTo: String
  },
  components: { CustomButton }
}
</script>
<style lang="scss" scoped>
.page {
  @include respond-to('large') {
    display: flex;
  }
}

.content-left {
  display: flex;
  flex-direction: column;

  @include respond-to('large') {
    justify-content: center;
    align-items: flex-end;
    width: 50%;
    padding: 0 5rem;
  }

  @include respond-to('medium', 'small') {
    align-items: flex-start;
    width: 100%;
    padding: 2rem 3rem;
  }
}

.description {
  &__separator {
    @include respond-to('large') {
      margin: 0.3rem 0 3rem 0;
    }

    @include respond-to('medium', 'small') {
      margin: 0.3rem 0 2rem 0;
    }
  }

  &__text {
    @include respond-to('large') {
      text-align: right;
    }

    @include respond-to('medium', 'small') {
      text-align: justify;
    }
  }

  &__btn {
    @include respond-to('large') {
      margin-top: 4rem;
    }

    @include respond-to('medium', 'small') {
      margin-top: 3rem;
    }
  }
}

.content-right {
  display: flex;

  @include respond-to('large') {
    align-items: center;
    width: 50%;
  }

  @include respond-to('medium', 'small') {
    justify-content: center;
    width: 100%;
  }
}
</style>
