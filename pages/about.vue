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
    const page = await $content('about').fetch()
    const completedCount = (
      await $content('episodes')
        .where({ descriptionSource: 'nrl' })
        .only([])
        .fetch()
    ).length
    if (page) {
      return {
        page,
        completedCount,
      }
    }
  },
  head() {
    return {
      title: this.page.title + ' | MysteryTheater.org ',
    }
  },
  mounted() {
    const percent = Math.floor((this.completedCount / 1399.0) * 1000) / 10
    const el = this.$el.querySelector('.markdown-content')
    const ps = el.querySelectorAll('p')
    for (let i = 0; i < ps.length; i++) {
      const p = ps[i]
      let html = p.innerHTML
      if (html) {
        if (html.includes('{{complete}}')) {
          html = html.replace('{{complete}}', this.completedCount)
          p.innerHTML = html
        }
        if (html.includes('{{percent}}')) {
          html = html.replace('{{percent}}', percent)
          p.innerHTML = html
        }
      }
    }
  },
}
</script>
