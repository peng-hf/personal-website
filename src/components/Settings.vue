<template>
  <btn-floating class="btn-floating">
    <div class="settings full-height">
      <div class="settings__header">
        <div class="settings__title">{{ $t('settings.title') }}</div>
        <hr class="settings__separator" />
      </div>
      <div class="settings__row">
        {{ $t(`settings.theme.${theme}`) }}
        <toggle-button
          :width="42"
          :css-colors="true"
          :value="themeValue"
          @change="onChangeTheme"
        />
      </div>
      <div
        :class="[
          'settings__row',
          { 'settings__row--disabled-text': !languageToggleEnabled }
        ]"
      >
        <span>{{ $t('locale') }}</span>
        <toggle-button
          :width="42"
          :css-colors="true"
          :value="localeValue"
          @change="onChangeLocale"
          :disabled="!languageToggleEnabled"
        />
      </div>
    </div>
  </btn-floating>
</template>

<script>
import { mapState } from 'vuex'
import { THEME, EVENT_BUS } from '@/constants'

import { EventBus } from '@/utils'
import FloatingButton from '@/components/FloatingButton'
import { ToggleButton } from 'vue-js-toggle-button'

const META_THEME_COLOR = {
  [THEME.WHITE]: '#f0f0f0',
  [THEME.DARK]: '#3E3E3E'
}
export default {
  computed: {
    ...mapState({
      theme: state => state.theme,
      lang: state => state.lang
    }),
    themeValue() {
      return this.theme === THEME.WHITE
    },
    localeValue() {
      return this.$i18n.locale === 'fr'
    }
  },
  data: () => ({
    languageToggleEnabled: true
  }),
  created() {
    EventBus.$on(EVENT_BUS.LANGUAGE_TOGGLE_ENABLED, bool => {
      this.languageToggleEnabled = bool
    })
  },
  methods: {
    onChangeTheme({ value }) {
      const metaThemeColor = document.querySelector('meta[name=theme-color]')
      const theme = value ? THEME.WHITE : THEME.DARK
      metaThemeColor.setAttribute('content', META_THEME_COLOR[theme])
      this.$store.commit('theme', theme)
    },
    onChangeLocale({ value }) {
      this.$i18n.locale = value ? 'fr' : 'en'
    }
  },
  components: {
    'btn-floating': FloatingButton,
    ToggleButton
  },
  destroyed() {
    EventBus.$off(EVENT_BUS.LANGUAGE_TOGGLE_ENABLED)
  }
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
  /deep/ .v-switch-button {
    @include themify {
      background: themed('primary-brand-color');
    }
  }
  /deep/ .v-switch-core {
    @include themify {
      background: themed('primary-background-color');
    }
  }
}
</style>
