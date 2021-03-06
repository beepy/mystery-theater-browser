export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'mystery-theater-browser',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    script: [
      { src: '/scripts/focus-visible.min.js', async: true, defer: true },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/app.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/noSleep.client', '@/plugins/historyAware.client'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/netlify-files',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    'nuxt-route-meta',
  ],

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {
    fullTextSearchFields: ['title', 'description', 'name', 'searchable'],
    nestedProperties: ['actors.id', 'writers.id'],
  },

  postcss: {
    plugins: {
      'postcss-focus-visible': {},
    },
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
