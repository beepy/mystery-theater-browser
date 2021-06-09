<template>
  <div class="absolute-on-leave">
    <div class="md:container md:mx-auto">
      <!-- https://archive.org/details/CBSRMTKf -->
      <search :terms="searchTerms" :count="episodeCount" />
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

import RelativeTransitions from '~/mixins/relativeTransitions'

export default {
  components: { PaginatedEpisodes, Search },
  mixins: [RelativeTransitions],
  asyncData({ $content, store }) {
    // const page = await $content('hello').fetch()
    let episodes = $content('episodes')
    let episodeCount = $content('episodes').only([])
    // const st = store.state.searchTerms
    // if (store.state.searchTerms && store.state.searchTerms.length > 2) {
    //   episodes = episodes.search(st)
    //   episodeCount = episodeCount.search(st)
    // }
    return episodeCount.fetch().then((ec) => {
      episodeCount = ec.length
      return episodes
        .sortBy('id')
        .limit(10)
        .fetch()
        .then((e) => {
          episodes = e
          // store.commit('searchedTerms', store.state.searchTerms)
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
      searchedTerms: 'searchedTerms',
    }),
  },
  watch: {
    searchTerms(v) {
      console.log('performSearch on index watch')
      this.performSearch(v)
      this.$store.commit('searchedTerms', '')
    },
  },
  beforeMount() {
    this.$store.commit('navTo', { tag: 'episodes', depth: 1, index: 1 })
  },
  mounted() {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const terms = urlParams.get('search')
    if (terms) {
      this.$store.commit('searchTerms', terms)
      this.$store.commit('searchedTerms', '')
      if (terms.length > 2) {
        console.log('performSearch on index mount')
        this.performSearch(terms)
      }
    }
  },
  methods: {
    performSearch(v) {
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
            this.episodes = e
            this.episodeCount = episodeCount
            this.$store.commit('searchedTerms', v)
          })
      })
    },
  },
}
</script>
