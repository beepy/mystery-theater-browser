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
          style="font-family: 'IM Fell Great Primer'"
        >
          MysteryTheater.org
        </n-link>
        <div class="flex-grow px-4 justify-items-end grid">
          <download-progress />
        </div>
        <n-link
          class="py-2 mr-4 block flex-shrink"
          to="/contact"
          :depth="1"
          nav-tag="page*"
          :index="1"
        >
          Contact
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
    <nuxt />
    <div v-if="alwaysFalse">
      <div class="text-blue-700" />
      <div class="text-yellow-600" />
      <div class="text-red-700" />
      <div class="text-indigo-700" />
      <div class="text-pink-700" />
      <div class="text-purple-700" />
      <div class="text-pink-700" />
      <div class="text-indigo-700" />
    </div>
  </div>
</template>
<script>
import NLink from '~/components/NLink.vue'
import DownloadProgress from '~/components/DownloadProgress'

export default {
  components: { DownloadProgress, NLink },
  data() {
    return {
      alwaysFalse: false,
    }
  },
  mounted() {
    if (localStorage && localStorage.page && this.$route.path === '/') {
      this.$router.push('/page/' + localStorage.page)
    }
  },
}
</script>
