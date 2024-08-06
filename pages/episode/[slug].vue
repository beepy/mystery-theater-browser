<template>
  <div
    v-if="episode"
    v-relative-slide="{ type: 'episode', value: episode.id }"
    class="xabsolute-on-leave"
  >
    <div class="align-middle inline-block min-w-full pointer-events-none">
      <Teleport to="body">
        <div
          class="fixed bottom-4 lg:bottom-auto lg:top-28 left-0 w-full px-2 z-10"
        >
          <div class="flex max-w-5xl mx-auto">
            <NuxtLink
              v-if="episode.id !== 1"
              :to="'/episode/' + (slugIndex - 1)"
              :index="slugIndex - 1"
              nav-tag="episode"
              :depth="2"
              class="flex-shrink p-1 bg-gray-200 rounded-full shadow pointer-events-auto"
              aria-label="Previous episode"
            >
              <PreviousIcon class="text-black w-8" />
            </NuxtLink>
            <div class="flex-grow" />
            <NuxtLink
              v-if="episode.id !== 1399"
              :to="'/episode/' + (slugIndex + 1)"
              :index="slugIndex + 1"
              nav-tag="episode"
              :depth="2"
              class="flex-shrink p-1 bg-gray-200 rounded-full shadow pointer-events-auto"
              aria-label="Next episode"
            >
              <NextIcon class="text-black w-8" />
            </NuxtLink>
          </div>
        </div>
      </Teleport>
    </div>
    <div class="md:container lg:max-w-4xl mx-auto xtransitionable">
      <div
        v-shared-element="{
          id: episode.id,
          role: 'container',
          type: 'episode',
        }"
      >
        <div
          class="bg-white px-4 md:rounded-lg shadow overflow-hidden xtransitionable pb-8 md:pb-0"
        >
          <div
            class="grid grid-cols-4 px-0 py-6 -mx-4 items-center gradient-gray"
          >
            <div class="col-span-3 pl-4 pr-6">
              <h1
                v-shared-element="{
                  id: episode.id,
                  role: 'title',
                  type: 'episode',
                }"
                class="text-2xl md:text-3xl font-bold font-fancy"
              >
                {{ episode.title }}
              </h1>
            </div>
            <div class="pr-4 text-right">
              <p class="text-xs mb-2">{{ episode.date }}</p>
              <EpisodeNumber :n="episode.id" />
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
                <li
                  v-for="artist in episode.actors"
                  :key="artist.id"
                  v-shared-element="{
                    id: artist.id,
                    role: 'name',
                    type: 'artist',
                  }"
                >
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
                <li
                  v-for="artist in episode.writers"
                  :key="artist.id"
                  v-shared-element="{
                    id: artist.id,
                    role: 'name',
                    type: 'artist',
                  }"
                >
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
            <DownloadOptions
              v-if="!showAllDownloads"
              :key="links[0].url"
              :url="links[0]"
              :episode="episode"
            />
            <DownloadOptions
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { type Episode } from '~/types/episode';

import { useNavStore } from '~/stores/NavStore';

import allSources from '~/data/sources';

import EpisodeNumber from '@/components/EpisodeNumber.vue';
import NextIcon from '@/assets/svg/nextIcon.svg';
import PreviousIcon from '@/assets/svg/previousIcon.svg';

type UrlInfo = {
  url: string;
  quality: number;
  sourceTag: string;
  source: string;
  sourceLink: string;
  filename: string;
};

const route = useRoute();
const navStore = useNavStore();
const slug = typeof route.params.slug === 'string' ? route.params.slug : '0';
const slugIndex = ref(parseInt(slug, 10) || 0);
const showAllDownloads = ref(false);

const { data: episode } = await useAsyncData(
  `episode-${route.params.slug}`,
  () => {
    return queryContent<Episode>(`episodes/${route.params.slug}`).findOne();
  }
);

const links = computed((): UrlInfo[] => {
  const quality = allSources.map((s) => s.slug);

  // human readable version of sources
  const source = allSources.map((s) => s.title);

  // reference link for sources
  const sourceLink = allSources.map((s) => s.url);

  // first we map them
  if (episode.value?.urls) {
    const urls = episode.value.urls.map((u: any) => {
      let i = quality.indexOf(u.source);
      let q = i;
      let cleanUrlFile = u.url.substring(u.url.lastIndexOf('/') + 1);

      cleanUrlFile = decodeURIComponent(cleanUrlFile).replace('.mp3', '');

      if (i < 0) {
        i = 10;
        q = 3;
      }
      if (u.quality && parseInt(u.quality, 10) > 0) {
        q = 2;
      }
      const urlInfo: UrlInfo = {
        url: u.url,
        quality: q,
        sourceTag: u.source,
        source: source[i],
        sourceLink: sourceLink[i] ?? 'missing source',
        filename:
          String(episode.value?.id).padStart(4, '0') +
          ' ' +
          episode.value?.title +
          ' (' +
          cleanUrlFile +
          ').mp3',
      };
      return urlInfo;
    });

    // then we sort them
    return urls.sort((a: UrlInfo, b: UrlInfo) => {
      if (a.quality < b.quality) {
        return -1;
      } else if (a.quality > b.quality) {
        return 1;
      } else {
        return 0;
      }
    });
  } else {
    return [];
  }
});

useHead({
  title: episode.value?.title || 'Untitled',
  meta: [{ name: 'description', content: episode.value?.description || '' }],
});

onMounted(() => {
  // this is really for first load, or history navigation?
  // navStore.$patch({ navTo: { tag: 'episode', depth: 2, index: slugIndex }})
  useNavStore().$patch({
    navTo: {
      tag: 'episode',
      depth: 2,
      index: slugIndex.value,
      path: route.path,
    },
  });
});

const toggleShowAllDownloads = (v: boolean | undefined) =>
  (showAllDownloads.value = v === undefined ? !showAllDownloads.value : v);
</script>
