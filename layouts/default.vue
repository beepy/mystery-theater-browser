<template>
  <div>
    <div class="bg-white mb-4 px-2">
      <div class="max-w-4xl mx-auto flex items-center">
        <n-link
          class="py-2 font-bold block flex-shrink"
          to="/"
          :depth="1"
          nav-tag="episodes"
          :index="1"
        >
          MysteryTheater.org
        </n-link>
        <div class="flex-grow px-4 justify-items-end grid">
          <download-progress />
        </div>
        <n-link
          class="py-2 block flex-shrink"
          to="/about"
          :depth="1"
          nav-tag="page*"
          :index="1"
        >
          About
        </n-link>
      </div>
    </div>
    <Nuxt />
  </div>
</template>
<script>
import NLink from '~/components/NLink.vue'
import DownloadProgress from '~/components/DownloadProgress'

export default {
  components: { DownloadProgress, NLink },
}
</script>
<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  /*@apply bg-yellow-500;*/
  @apply bg-gray-800;
  overflow-x: hidden;
}
body {
  overflow-x: hidden;
}
</style>
