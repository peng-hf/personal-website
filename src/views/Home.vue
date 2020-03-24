<template>
  <div class="home full-width full-height">
    <div class="home__content">
      <h1 class="home__title">
        <type-writer-effect
          :text="$t('home.title-hello')"
          :blinking-delay="1800"
          tag="div"
          id="hello"
          @done="sequence"
        />
        <type-writer-effect
          :text="$t('home.title-name')"
          ref="introName"
          :manual="true"
          tag="span"
          id="intro-name"
          @done="sequence"
        />
        <type-writer-effect
          class="name"
          text="Philippe Eng."
          tag="span"
          ref="name"
          :manual="true"
          id="name"
          @done="sequence"
        />
      </h1>
      <hr :class="['separator', { visible: animateNameDone }]" />
      <type-writer-effect
        class="home__subtitle"
        ref="job"
        :text="$t('home.job')"
        tag="p"
        :cursor-width="2"
        :manual="true"
        @done="onFinishJob"
      />
      <div :class="['home__btn', { visible: animateNameDone }]">
        <custom-button :to="ROUTE.ABOUT.PATH">
          {{ $t('home.btn') }}
        </custom-button>
      </div>
    </div>
    <img
      class="home__portrait"
      alt="Portrait Philippe Eng"
      src="@/assets/images/portrait-philippe-eng.jpg"
    />
  </div>
</template>

<script>
import { EVENT_BUS, ROUTE } from '@/constants'
import { EventBus } from '@/utils'
import CustomButton from '@/components/CustomButton'
import TypeWriterEffect from '@/components/TypeWriterEffect'

export default {
  data: () => ({
    ROUTE,
    animateNameDone: false
  }),
  mounted() {
    EventBus.$emit(EVENT_BUS.LANGUAGE_TOGGLE_ENABLED, false)
  },
  methods: {
    sequence(id) {
      const ID_TO_REF = {
        hello: 'introName',
        'intro-name': 'name',
        name: 'job'
      }
      this.$refs[ID_TO_REF[id]].run()
      if (id === 'name') this.animateNameDone = true
    },
    onFinishJob() {
      EventBus.$emit(EVENT_BUS.LANGUAGE_TOGGLE_ENABLED, true)
    }
  },
  components: { TypeWriterEffect, CustomButton }
}
</script>

<style lang="scss" scoped>
.separator {
  width: 0;
  transition: width 1s;
  &.visible {
    width: 7rem;
  }
}

.home {
  display: flex;
  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    @include respond-to('large') {
      width: 60%;
      padding-left: 6rem;
    }
    @include respond-to('medium', 'small') {
      height: 100%;
      width: 100%;
      @include themify {
        background: themed('portrait-linear-gradient'),
          url('~@/assets/images/portrait-philippe-eng.jpg') top center fixed;
        background-size: cover;
      }
    }
    @include respond-to('medium') {
      padding: 0 5rem;
    }
    @include respond-to('small') {
      padding: 0 2.7rem;
    }
  }

  &__title,
  &__subtitle {
    @include respond-to('large', 'medium') {
      margin: 2.2rem 0;
    }
    @include respond-to('small') {
      margin: 1.7rem 0;
    }
  }

  &__title {
    @include themify {
      .name {
        color: themed('primary-brand-color');
        border-color: themed('primary-brand-color'); // Override cursor color
        margin-left: 0.8rem;
      }
    }
  }

  &__name {
    @include themify {
      color: themed('primary-brand-color');
    }
  }

  &__portrait {
    width: 40%;
    object-fit: cover;
    @include respond-to('medium', 'small') {
      display: none;
    }
  }
  &__btn {
    opacity: 0;
    transform: translateY(1rem);
    transition: all 1s;
    &.visible {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
</style>
