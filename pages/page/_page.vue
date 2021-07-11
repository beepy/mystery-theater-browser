<template>
  <div class="absolute-on-leave">
    <div class="md:container md:mx-auto">
      <search :terms="searchTerms" :count="episodeCount" />
      <paginated-episodes
        v-if="episodes"
        :current-page-number="page"
        :episodes="episodes"
        :total-page-number="Math.floor((episodeCount + 9) / 10)"
      />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
// import { store } from '~/store/index'

import PaginatedEpisodes from '~/components/PaginatedEpisodes'
import Search from '~/components/Search'

import RelativeTransitions from '~/mixins/relativeTransitions'

export default {
  components: { PaginatedEpisodes, Search },
  mixins: [RelativeTransitions],
  asyncData({ $content, store, params }) {
    let page = parseInt(params.page, 10)
    if (page < 1 || isNaN(page)) {
      page = 1
    }
    let episodes = $content('episodes')
    let episodeCount = $content('episodes').only([])
    // if (store.state.searchTerms && store.state.searchTerms.length > 2) {
    //   episodes = episodes.search(store.state.searchTerms)
    //   episodeCount = episodeCount.search(store.state.searchTerms)
    // }
    return episodeCount.fetch().then((ec) => {
      episodeCount = ec.length
      return episodes
        .sortBy('id')
        .skip((page - 1) * 10)
        .limit(10)
        .fetch()
        .then((e) => {
          episodes = e
          // store.commit('searchedTerms', store.state.searchTerms)
          return {
            page,
            episodes,
            episodeCount,
          }
        })
    })
  },
  data() {
    return {
      d1: 'hello world',
    }
  },
  head() {
    return {
      title: 'Mystery Theater Browser | MysteryTheater.org ',
    }
  },
  computed: {
    ...mapGetters({
      searchTerms: 'searchTerms',
    }),
    someIndex() {
      return 123
    },
  },
  watch: {
    searchTerms(v) {
      // console.log('perform search on page watch')
      this.performSearch(v)
      this.$store.commit('searchedTerms', '')
    },
  },
  beforeCreate() {
    // console.log('page before mount ' + this.page)
    // this.$store.commit('navTo', { tag: 'episodes', depth: 1, index: this.page })
  },
  mounted() {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const terms = urlParams.get('search')
    if (terms) {
      this.$store.commit('searchTerms', terms)
      this.$store.commit('searchedTerms', '')
      if (terms.length > 2) {
        // console.log('perform search on page mount')
        this.performSearch(terms)
      }
    }
    // this.$store.commit('navFrom', {
    //   tag: 'episodes',
    //   depth: 1,
    //   index: this.page,
    // })
  },
  middleware({ redirect, params, store }) {
    let page = parseInt(params.page, 10)
    if (page === 0) {
      page = 1
    }
    if (page === 1) {
      let l = '/'
      if (store.getters.searchTerms && store.getters.searchTerms.length > 2) {
        l = l + '?search=' + encodeURI(store.getters.searchTerms)
      }
      return redirect('301', l)
    }
  },
  methods: {
    performSearch(v) {
      let episodes = this.$content('episodes')
      let episodeCount = this.$content('episodes').only([])
      let page = this.page
      if (page < 1 || isNaN(page)) {
        page = 1
      }
      if (v.length > 2) {
        const terms = v.replace('/', ' ')
        episodes = episodes.search(terms)
        episodeCount = episodeCount.search(terms)
      }
      episodeCount.fetch().then((ec) => {
        episodeCount = ec.length
        episodes
          .sortBy('id')
          .skip((page - 1) * 10)
          .limit(10)
          .fetch()
          .then((e) => {
            this.episodes = e
            this.episodeCount = episodeCount
            this.$store.commit('searchedTerms', v)
          })
      })
    },
    performTest() {
      return 'bizbaz'
    },
  },
  // meta() {
  //   return {
  //     nav: {
  //       tag: 'episodes',
  //       depth: 1,
  //       index: this.page,
  //     },
  //   }
  // },
  meta: {
    baz: 'boz',
    foo() {
      return 'bar '
    },
  },
  route: {
    props: {
      bar: 'foo',
    },
  },
  // transition(x, y, z) {
  //   console.log('transition')
  //   console.log(z)
  //   console.log(y)
  //   console.log(x)
  //   return 'slide-right'
  // },
}
</script>
