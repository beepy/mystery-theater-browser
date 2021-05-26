<template>
  <div class="container mx-auto">
    <h1 class="text-3xl">{{ episode.title }}</h1>
    <nuxt-content :document="episode" />
    <ul>
      <li v-for="actor in actors" :key="actor.ID">
        {{ actor.Name }}
      </li>
    </ul>
    <audio controls class="w-full">
      <source :src="episode.url" type="audio/mpeg" />
    </audio>
  </div>
</template>
<script>
export default {
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
    const artists = await $content('artists').fetch()
    return {
      episode,
      artists,
    }
  },
}
</script>
