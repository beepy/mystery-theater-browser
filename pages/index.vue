<template>
  <div class="absolute-on-leave">
    <div class="md:container md:mx-auto">
      <SearchField key="search-field" />
      <!-- <pre class="bg-white">{{ terms }}</pre> -->
      <PaginatedEpisodes
        v-if="episodes && episodes.length > 0"
        :current-page-number="page"
        :episodes="episodes"
        first-page-link="/"
        :total-page-number="Math.floor((episodeCount + 9) / 10)"
      />
      <!-- <NuxtPage /> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';

const route = useRoute();
const page = ref(
  parseInt(
    typeof route.params.page === 'string' ? route.params.page : '1',
    10
  ) ?? 1
);
const { data: episodeIds } = await useAsyncData('episode-ids', () =>
  queryContent('episodes').only(['id']).find()
);
const episodeCount = ref(episodeIds.value?.length ?? 0);
const searchStore = useSearchStore();
const { isSearching, terms, matchedIds } = storeToRefs(searchStore);

const { data: episodes, refresh: refreshEpisodes } = await useAsyncData(
  'episodes-page-1-10',
  () => {
    if (isSearching.value) {
      episodeCount.value = matchedIds.value?.length ?? 0;
      return queryContent('episodes')
        .where({ id: { $in: matchedIds.value } })
        .sort({ id: 1, $numeric: true })
        .skip((page.value - 1) * 10)
        .limit(10)
        .find();
    } else {
      episodeCount.value = episodeIds.value?.length ?? 0;
      return queryContent('episodes')
        .sort({ id: 1, $numeric: true })
        .skip((page.value - 1) * 10)
        .limit(10)
        .find();
    }
  }
);

onMounted(() => {
  // const queryString = window.location.search
  // const urlParams = new URLSearchParams(queryString)
  // const terms = urlParams.get('search')
});

watch(route, (newRoute) => {
  page.value =
    parseInt(
      typeof newRoute.params.page === 'string' ? newRoute.params.page : '1',
      10
    ) ?? 1;
  refreshEpisodes();
});

watch([isSearching, terms, matchedIds], () => {
  refreshEpisodes();
});
// const search = "sci-fi";

// const { data: test } = await useAsyncData('test-search', () =>
//   queryContent('episodes').where({
//   $or: [
//       { _searchable: { $regex: `/${search}/ig` }},
//       // { description: { $regex: `/${search}/ig` }},
//       // { name: { $regex: `/${search}/ig` }},
//       // { searchable: { $regex: `/${search}/ig` }},
//     ]
//   }).only(['title']).find()
// )

// const performSearch = (v: string) => {
//   if (v.length > 2)
// }
</script>
