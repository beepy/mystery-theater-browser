<template>
  <div>
    <div class="">
      <div class="">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div
            class="
              shadow
              overflow-hidden
              border-b border-gray-200
              sm:rounded-lg
            "
          >
            <div class="min-w-full divide-y divide-gray-200">
              <div class="grid grid-cols-12 bg-gray-50">
                <div
                  class="
                    px-6
                    py-3
                    text-left text-xs
                    font-medium
                    text-gray-500
                    uppercase
                    tracking-wider
                    col-span-4
                  "
                >
                  Title
                </div>
                <div
                  class="
                    px-6
                    py-3
                    text-left text-xs
                    font-medium
                    text-gray-500
                    uppercase
                    tracking-wider
                    col-span-6
                  "
                >
                  Description
                </div>
                <div
                  class="
                    px-6
                    py-3
                    text-center text-xs
                    font-medium
                    text-gray-500
                    uppercase
                    tracking-wider
                    col-span-2
                  "
                >
                  Episode
                </div>
              </div>
              <nuxt-link
                v-for="episode in episodes"
                :key="episode.slug"
                :to="'/episode/' + episode.slug"
                class="grid grid-cols-12"
              >
                <div class="col-span-4 px-6 py-4">
                  <span class="block font-bold">
                    {{ episode.title }}
                  </span>
                  <div class="leading-tight mt-2">
                    <span
                      v-for="(actor, i) in episode.actors"
                      :key="actor.id"
                      class="text-xs"
                    >
                      <span v-if="i > 0">,</span>
                      <span class="whitespace-nowrap">{{ actor.name }}</span>
                    </span>
                  </div>
                </div>
                <div class="col-span-6 px-6 py-4">
                  <nuxt-content :document="episode" />
                </div>
                <div class="col-span-2 px-6 py-4 text-center">
                  <div class="text-xs text-center mb-2">
                    {{ episode.date }}
                  </div>
                  <episode-number :number="episode.id" />
                </div>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <pagination
      :last="totalPageNumber"
      :current="currentPageNumber"
      :span="13"
      class="mt-6"
    >
      <template v-slot:page="{ pageNumber }">
        <nuxt-link
          v-if="pageNumber !== -1 && pageNumber !== currentPageNumber"
          :class="{
            'w-12 md:flex justify-center items-center hidden': true,
            'cursor-pointer': true,
            'leading-5 transition duration-150 ease-in': true,
          }"
          :to="'/page/' + pageNumber"
        >
          <template v-if="pageNumber === -1">… </template>
          <template v-else>{{ pageNumber }} </template>
        </nuxt-link>
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
    </pagination>
  </div>
</template>

<script>
import EpisodeNumber from '~/components/EpisodeNumber'
import Pagination from '~/components/Pagination'

export default {
  components: { EpisodeNumber, Pagination },
  props: {
    currentPageNumber: {
      type: Number,
      default: 1,
    },
    totalPageNumber: {
      type: Number,
      default: 1,
    },
    episodes: {
      type: Array,
      default() {
        return []
      },
    },
  },
}
</script>
