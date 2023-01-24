// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/content', '@pinia/nuxt', '@nuxtjs/tailwindcss'],
  css: ['~/assets/scss/app.scss'],
  imports: {
    dirs: ['stores'],
  },
});
