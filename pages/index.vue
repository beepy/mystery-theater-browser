<template>
  <div class="absolute-on-leave">
    <div class="md:container md:mx-auto">
      <p>len: {{ episodeCount }}</p>
      <PaginatedEpisodes
        v-if="episodes && episodes.length > 0"
        :current-page-number="1"
        :episodes="episodes"
        :total-page-number="Math.floor((episodeCount + 9) / 10)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { data: episodeIds } = await useAsyncData(() =>
  queryContent('episodes').only(['id']).find()
);
const episodeCount = episodeIds.value?.length ?? 0;

const { data: episodes } = await useAsyncData(() =>
  queryContent('episodes').sort({ id: 1, $numeric: true }).limit(10).find()
);
</script>
