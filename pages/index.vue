<template>
  <div class="container mx-auto">
    <!-- https://archive.org/details/CBSRMTKf -->
    <search :terms="searchTerms" :count="episodeCount" />
    <div>
      <paginated-episodes
        v-if="episodes && episodes.length > 0"
        :current-page-number="1"
        :episodes="episodes"
        :total-page-number="Math.floor((episodeCount + 9) / 10)"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import PaginatedEpisodes from '~/components/PaginatedEpisodes'
import Search from '~/components/Search'

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
    // const page = await $content('hello').fetch()
    let episodes = $content('episodes')
    let episodeCount = $content('episodes').only([])

    if (store.state.searchTerms && store.state.searchTerms.length > 2) {
      episodes = episodes.search(store.state.searchTerms)
      episodeCount = episodeCount.search(store.state.searchTerms)
    }
    episodes = await episodes.sortBy('id').limit(10).fetch()
    episodeCount = (await episodeCount.fetch()).length

    return {
      page: 1,
      episodes,
      skip: 0,
      episodeCount,
    }
  },
  computed: {
    ...mapGetters({
      searchTerms: 'searchTerms',
    }),
  },
  mounted() {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const terms = urlParams.get('search')
    let page = urlParams.get('page')
    if (terms && terms !== this.searchTerms) {
      if (!page) {
        page = 1
      }
      this.$store.commit('searchTerms', terms)
    }
  },
  watch: {
    async searchTerms(v) {
      let episodes = this.$content('episodes')
      let episodeCount = this.$content('episodes').only([])

      if (v.length > 2) {
        const terms = v.replace('/', ' ')
        episodes = episodes.search(terms)
        episodeCount = episodeCount.search(terms)
      }
      episodes = await episodes.sortBy('id').limit(10).fetch()
      episodeCount = (await episodeCount.fetch()).length
      this.page = 0
      this.skip = 10
      this.episodes = episodes
      this.episodeCount = episodeCount
    },
  },
}
</script>
