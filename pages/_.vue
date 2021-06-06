<template>
  <div
    class="
      md:container
      md:mx-auto
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
}
</script>
