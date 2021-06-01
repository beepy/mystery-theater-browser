<template>
  <div class="md:container md:mx-auto px-4 py-8 bg-white md:rounded-lg">
    <h1 class="text-3xl text-center font-bold mb-6">{{ artist.name }}</h1>
    <div class="grid grid-cols-2 gap-6 mb-6">
      <div v-if="actor.length">
        <h2 class="font-bold">Appears In</h2>
        <ul>
          <li v-for="episode in actor" :key="episode.id">
            <nuxt-link :to="'/episode/' + episode.id" class="mb-1 block">
              <episode-number :number="episode.id" class="mr-1" />
              {{ episode.title }}
            </nuxt-link>
          </li>
        </ul>
      </div>
      <div v-if="writer.length">
        <h2 class="font-bold">Writer On</h2>
        <ul>
          <li v-for="episode in writer" :key="episode.id">
            <nuxt-link :to="'/episode/' + episode.id">
              {{ episode.title }}
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  async asyncData({ $content, store, params }) {
    const artist = await $content('artists/' + params.slug).fetch()
    /*
    const products = await this.$content('products').where({ 'categories.slug': { $contains: 'top' } }).fetch()

    const products = await this.$content('products').where({ 'categories.slug': { $contains: ['top', 'woman'] } }).fetch()
     */
    const actor = await $content('episodes')
      .where({
        'actors.id': { $contains: artist.id },
      })
      .sortBy('id')
      .fetch()
    const writer = await $content('episodes')
      .where({
        'writers.id': { $contains: artist.id },
      })
      .sortBy('id')
      .fetch()
    return {
      artist,
      actor,
      writer,
    }
  },
}
</script>
