<template>
  <div>
    <div class="bg-white mb-4 px-2">
      <div class="max-w-4xl mx-auto flex items-center">
        <TranLink
          class="py-2 font-bold block flex-shrink site-title"
          :to="indexRoute"
          :depth="1"
          nav-tag="episodes"
          :index="page"
        >
          MysteryTheater.org
        </TranLink>
        <div class="flex-grow px-4 justify-items-end grid">
          <DownloadProgress />
        </div>
        <TranLink
          class="py-2 mr-4 block flex-shrink"
          to="/contact"
          :depth="1"
          nav-tag="page*"
          :index="1"
        >
          Contact
        </TranLink>
        <TranLink
          class="py-2 block flex-shrink"
          to="/about"
          :depth="1"
          nav-tag="page*"
          :index="1"
        >
          About
        </TranLink>
      </div>
    </div>
    <NuxtPage
      :transition="{
        name: transitionName,
        mode: 'out-in',
      }"
    />
    <div v-if="alwaysFalse">
      <div class="text-blue-700" />
      <div class="text-yellow-700" />
      <div class="text-red-700" />
      <div class="text-indigo-700" />
      <div class="text-pink-700" />
      <div class="text-purple-700" />
      <div class="text-pink-700" />
      <div class="text-indigo-700" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useNavStore } from '~/stores/NavStore';
import { usePageStore } from '@/stores/PageStore';
import { useSearchStore } from '@/stores/SearchStore';

const route = useRoute();
const router = useRouter();

const { navFrom, navTo } = storeToRefs(useNavStore());
const pageStore = usePageStore();
const { page, indexRoute } = storeToRefs(pageStore);
const { isSearching } = storeToRefs(useSearchStore());

const alwaysFalse = computed(() => false);

const transitionName = computed(() => {
  if (navFrom.value.tag.length && navTo.value.tag.length) {
    if (navFrom.value.tag === navTo.value.tag) {
      if (navFrom.value.index < navTo.value.index) {
        return 'slide-right';
      } else if (navFrom.value.index > navTo.value.index) {
        return 'slide-left';
      } else {
        // tag and index the same, just cross fade
      }
    } else if (navFrom.value.depth < navTo.value.depth) {
      return 'slide-top';
    } else if (navFrom.value.index > navTo.value.index) {
      return 'slide-bottom';
    } else {
      // depth the same, just cross fade
    }
  } else {
    // unknown
  }
  return 'page';
});

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk
      ? `${titleChunk} | MysteryTheater.org`
      : 'MysteryTheater.org';
  },
});

onMounted(() => {
  if (route.name === 'index' && !isSearching.value) {
    const p = pageStore.restorePage();
    if (p !== 1) {
      // getter indexRoute.value doesn't work here (don't know why)
      router.push('/page/' + p);
    }
  }
});
</script>
