<template>
  <div
    :class="[
      'page',
      'full-width',
      'full-height',
      { 'reverse-content': reverseContent }
    ]"
  >
    <div class="content-left">
      <template v-if="title">
        <div class="description__title">
          <h1>{{ title }}</h1>
          <hr class="description__separator separator" />
        </div>
      </template>
      <p
        v-if="description"
        class="description__text"
        v-html="descriptionFormatted"
      ></p>
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
// Specific generic layout for About, Skills and Contact pages
import CustomButton from '@/components/CustomButton'

export default {
  props: {
    title: String,
    description: [String, Array],
    btnText: String,
    btnTo: String,
    reverseContent: {
      type: Boolean,
      default: false
    }
  },
  components: { CustomButton },
  computed: {
    descriptionFormatted() {
      if (Array.isArray(this.description)) {
        return this.description.map(paragraph => (paragraph += '\n\n')).join('')
      }
      return this.description
    }
  }
}
</script>
<style lang="scss" scoped>
.page {
  @include respond-to('large') {
    display: flex;
  }
}

.reverse-content {
  .content-left {
    order: 2;
    align-items: flex-start;
  }
  .content-right {
    order: 1;
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
  &__title {
    position: relative;
    @include respond-to('large') {
      margin-bottom: 3.5rem;
    }
    @include respond-to('medium', 'small') {
      margin-bottom: 2rem;
    }
  }
  &__separator {
    position: absolute;
    right: 0;
  }

  .reverse-content &__text {
    text-align: left;
  }

  &__text {
    @include respond-to('large') {
      text-align: right;
    }

    // Nesting deep because of v-html
    /deep/ a,
    /deep/ span {
      font-weight: 600;
      @include themify {
        color: themed('primary-brand-color');
      }
    }

    /deep/ a {
      text-decoration: none;
      &:hover {
        border-bottom-width: 2px;
        border-bottom-style: solid;
        @include themify {
          border-bottom-color: themed('primary-brand-color');
        }
      }
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
