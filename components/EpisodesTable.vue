<template>
  <div class="pb-20 align-middle inline-block min-w-full">
    <div
      class="shadow overflow-hidden border-b border-gray-200 md:rounded-lg bg-white transitionable"
    >
      <div class="min-w-full divide-y divide-gray-200">
        <div ref="header" class="hidden md:grid grid-cols-12 bg-gray-50">
          <div
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider col-span-4"
          >
            Title/Cast
          </div>
          <div
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider col-span-6 xl:col-span-7"
          >
            Description
          </div>
          <div
            class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider col-span-2 xl:col-span-1"
          >
            Episode
          </div>
        </div>
        <TranLink
          v-for="episode in episodes"
          :key="episode.id"
          :to="'/episode/' + episode.id"
          class="grid grid-cols-12 hover:bg-gray-50 row"
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
            <EpisodeNumber :number="episode.id" />
          </div>
        </TranLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Episode } from '@/types/episode';

const props = defineProps<{
  episodes: Episode[];
}>();
</script>
