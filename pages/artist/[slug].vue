<template>
  <div class="absolute-on-leave">
    <div class="max-w-4xl mx-auto px-4 py-8 bg-white md:rounded-lg">
      <h1 class="text-3xl text-center font-bold mb-6">{{ artist?.name }}</h1>
      <div
        :class="{
          'mb-6': true,
          'md:grid md:grid-cols-2 md:gap-6':
            writer.length > 0 && actor.length > 0,
        }"
      >
        <div v-if="actor.length">
          <h2 class="font-bold mb-2">
            Featured in {{ actor.length }} Episode{{
              actor.length > 1 ? 's' : ''
            }}
          </h2>
          <ul :class="{ 'md:columns-2': writer.length < 1 }">
            <li v-for="episode in actor" :key="episode.id">
              <TranLink
                :to="'/episode/' + episode.id"
                nav-tag="episode"
                :index="episode.id"
                :depth="2"
                class="mb-1 block"
              >
                <EpisodeNumber :n="episode.id" class="mr-1" />
                {{ episode.title }}
              </TranLink>
            </li>
          </ul>
        </div>
        <div
          v-if="writer.length"
          :class="{ 'mt-4 md:mt-0': actor.length >= 1 }"
        >
          <h2 class="font-bold mb-2">
            Writer on {{ writer.length }} Episode{{
              writer.length > 1 ? 's' : ''
            }}
          </h2>
          <ul :class="{ 'md:columns-2': actor.length < 1 }">
            <li v-for="episode in writer" :key="episode.id">
              <TranLink
                :to="'/episode/' + episode.id"
                nav-tag="episode"
                :index="episode.id"
                :depth="2"
                class="mb-1 block"
              >
                <EpisodeNumber :n="episode.id" class="mr-1" />
                {{ episode.title }}
              </TranLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
// const navStore = useNavStore();
const route = useRoute();
const slug = route.params.slug;
const id =
  typeof slug === 'string' ? parseInt(slug, 10) : parseInt(slug[0], 10);
const episodeProperties = ['id', 'title'];

const { data: artist } = await useAsyncData(`artist-${id}`, () =>
  queryContent(`artists/${slug}`).findOne()
);

const actor = computed(() => artist.value?.actor ?? []);
const writer = computed(() => artist.value?.writer ?? []);

useHead({
  title: artist.value?.name || 'Unknown',
});
</script>
