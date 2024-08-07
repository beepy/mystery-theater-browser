// https://nuxt.com/docs/api/configuration/nuxt-config

import svgLoader from 'vite-svg-loader';

export default defineNuxtConfig({
  app: {
    // pageTransition: { name: 'page', mode: 'out-in' },
    // pageTransition: useContextualTransition(),
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },

  modules: [
    '@nuxt/content',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    'nuxt-contextual-transition',
  ],

  css: ['~/assets/scss/app.scss'],

  imports: {
    dirs: ['stores'],
  },

  vite: {
    plugins: [svgLoader({})],
    server: {
      fs: {
        strict: false,
      },
    },
  },

  compatibilityDate: '2024-08-05',
});
