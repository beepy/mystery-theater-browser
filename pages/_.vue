<template>
  <!-- md:container -->
  <div
    class="
      max-w-4xl
      mx-auto
      bg-white
      md:mt-10
      p-8
      md:rounded-lg
      shadow
      overflow-hidden
    "
  >
    <nuxt-content :document="page" class="markdown-content" />
  </div>
</template>
<script>
export default {
  async asyncData({ $content, params }) {
    const page = await $content(params.pathMatch).fetch()
    console.log(params)
    if (page) {
      return {
        page,
      }
    }
  },
  head() {
    return {
      title: this.page.title + ' | MysteryTheater.org ',
    }
  },
}
</script>
