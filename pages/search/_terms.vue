<template>
  <div>
    <div class="container mx-auto">
      <search :terms="searchTerms" />
      <p>
        Searching for ”<strong>{{ terms }}</strong
        >”. Found <strong> {{ episodeCount }}</strong> episode<span
          v-if="episodeCount !== 1"
          >s</span
        >.
      </p>
    </div>
    <paginated-episodes
      v-if="episodes"
      :current-page-number="page"
      :episodes="episodes"
      :total-page-number="Math.floor(episodeCount / 10)"
      :link-prefix="'/search/' + terms"
    />
    <!--
    <nuxt-child :foobar="123" />
    -->
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

import PaginatedEpisodes from '~/components/PaginatedEpisodes'
import Search from '~/components/Search'

export default {
  components: { PaginatedEpisodes, Search },
  async asyncData({ $content, store, params }) {
    // return {
    //   terms: params.terms,
    //   page: params.page,
    // }
    let page = parseInt(params.page, 10)
    if (page === 0 || isNaN(page)) {
      page = 1
    }
    const skip = page > 0 ? (page - 1) * 10 : 0
    const episodes = await $content('episodes')
      .search(params.terms)
      .sortBy('id')
      .skip(skip)
      .limit(10)
      .fetch()
    const episodeCount = (
      await $content('episodes').search(params.terms).only([]).fetch()
    ).length

    return {
      page,
      episodes,
      skip,
      episodeCount,
      terms: params.terms,
    }
  },
  computed: {
    ...mapGetters({
      searchTerms: 'searchTerms',
    }),
  },
  watch: {
    async $route() {
      let page = parseInt(this.$route.params.page, 10)
      if (page === 0 || isNaN(page)) {
        page = 1
      }
      this.skip = page > 0 ? (page - 1) * 10 : 0
      this.page = page
      this.terms = this.$route.params.terms
      this.episodes = await this.$content('episodes')
        .search(this.terms)
        .sortBy('id')
        .skip(this.skip)
        .limit(10)
        .fetch()
      this.episodeCount = (
        await this.$content('episodes').search(this.terms).only([]).fetch()
      ).length
    },
  },
}
</script>
