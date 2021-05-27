<template>
  <div class="container mx-auto">
    <p>
      <nuxt-link to="/">Home</nuxt-link>
    </p>
    <div class="grid grid-cols-4 gap-6 mb-6 p-6 bg-gray-200">
      <div class="col-span-3">
        <h1 class="text-3xl font-bold">{{ episode.title }}</h1>
      </div>
      <div>
        <div class="text-xs">{{ episode.date }}</div>
        <episode-number :number="episode.id" />
      </div>
    </div>
    <div class="grid grid-cols-4 gap-6 mb-6">
      <div class="col-span-2">
        <nuxt-content :document="episode" />
      </div>
      <div>
        <h2 class="font-bold">Cast</h2>
        <ul>
          <li v-for="artist in episode.actors" :key="artist.id">
            <nuxt-link :to="'/artist/' + artist.id">
              {{ artist.name }}
            </nuxt-link>
          </li>
        </ul>
      </div>
      <div>
        <h2 class="font-bold">Writer</h2>
        <ul>
          <li v-for="artist in episode.writers" :key="artist.id">
            <nuxt-link :to="'/artist/' + artist.id">
              {{ artist.name }}
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
    <audio controls class="w-full">
      <source :src="episode.url" type="audio/mpeg" />
    </audio>
    <p v-if="episode.id < 1399">
      <nuxt-link :to="'/episode/' + (episode.id + 1)">Next</nuxt-link>
    </p>
  </div>
</template>
<script>
import EpisodeNumber from '~/components/EpisodeNumber'
export default {
  components: { EpisodeNumber },
  computed: {
    actors() {
      if (this.episode && this.episode.actors && this.artists) {
        return this.artists.body.filter((a) => {
          return this.episode.actors.includes(parseInt(a.ID))
        })
      } else {
        return []
      }
    },
  },
  async asyncData({ $content, store, params }) {
    const episode = await $content('episodes/' + params.slug).fetch()
    // const artists = await $content('artists').fetch()
    return {
      episode,
      // artists,
    }
  },
}
</script>
