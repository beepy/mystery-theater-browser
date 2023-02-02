<template>
  <div v-if="episode" class="absolute-on-leave">
    <div class="align-middle inline-block min-w-full pointer-events-none">
      <div
        class="fixed bottom-4 lg:bottom-auto lg:top-28 left-0 w-full px-2 z-10"
      >
        <div class="flex max-w-5xl mx-auto">
          <TranLink
            v-if="episode.id !== 1"
            :to="'/episode/' + (parseInt(episode.id) - 1)"
            :index="parseInt(episode.id) - 1"
            nav-tag="episode"
            :depth="2"
            class="flex-shrink p-1 bg-gray-200 rounded-full shadow pointer-events-auto"
          >
            <PreviousIcon class="text-black w-8" />
          </TranLink>
          <div class="flex-grow" />
          <TranLink
            v-if="episode.id !== 1399"
            :to="'/episode/' + (parseInt(episode.id) + 1)"
            :index="parseInt(episode.id) + 1"
            nav-tag="episode"
            :depth="2"
            class="flex-shrink p-1 bg-gray-200 rounded-full shadow pointer-events-auto"
          >
            <NextIcon class="text-black w-8" />
          </TranLink>
        </div>
      </div>
    </div>
    <div class="md:container lg:max-w-4xl mx-auto transitionable">
      <div>
        <div
          class="bg-white px-4 md:rounded-lg shadow overflow-hidden transitionable pb-8 md:pb-0"
        >
          <div
            class="grid grid-cols-4 px-0 py-6 -mx-4 items-center gradient-gray"
          >
            <div class="col-span-3 pl-4 pr-6">
              <h1 class="text-2xl md:text-3xl font-bold font-fancy">
                {{ episode.title }}
              </h1>
            </div>
            <div class="pr-0 pr-4 text-right">
              <p class="text-xs mb-2">{{ episode.date }}</p>
              <EpisodeNumber :number="episode.id" />
            </div>
          </div>
          <div class="grid grid-cols-4 gap-6 my-6">
            <div class="col-span-4 md:col-span-2">
              <ContentRenderer :value="episode" />
              <EpisodeTags
                v-if="episode.tags"
                :episode-tags="episode.tags"
                class="block md:hidden text-right"
              />
            </div>
            <div class="col-span-2 md:col-span-1">
              <h2 class="font-bold">Featured Cast</h2>
              <ul>
                <li v-for="artist in episode.actors" :key="artist.id">
                  <TranLink
                    :to="'/artist/' + artist.id"
                    nav-tag="artist"
                    :depth="3"
                  >
                    {{ artist.name }}
                  </TranLink>
                </li>
              </ul>
            </div>
            <div class="col-span-2 md:col-span-1">
              <h2 class="font-bold">Written by</h2>
              <ul>
                <li v-for="artist in episode.writers" :key="artist.id">
                  <TranLink
                    :to="'/artist/' + artist.id"
                    nav-tag="artist"
                    :depth="3"
                  >
                    {{ artist.name }}
                  </TranLink>
                </li>
                <li v-if="episode.notes" class="text-xs text-gray-500 italic">
                  {{ episode.notes }}
                </li>
              </ul>
              <EpisodeTags
                v-if="episode.tags"
                :episode-tags="episode.tags"
                class="hidden md:block mt-4"
              />
            </div>
            <div
              v-if="episode.descriptionSource === 'kf'"
              class="col-span-4 text-xs"
            >
              <em class="text-gray-500">
                Description provided by
                <a
                  :href="
                    'http://www.nettally.com/keith.flowers/biblio/' +
                    String(episode.id).padStart(4, '0') +
                    '.htm'
                  "
                  target="_blank"
                  class="underline"
                  >Keith Flowers</a
                >.
              </em>
            </div>
            <div
              v-if="episode.descriptionSource !== 'nrl'"
              class="col-span-4 text-xs"
            >
              This episode has not been reviewed for recording quality.
            </div>
            <!--
            <download-options
              v-if="!showAllDownloads"
              :key="links[0].url"
              :url="links[0]"
              :episode="episode"
            />
            <download-options
              v-for="url in links"
              v-else
              :key="url.url"
              :url="url"
              :episode="episode"
            />
            <div v-if="links.length > 1" class="col-span-4 text-xs">
              <button
                v-if="showAllDownloads"
                class="rounded p-2 bg-gray-200"
                @click="toggleShowAllDownloads(false)"
              >
                Hide additional downloads
              </button>
              <button
                v-else
                class="rounded p-2 bg-gray-200"
                @click="toggleShowAllDownloads(true)"
              >
                Show additional downloads
              </button>
            </div>
            -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useNavStore } from '~/stores/NavStore';

import EpisodeNumber from '@/components/EpisodeNumber.vue';
import NextIcon from '@/assets/svg/nextIcon.svg';
import PreviousIcon from '@/assets/svg/previousIcon.svg';

const route = useRoute();
const navStore = useNavStore();
const slug = typeof route.params.slug === 'string' ? route.params.slug : '0';
const slugIndex = parseInt(slug) || 0;

const data = ref(
  await useAsyncData(`episode-${route.params.slug}`, () => {
    return queryContent(`episodes/${route.params.slug}`).findOne();
  })
);

const episode = data.value.data;

useHead({
  title: episode?.title || 'Untitled',
  meta: [{ name: 'episode description', content: 'My amazing episodes.' }],
});

// definePageMeta({
//   middleware (to, from) {
//     console.log("to mw")
//     console.log(to)
//   }
// })
// this is a macro, so we can't set anything dynamically
// definePageMeta({
//   title: 'Some Page',
//   foo: route.params.slug
// })

onMounted(() => {
  // this is really for first load, or history navigation?
  // navStore.$patch({ navTo: { tag: 'episode', depth: 2, index: slugIndex }})
  useNavStore().$patch({
    navTo: { tag: 'episode', depth: 2, index: slugIndex, path: route.path },
  });
});
</script>
