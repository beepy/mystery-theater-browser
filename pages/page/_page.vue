<template>
  <div class="md:container md:mx-auto">
    <search :terms="searchTerms" />
    <paginated-episodes
      v-if="episodes"
      :current-page-number="page"
      :episodes="episodes"
      :total-page-number="Math.floor((episodeCount + 9) / 10)"
    />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

import PaginatedEpisodes from '~/components/PaginatedEpisodes'
import Search from '~/components/Search'

export default {
  components: { PaginatedEpisodes, Search },
  data() {},
  async asyncData({ $content, store, params }) {
    let page = parseInt(params.page, 10)
    if (page === 0 || isNaN(page)) {
      page = 1
    }
    let episodes = $content('episodes')
    let episodeCount = $content('episodes').only([])
    console.log('page asyncData ')
    console.log(store.state.searchTerms)
    if (store.state.searchTerms && store.state.searchTerms.length > 2) {
      episodes = episodes.search(store.state.searchTerms)
      episodeCount = episodeCount.search(store.state.searchTerms)
    }
    episodes = await episodes
      .sortBy('id')
      .skip((page - 1) * 10)
      .limit(10)
      .fetch()
    episodeCount = (await episodeCount.fetch()).length

    return {
      page,
      episodes,
      episodeCount,
    }
  },
  computed: {
    ...mapGetters({
      searchTerms: 'searchTerms',
    }),
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
  middleware({ redirect, params }) {
    let page = parseInt(params.page, 10)
    if (page === 0) {
      page = 1
    }
    if (page === 1) {
      return redirect('301', '/')
    }
  },
}
</script>
