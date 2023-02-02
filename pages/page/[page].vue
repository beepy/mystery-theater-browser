<template>
  <div class="absolute-on-leave">
    <div class="md:container md:mx-auto">
      <!-- <search :terms="searchTerms" :count="episodeCount" /> -->
      <PaginatedEpisodes
        v-if="episodes"
        :current-page-number="page"
        :episodes="episodes"
        :total-page-number="Math.floor((episodeCount + 9) / 10)"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
const route = useRoute();
const pageString =
  typeof route.params.page === 'string' ? route.params.page : '1';
const page = parseInt(pageString, 10);

const { data: episodeIds } = await useAsyncData(() =>
  queryContent('episodes').only(['id']).find()
);
const episodeCount = episodeIds.value?.length ?? 0;

const { data: episodes } = await useAsyncData(() =>
  queryContent('episodes')
    .sort({ id: 1, $numeric: true })
    .skip((page - 1) * 10)
    .limit(10)
    .find()
);
</script>
