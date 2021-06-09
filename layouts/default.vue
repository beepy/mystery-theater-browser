<template>
  <div>
    <div class="bg-white mb-4 px-2">
      <div class="container mx-auto flex">
        <n-link
          class="py-2 font-bold block flex-grow"
          to="/"
          :depth="1"
          nav-tag="episodes"
          :index="1"
        >
          MysteryTheater.org
        </n-link>
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

export default {
  components: { NLink },
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
}
</style>
