<template>
  <div class="xabsolute-on-leave">
    <div class="md:container md:mx-auto">
      <SearchField key="search-field" />
      <!-- 
      <PaginatedEpisodes
        ref="table"
        :current-page-number="page"
        :episodes="!fetching ? episodes : null"
        first-page-link="/"
        :search-terms="isSearching ? terms : undefined"
        :total-page-number="Math.floor((episodeCount + 9) / 10)"
        @transitioned-in="scrollToTop"
      />
 -->
      <!-- 
      <div class="contextual-transition-container">
        <Transition name="contextual-transition">
          <div v-if="route.name === 'index' || route.name=== 'index-page-page'">
            <p class="bg-white">THINK I HAVE NUXTPAGE</p>
            <NuxtPage :transition="transitionProps" keep-alive />
          </div>
          <div v-else class="bg-black" style="height: 400px" />
        </Transition>
      </div>
-->
      <ContextualTransition group="episodesTable" :duration="333">
        <EpisodesTable
          :key="tableKey"
          v-relative-slide="{ value: page, type: 'episodes' }"
          :page="page"
          :is-searching="isSearching"
          :data-table-key="tableKey"
          :empty-height="height"
          @update-height="updateHeight"
        />
      </ContextualTransition>
    </div>
    <Teleport to="body">
      <EpisodePagination
        :current-page-number="page"
        first-page-link="/"
        :search-terms="isSearching ? terms : undefined"
        :total-page-number="Math.floor((episodeCount + 9) / 10)"
        style="z-index: 1000"
      />
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';

import { usePageStore } from '@/stores/PageStore';

import { Episode } from '@/types/episode';

import PaginatedEpisodes from '~~/components/PaginatedEpisodes.vue';

const route = useRoute();
const page = ref(
  parseInt(
    typeof route.params.page === 'string' ? route.params.page : '1',
    10
  ) ?? 1
);

// we are hard-coding this because of the effect the original dynamic solution
// had on build time (this is 40% faster)
const baseEpisodeCount = 20; // 1399;
// originally we fetched all IDs and get their length
// const { data: episodeIds } = await useAsyncData('episode-ids', () =>
//   queryContent('episodes').only(['id']).find()
// );

const searchStore = useSearchStore();
const { isSearching, terms, matchCount } = storeToRefs(searchStore);
const pageStore = usePageStore();
const fetching = ref(false);

// const { data: episodes, refresh: refreshEpisodes } = await useAsyncData(
//   'episodes-index',
//   () => {
//     if (isSearching.value) {
//       return searchStore.getMatchedEpisodes().then((d) => {
//         const i = (page.value - 1) * 10;
//         return d.slice(i, i + 10);
//       });
//     } else {
//       return queryContent<Episode>('episodes')
//         .sort({ id: 1, $numeric: true })
//         .skip((page.value - 1) * 10)
//         .limit(10)
//         .find()
//         .then((d) => {
//           return d;
//         });
//     }
//   }
// );

const episodeCount = computed(() => {
  if (isSearching.value && matchCount.value !== undefined) {
    return matchCount.value;
  } else {
    return baseEpisodeCount;
  }
});

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

watch(route, (newRoute) => {
  page.value =
    parseInt(
      typeof newRoute.params.page === 'string' ? newRoute.params.page : '1',
      10
    ) ?? 1;
  pageStore.savePage(page.value);
  fetching.value = true;

  // refreshEpisodes();
});

watch([isSearching, terms], () => {
  fetching.value = true;
  // refreshEpisodes();
});

// watch(episodes, () => {
//   fetching.value = false;
// });

const table = ref<null | typeof PaginatedEpisodes>(null);

function scrollToTop() {
  // disabled; in production only is always jumping to top of page on page
  // change
  if (isSearching.value) {
    // window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (table.value) {
    // table.value.scrollToTop();
  }
}

const transitionProps = useContextualTransition({
  duration: 333,
  group: 'episodes',
});

/* new attempt */
const tableKey = computed(() => `episodes-${page.value}-${terms.value}`);

const height = ref(0);

function updateHeight(h: number) {
  height.value = h;
}
</script>
