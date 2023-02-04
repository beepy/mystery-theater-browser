<template>
  <div>
    <div class="pb-20 align-middle inline-block min-w-full">
      <div
        class="shadow overflow-hidden border-b border-gray-200 md:rounded-lg bg-white transitionable"
      >
        <div class="min-w-full divide-y divide-gray-200">
          <div class="hidden md:grid grid-cols-12 bg-gray-50">
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
              <ContentRenderer :value="episode" />
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
    <div class="fixed bottom-4 left-0 w-full">
      <PaginationComponent
        :last="totalPageNumber"
        :current="currentPageNumber"
        :span="13"
        first-page-link="/"
        class="mt-6"
      >
        <template #previous="{ pageNumber }">
          <TranLink
            v-if="pageNumber > 0"
            class="h-12 w-12 mr-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer"
            :to="linkForPageNumber(pageNumber)"
            :depth="navDepth"
            :nav-tag="navTag"
            :index="pageNumber"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-chevron-left w-6 h-6"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </TranLink>
          <div
            v-else
            class="h-12 w-12 mr-1 flex justify-center items-center rounded-full bg-gray-200 opacity-25"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-chevron-left w-6 h-6"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </div>
        </template>
        <template #page="{ pageNumber }">
          <TranLink
            v-if="pageNumber !== -1 && pageNumber !== currentPageNumber"
            :class="{
              'w-12 md:flex justify-center items-center hidden': true,
              'cursor-pointer': true,
              'leading-5 transition duration-150 ease-in': true,
            }"
            :to="linkForPageNumber(pageNumber)"
            :depth="navDepth"
            :nav-tag="navTag"
            :index="pageNumber"
          >
            <template v-if="pageNumber === -1">… </template>
            <template v-else>{{ pageNumber }} </template>
          </TranLink>
          <div
            v-else
            :class="{
              'w-12 md:flex justify-center items-center hidden': true,
              'text-red-500': pageNumber === currentPageNumber,
              'leading-5 transition duration-150 ease-in': true,
            }"
          >
            <template v-if="pageNumber === -1">… </template>
            <template v-else>{{ pageNumber }} </template>
          </div>
        </template>
        <template #next="{ pageNumber }">
          <TranLink
            v-if="pageNumber > 0"
            class="h-12 w-12 mr-1 flex justify-center items-center rounded-full bg-gray-200"
            :to="linkForPageNumber(pageNumber)"
            :depth="navDepth"
            :nav-tag="navTag"
            :index="pageNumber"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-chevron-left w-6 h-6"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </TranLink>
          <div
            v-else
            class="h-12 w-12 mr-1 flex justify-center items-center rounded-full bg-gray-200 opacity-25"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-chevron-left w-6 h-6"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
        </template>
      </PaginationComponent>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    currentPageNumber?: number;
    totalPageNumber?: number;
    episodes?: any[];
    linkPrefix?: string;
    firstPageLink?: string;
    navTag?: string;
    navDepth?: number;
  }>(),
  {
    currentPageNumber: 1,
    totalPageNumber: 1,
    episodes() {
      return [];
    },
    linkPrefix: '/page',
    navTag: '',
    navDepth: 1,
  }
);

const searchTerms = '';

const linkForPageNumber = (p: string | number) => {
  const l = {
    path:
      p === 1 && props.firstPageLink
        ? props.firstPageLink
        : props.linkPrefix + '/' + p,
    query: {},
  };
  if (searchTerms && searchTerms.length > 2) {
    l.query = {
      search: searchTerms,
    };
  }
  return l;
};
</script>
