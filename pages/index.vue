<template>
  <div class="md:container md:mx-auto">
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
  asyncData({ $content, store }) {
    // const page = await $content('hello').fetch()
    let episodes = $content('episodes')
    let episodeCount = $content('episodes').only([])
    const st = store.state.searchTerms
    if (store.state.searchTerms && store.state.searchTerms.length > 2) {
      episodes = episodes.search(st)
      episodeCount = episodeCount.search(st)
    }
    console.log('fetching index')
    return episodeCount.fetch().then((ec) => {
      episodeCount = ec.length
      return episodes
        .sortBy('id')
        .limit(10)
        .fetch()
        .then((e) => {
          episodes = e
          console.log('got episodes')
          store.commit('searchedTerms', store.state.searchTerms)
          return {
            page: 1,
            episodes,
            skip: 0,
            episodeCount,
          }
        })
    })
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
    searchTerms(v) {
      let episodes = this.$content('episodes')
      let episodeCount = this.$content('episodes').only([])

      if (v.length > 2) {
        const terms = v.replace('/', ' ')
        episodes = episodes.search(terms)
        episodeCount = episodeCount.search(terms)
      }
      episodeCount.fetch().then((ec) => {
        episodeCount = ec.length
        episodes
          .sortBy('id')
          .limit(10)
          .fetch()
          .then((e) => {
            this.page = 0
            this.skip = 10
            this.episodes = e
            this.episodeCount = episodeCount
            // this.searchedTerms = v
            this.$store.commit('searchedTerms', v)
          })
      })
    },
  },
}
</script>
