<template>
  <div>
    <paginated-episodes
      v-if="episodes"
      :current-page-number="tablePageNumber"
      :episodes="episodes"
      :total-page-number="140"
    />
  </div>
</template>
<script>
import PaginatedEpisodes from '~/components/PaginatedEpisodes'

export default {
  components: { PaginatedEpisodes },
  data() {},
  async asyncData({ $content, store, params }) {
    let page = parseInt(params.page, 10)
    if (page === 0) {
      page = 1
    }
    const episodes = await $content('episodes')
      .sortBy('id')
      .skip((page - 1) * 10)
      .limit(10)
      .fetch()
    const episodeCount = (await $content('episodes').only([]).fetch()).length

    return {
      tablePageNumber: page,
      episodes,
      episodeCount,
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
