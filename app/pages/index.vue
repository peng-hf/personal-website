<template>
  <div class="home full-width full-height">
    <div class="home__content">
      <h1 class="home__title">
        <TypeWriterEffect
          :text="t('home.title-hello')"
          :blinking-delay="1800"
          tag="div"
          id="hello"
          @done="sequence"
        />
        <TypeWriterEffect
          :text="t('home.title-name')"
          ref="introNameRef"
          :manual="true"
          tag="span"
          id="intro-name"
          @done="sequence"
        />
        <TypeWriterEffect
          class="name"
          text="Philippe Eng."
          tag="span"
          ref="nameRef"
          :manual="true"
          id="name"
          @done="sequence"
        />
      </h1>
      <hr :class="['separator', { visible: animateNameDone }]" />
      <TypeWriterEffect
        class="home__subtitle"
        ref="jobRef"
        :text="t('home.job')"
        tag="p"
        :cursor-width="2"
        :manual="true"
        @done="onFinishJob"
      />
      <div :class="['home__btn', { visible: animateNameDone }]">
        <CustomButton to="/about">
          {{ t('home.btn') }}
        </CustomButton>
      </div>
    </div>
    <img
      class="home__portrait"
      alt="Portrait Philippe Eng"
      src="~/assets/images/portrait-philippe-eng.jpg"
    />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ name: 'home' })

const { t } = useI18n()
const uiStore = useUiStore()

const introNameRef = ref<{ run: () => void } | null>(null)
const nameRef = ref<{ run: () => void } | null>(null)
const jobRef = ref<{ run: () => void } | null>(null)
const animateNameDone = ref(false)

onMounted(() => {
  uiStore.setLanguageToggleEnabled(false)
})

function sequence(id: string | undefined) {
  if (id === 'hello') introNameRef.value?.run()
  else if (id === 'intro-name') nameRef.value?.run()
  else if (id === 'name') {
    animateNameDone.value = true
    jobRef.value?.run()
  }
}

function onFinishJob() {
  uiStore.setLanguageToggleEnabled(true)
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
          url('~/assets/images/portrait-philippe-eng.jpg') top center fixed;
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
        border-color: themed('primary-brand-color');
      }
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
