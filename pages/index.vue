<template>
  <div class="absolute-on-leave">
    <div class="md:container md:mx-auto">
      <SearchField key="search-field" />
      <PaginatedEpisodes
        v-if="episodes && episodes.length > 0"
        :current-page-number="page"
        :episodes="episodes"
        first-page-link="/"
        :search-terms="isSearching ? terms : undefined"
        :total-page-number="Math.floor((episodeCount + 9) / 10)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';

import { usePageStore } from '@/stores/PageStore';

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
const { isSearching, terms } = storeToRefs(searchStore);
const pageStore = usePageStore();

const { data: episodes, refresh: refreshEpisodes } = await useAsyncData(
  'episodes-index',
  () => {
    if (isSearching.value) {
      return searchStore.getMatchedEpisodes().then((d) => {
        const i = (page.value - 1) * 10;
        episodeCount.value = d.length;
        return d.slice(i, i + 10);
      });
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

onBeforeMount(() => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const terms = urlParams.get('search');
  if (terms && terms.length > 2) {
    // harmless if we are already seraching for these terms
    searchStore.$patch({
      terms,
    });
  }
});

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
  pageStore.savePage(page.value);
  refreshEpisodes();
});

watch([isSearching, terms], () => {
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
