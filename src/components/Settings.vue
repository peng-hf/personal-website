<template>
  <btn-floating class="btn-floating">
    <div class="settings full-height">
      <div class="settings__header">
        <div class="settings__title">Settings</div>
        <hr class="settings__separator" />
      </div>
      <div class="settings__row">
        {{ theme.LABEL }} mode
        <toggle-button
          :width="42"
          :css-colors="true"
          :value="toggleThemeValue"
          @change="onChangeTheme"
        />
      </div>
      <div class="settings__row">
        {{ lang.LABEL }}
        <toggle-button
          :width="42"
          :css-colors="true"
          :value="toggleLangValue"
          @change="onChangeLang"
        />
      </div>
    </div>
  </btn-floating>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { THEME, LANG } from '@/constants'

import FloatingButton from '@/components/FloatingButton'
import { ToggleButton } from 'vue-js-toggle-button'

export default {
  computed: {
    ...mapState({
      theme: state => state.theme,
      lang: state => state.lang
    }),
    toggleThemeValue() {
      return this.theme.VALUE === THEME.WHITE.VALUE
    },
    toggleLangValue() {
      return this.lang.VALUE === LANG.FR.VALUE
    }
  },
  methods: {
    ...mapMutations(['updateTheme', 'updateLang']),
    onChangeTheme({ value }) {
      this.updateTheme(value ? THEME.WHITE : THEME.DARK)
    },
    onChangeLang({ value }) {
      this.updateLang(value ? LANG.FR : LANG.EN)
    }
  },
  components: {
    'btn-floating': FloatingButton,
    ToggleButton
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
  }
}

.vue-js-switch {
  margin-left: 1rem;
  /deep/ .v-switch-button {
    @include themify {
      background: themed('primary-brand-color');
    }
  }
  // &.toggled /deep/ .v-switch-button {
  //   @include themify {
  //     background: themed('secondary-background-color');
  //   }
  // }
  /deep/ .v-switch-core {
    @include themify {
      background: themed('primary-background-color');
    }
  }
}
</style>
