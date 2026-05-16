export default defineNuxtConfig({
  compatibilityDate: '2026-05-09',

  modules: [
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/eslint',
  ],

  css: [
    '~/assets/sass/vendors/index.scss',
    '~/assets/sass/base/index.scss',
    'eva-icons/style/eva-icons.css',
  ],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/sass/abstract/index.scss" as *;',
        },
      },
    },
  },

  i18n: {
    strategy: 'no_prefix',
    defaultLocale: 'en',
    locales: [
      { code: 'en', name: 'English' },
      { code: 'fr', name: 'Français' },
    ],
  },

  nitro: {
    prerender: {
      routes: ['/', '/about', '/skills', '/works', '/contact'],
    },
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Philippe Eng | Front-End Engineer',
      meta: [
        { name: 'description', content: 'Philippe Eng, Front-End Engineer crafting performant and responsive web app for minions.' },
        { name: 'author', content: 'Philippe Eng' },
        { name: 'theme-color', content: '#3E3E3E' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'canonical', href: 'https://lyfing.dev' },
      ],
    },
  },
})
