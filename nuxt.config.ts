// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
 modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss'
  ],
 css: [
   '~/assets/scss/app.scss'
 ]
})
