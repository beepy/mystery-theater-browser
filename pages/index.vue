<template>
  <div class="container mx-auto">
    <div>
      <a
        href="https://archive.org/download/cbs_radio_mystery_theater/cbs_radio_mystery_theater-0701-0750.zip/cbs_radio_mystery_theater-0701-0750%2Fcbsrmt_0749_neatness_counts.mp3"
      >
        Test Link
      </a>
      <nuxt-content :document="page" />
      <input
        v-model="terms"
        @change="search"
        placeholder="Search"
        class="
          px-3
          py-3
          mb-4
          placeholder-blueGray-300
          text-blueGray-600
          relative
          bg-white
          rounded
          text-sm
          border-0
          shadow
          outline-none
          focus:outline-none
          focus:ring
          w-full
        "
      />
      <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div
            class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
          >
            <div
              class="
                shadow
                overflow-hidden
                border-b border-gray-200
                sm:rounded-lg
              "
            >
              <div class="min-w-full divide-y divide-gray-200">
                <div class="grid grid-cols-12 bg-gray-50">
                  <div
                    class="
                      px-6
                      py-3
                      text-left text-xs
                      font-medium
                      text-gray-500
                      uppercase
                      tracking-wider
                      col-span-4
                    "
                  >
                    Title
                  </div>
                  <div
                    class="
                      px-6
                      py-3
                      text-left text-xs
                      font-medium
                      text-gray-500
                      uppercase
                      tracking-wider
                      col-span-6
                    "
                  >
                    Description
                  </div>
                  <div
                    class="
                      px-6
                      py-3
                      text-center text-xs
                      font-medium
                      text-gray-500
                      uppercase
                      tracking-wider
                      col-span-2
                    "
                  >
                    Episode
                  </div>
                </div>
                <nuxt-link
                  v-for="episode in episodes"
                  :key="episode.slug"
                  :to="'/episode/' + episode.slug"
                  class="grid grid-cols-12"
                >
                  <div class="col-span-4 px-6 py-4">
                    <span class="block font-bold">
                      {{ episode.title }}
                    </span>
                    <div class="leading-tight mt-2">
                      <span
                        v-for="(actor, i) in episode.actors"
                        :key="actor.id"
                        class="text-xs"
                      >
                        <span v-if="i > 0">,</span>
                        <span class="whitespace-nowrap">{{ actor.name }}</span>
                      </span>
                    </div>
                  </div>
                  <div class="col-span-6 px-6 py-4">
                    <nuxt-content :document="episode" />
                  </div>
                  <div class="col-span-2 px-6 py-4 text-center">
                    <div class="text-xs text-center mb-2">
                      {{ episode.date }}
                    </div>
                    <episode-number :number="episode.id" />
                  </div>
                </nuxt-link>
              </div>
              <!--
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="
                        px-6
                        py-3
                        text-left text-xs
                        font-medium
                        text-gray-500
                        uppercase
                        tracking-wider
                      "
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      class="
                        px-6
                        py-3
                        text-left text-xs
                        font-medium
                        text-gray-500
                        uppercase
                        tracking-wider
                      "
                    >
                      Description
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="(episode, i) in episodes" :key="episode.slug">
                    <td class="px-6 py-4">
                      <div class="text-xs">{{ episode.date }}</div>
                      <a :href="episode.url" target="_blank">
                        {{ episode.title }}
                      </a>
                    </td>
                    <td class="px-6 py-4">
                      <nuxt-content :document="episode" />
                    </td>
                    <td class="px-6 py-4">
                      <div v-if="activeEpisode === episode.slug">
                        <a :href="links[i]" target="_blank">Download</a>
                        <audio controls>
                          <source :src="links[i]" type="audio/mpeg" />
                        </audio>
                      </div>
                      <nuxt-link v-else :to="'/episode/' + episode.slug">
                        {{ episode.slug }}
                      </nuxt-link>
                    </td>
                  </tr>
                </tbody>
              </table>
              -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <button @click="more">Get More</button>
  </div>
</template>

<script>
import EpisodeNumber from '~/components/EpisodeNumber'

/*
const slugify = function (s, separator = '-') {
  return (
    s
      // split an accented letter in the base letter and the acent    .toString()
      .normalize('NFD')
      // remove all previously split accents
      .replace(/[\u0300-\u036F]/g, '')
      .toLowerCase()
      .trim()
      // remove all chars not letters, numbers and spaces (to be replaced)
      .replace(/[^a-z0-9 ]/g, '')
      .replace(/\s+/g, separator)
  )
}
*/

export default {
  components: { EpisodeNumber },
  data() {
    return {
      activeEpisode: -1,
      terms: '',
    }
  },
  async asyncData({ $content, store }) {
    const page = await $content('hello').fetch()
    const episodes = await $content('episodes').sortBy('id').limit(10).fetch()
    return {
      page,
      episodes,
      skip: 0,
    }
  },
  methods: {
    async more() {
      this.skip = this.skip + 10
      const episodes = await this.$content('episodes')
        .sortBy('id')
        .skip(this.skip)
        .limit(10)
        .fetch()
      this.episodes = episodes
    },
    search() {
      if (this.terms.length > 2) {
        this.$content('episodes')
          .search(this.terms)
          .sortBy('id')
          .fetch()
          .then((d) => {
            this.episodes = d
          })
      }
    },
  },
}
</script>
