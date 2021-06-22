<template>
  <div class="max-w-4xl mx-auto px-4 py-8 bg-white md:rounded-lg">
    <h1 class="text-3xl text-center font-bold mb-6">{{ artist.name }}</h1>
    <div
      :class="{
        'mb-6': true,
        'grid grid-cols-2 gap-6': writer.length > 0 && actor.length > 0,
      }"
    >
      <div v-if="actor.length">
        <h2 class="font-bold">Featured In</h2>
        <ul :class="{ 'columns-2': writer.length < 1 }">
          <li v-for="episode in actor" :key="episode.id">
            <n-link
              :to="'/episode/' + episode.id"
              nav-tag="episode"
              :index="episode.id"
              :depth="2"
              class="mb-1 block"
            >
              <episode-number :number="episode.id" class="mr-1" />
              {{ episode.title }}
            </n-link>
          </li>
        </ul>
      </div>
      <div v-if="writer.length">
        <h2 class="font-bold">Writer On</h2>
        <ul :class="{ 'columns-2': actor.length < 1 }">
          <li v-for="episode in writer" :key="episode.id">
            <n-link
              :to="'/episode/' + episode.id"
              nav-tag="episode"
              :index="episode.id"
              :depth="2"
              class="mb-1 block"
            >
              <episode-number :number="episode.id" class="mr-1" />
              {{ episode.title }}
            </n-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import RelativeTransitions from '~/mixins/relativeTransitions'
import NLink from '~/components/NLink'

export default {
  components: { NLink },
  mixins: [RelativeTransitions],
  head() {
    return {
      title: this.artist.name + ' | MysteryTheater.org ',
    }
  },
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
  // beforeMount() {
  //   this.$store.commit('navTo', { tag: 'episodes', depth: 1, index: 1 })
  // },
}
</script>
