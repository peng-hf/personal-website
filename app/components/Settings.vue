<template>
  <FloatingButton class="btn-floating">
    <div class="settings full-height">
      <div class="settings__header">
        <div class="settings__title">{{ t('settings.title') }}</div>
        <hr class="settings__separator" />
      </div>
      <div class="settings__row">
        {{ t(`settings.theme.${themeStore.value}`) }}
        <ToggleButton
          :width="42"
          :css-colors="true"
          :value="themeValue"
          @change="onChangeTheme"
        />
      </div>
      <div
        :class="[
          'settings__row',
          { 'settings__row--disabled-text': !uiStore.languageToggleEnabled }
        ]"
      >
        <span>{{ t('locale') }}</span>
        <ToggleButton
          :width="42"
          :css-colors="true"
          :value="localeValue"
          @change="onChangeLocale"
          :disabled="!uiStore.languageToggleEnabled"
        />
      </div>
    </div>
  </FloatingButton>
</template>

<script setup lang="ts">
import { THEME } from '~/utils/constants'

const { t, locale } = useI18n()
const themeStore = useThemeStore()
const uiStore = useUiStore()

const META_THEME_COLOR: Record<string, string> = {
  [THEME.WHITE]: '#f0f0f0',
  [THEME.DARK]: '#3E3E3E',
}

const themeValue = computed(() => themeStore.value === THEME.WHITE)
const localeValue = computed(() => locale.value === 'fr')
const metaThemeColor = computed(() => META_THEME_COLOR[themeStore.value])

useHead(() => ({
  meta: [{ name: 'theme-color', content: metaThemeColor.value }],
}))

function onChangeTheme({ value }: { value: boolean }) {
  themeStore.set(value ? THEME.WHITE : THEME.DARK)
}

function onChangeLocale({ value }: { value: boolean }) {
  locale.value = value ? 'fr' : 'en'
}
</script>

<style lang="scss" scoped>
.btn-floating {
  position: fixed;
  right: 1.5rem;
  bottom: 1.5rem;
}

.settings {
  padding: 1.6rem;
  padding-bottom: 0;
  &__header {
    text-align: right;
  }
  &__title {
    font-size: 2.3rem;
    font-weight: 600;
  }
  &__separator {
    display: inline-block;
    margin: 1rem 0;
    border: 0;
    border-top-style: solid;
    @include themify {
      border-top-color: themed('primary-brand-color');
    }
    width: 4rem;
    border-top-width: 0.4rem;
  }
  &__row {
    text-align: right;
    margin-top: 1.8rem;
    font-size: 1.3rem;
    &--disabled-text {
      cursor: no-drop;
      span {
        opacity: 0.6;
      }
    }
  }
}

.vue-js-switch {
  margin-left: 1rem;
  :deep(.v-switch-button) {
    @include themify {
      background: themed('primary-brand-color');
    }
  }
  :deep(.v-switch-core) {
    @include themify {
      background: themed('primary-background-color');
    }
  }
}
</style>
