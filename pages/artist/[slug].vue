<template>
  <div class="absolute-on-leave">
    <div class="max-w-4xl mx-auto px-4 py-8 bg-white md:rounded-lg">
      <h1 class="text-3xl text-center font-bold mb-6">{{ artist.name }}</h1>
      <div
        :class="{
          'mb-6': true,
          'md:grid md:grid-cols-2 md:gap-6':
            writer.length > 0 && actor.length > 0,
        }"
      >
        <div v-if="actor.length">
          <h2 class="font-bold">Featured In</h2>
          <ul :class="{ 'md:columns-2': writer.length < 1 }">
            <li v-for="episode in actor" :key="episode.id">
              <TranLink
                :to="'/episode/' + episode.id"
                nav-tag="episode"
                :index="episode.id"
                :depth="2"
                class="mb-1 block"
              >
                <episode-number :number="episode.id" class="mr-1" />
                {{ episode.title }}
              </TranLink>
            </li>
          </ul>
        </div>
        <div
          v-if="writer.length"
          :class="{ 'mt-4 md:mt-0': actor.length >= 1 }"
        >
          <h2 class="font-bold">Writer On</h2>
          <ul :class="{ 'md:columns-2': actor.length < 1 }">
            <li v-for="episode in writer" :key="episode.id">
              <TranLink
                :to="'/episode/' + episode.id"
                nav-tag="episode"
                :index="episode.id"
                :depth="2"
                class="mb-1 block"
              >
                <episode-number :number="episode.id" class="mr-1" />
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

const { data: actor } = await useAsyncData(`episodes-artist-${id}`, () =>
  queryContent('episodes')
    .where({ actorIds: { $contains: id } })
    // .without(['description', 'body', 'urls', 'tags', 'searchable', 'notes', 'descriptionSource', '_searchable'])
    .only(episodeProperties)
    .sort({ id: 1, $numeric: true })
    .find()
);

const { data: writer } = await useAsyncData(`episodes-writer-${id}`, () =>
  queryContent('episodes')
    .where({ writerIds: { $contains: id } })
    .only(episodeProperties)
    .sort({ id: 1, $numeric: true })
    .find()
);

useHead({
  title: 'Some Artist',
  meta: [{ name: 'description', content: 'My amazing site.' }],
});

// console.log('artist loaded ' + slug)

// onMounted(() => {
//   navStore.pushTo({
//     tag: "artist",
//     depth: 2,
//     index: id
//   })
// })
</script>
