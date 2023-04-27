<template>
  <div>
    <NuxtLink
      v-for="episode in episodes"
      :key="episode.id"
      v-shared-element="{
        id: episode.id,
        role: 'container',
        type: 'episode',
      }"
      :to="'/episode/' + episode.id"
      class="grid grid-cols-12 bg-white hover:bg-gray-50 row"
      :depth="2"
      nav-tag="episode"
      :index="episode.id"
    >
      <div class="order-1 col-span-8 md:col-span-4 px-6 py-4">
        <span class="block font-bold">
          {{ episode.title }}
        </span>
        <div class="leading-tight mt-2">
          <span
            v-for="(actor, i) in episode.actors"
            :key="actor.id"
            class="text-xs"
          >
            <span v-if="i > 0">, </span>
            <span class="whitespace-nowrap">{{ actor.name }}</span>
          </span>
        </div>
      </div>
      <div
        class="order-3 md:order-2 col-span-12 md:col-span-6 xl:col-span-7 px-6 py-4"
      >
        <ContentRenderer :value="episode" class="nuxt-content" />
        <EpisodeTags
          v-if="episode.tags"
          :episode-tags="episode.tags"
          class="block text-right"
        />
      </div>
      <div
        class="order-2 md:order-3 col-span-4 md:col-span-2 xl:col-span-1 px-6 py-4 text-center"
      >
        <div class="text-xs text-center mb-2">
          {{ episode.date }}
        </div>
        <EpisodeNumber :n="episode.id || 0" />
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { Episode } from '@/types/episode';

const props = withDefaults(
  defineProps<{
    page?: number;
    isSearching?: boolean;
    terms?: string;
  }>(),
  {
    page: 1,
    isSearching: false,
  }
);

const searchStore = useSearchStore();

const { data: episodes, refresh: refreshEpisodes } = await useAsyncData(
  `episodes-index-${props.page}-${props.terms}`,
  () => {
    if (props.isSearching) {
      return searchStore.getMatchedEpisodes().then((d) => {
        const i = (props.page - 1) * 10;
        return d.slice(i, i + 10);
      });
    } else {
      return queryContent<Episode>('episodes')
        .sort({ id: 1, $numeric: true })
        .skip((props.page - 1) * 10)
        .limit(10)
        .find()
        .then((d) => {
          return d;
        });
    }
  }
);

const emit = defineEmits(['updateHeight']);

onMounted(() => {
  requestAnimationFrame(() => emit('updateHeight'));
});
</script>
