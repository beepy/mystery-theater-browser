<template>
  <div class="container mx-auto">
    <!-- https://archive.org/details/CBSRMTKf -->
    <search />
    <div>
      <paginated-episodes
        v-if="episodes"
        :current-page-number="1"
        :episodes="episodes"
        :total-page-number="140"
      />
      <!--
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
            </div>
          </div>
        </div>
      </div>
      <pagination
        :last="140"
        :current="tablePageNumber + 1"
        :span="13"
        class="mt-6"
        >
        <template v-slot:page="{ pageNumber }">
          <div
            v-if="pageNumber !== -1 && pageNumber !== tablePageNumber + 1"
            :class="{
              'w-12 md:flex justify-center items-center hidden': true,
              'cursor-pointer': true,
              'leading-5 transition duration-150 ease-in': true,
            }"
            @click="gotoPage(pageNumber)"
          >
            <template v-if="pageNumber === -1">… </template>
            <template v-else>{{ pageNumber }} </template>
          </div>
          <div
            v-else
            :class="{
              'w-12 md:flex justify-center items-center hidden': true,
              'text-red-500': pageNumber === tablePageNumber + 1,
              'leading-5 transition duration-150 ease-in': true,
            }"
          >
            <template v-if="pageNumber === -1">… </template>
            <template v-else>{{ pageNumber }} </template>
          </div>
        </template>
      </pagination>
      -->
    </div>
  </div>
</template>

<script>
// import EpisodeNumber from '~/components/EpisodeNumber'
// import Pagination from '~/components/Pagination'
import PaginatedEpisodes from '~/components/PaginatedEpisodes'
import Search from '~/components/Search'
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
  components: { PaginatedEpisodes, Search },
  data() {
    return {
      activeEpisode: -1,
      terms: '',
      tablePageNumber: 0,
    }
  },
  async asyncData({ $content, store }) {
    const page = await $content('hello').fetch()
    const episodes = await $content('episodes').sortBy('id').limit(10).fetch()
    const episodeCount = (await $content('episodes').only([]).fetch()).length

    return {
      page,
      episodes,
      skip: 0,
      episodeCount,
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
    gotoPage(page) {
      this.tablePageNumber = page - 1
      this.$content('episodes')
        .sortBy('id')
        .skip(this.tablePageNumber * 10)
        .limit(10)
        .fetch()
        .then((d) => {
          this.episodes = d
        })
    },
  },
}
</script>
