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
    <pre>{{ page.body }}</pre>
  </div>
</template>
<script>
/**
 * Cheap way to include a computed value within the body text: for a node `n`
 * and an array `r` of { search: <string>, replace: <string> }, traverses node
 * and all its children; for each text node, replaces first occurence of
 * `search` with `replace` for every element in array r.
 *
 * @param  {Object} n Root node as created by nuxt content
 * @param  {Array} r Array of search/replace items
 *
 * @return {Object}   Modified node
 */

const simpleTraverseReplace = (n, r) => {
  if (n.type === 'text') {
    for (let i = 0; i < r.length; i++) {
      n.value = n.value.replace(r[i].search, r[i].replace)
    }
  }
  if (n.children) {
    for (let i = 0; i < n.children.length; i++) {
      n.children[i] = simpleTraverseReplace(n.children[i], r)
    }
  }
  return n
}

export default {
  async asyncData({ $content, params }) {
    const page = await $content('about').fetch()
    const completedCount = (
      await $content('episodes')
        .where({ descriptionSource: 'nrl' })
        .only([])
        .fetch()
    ).length
    const percent = Math.floor((completedCount / 1399.0) * 1000) / 10
    if (page) {
      page.body = simpleTraverseReplace(page.body, [
        {
          search: '{{complete}}',
          replace: completedCount,
        },
        {
          search: '{{percent}}',
          replace: percent,
        },
      ])
      return {
        page,
        completedCount,
      }
    }
  },
  head() {
    return {
      title: 'About' + ' | MysteryTheater.org ',
    }
  },
}
</script>
