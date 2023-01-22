<template>
  <div
    class="max-w-4xl mx-auto bg-white md:mt-10 p-8 md:rounded-lg shadow overflow-hidden"
  >
    <p>Episode {{ slug }}</p>
    <pre v-if="data?.data?.title">{{ data.data.title }}</pre>
    <p v-else><em>Not found</em></p>
    <nuxt-link :to="`/episode/${nextSlug}`">{{ nextSlug }}</nuxt-link>
  </div>
</template>
<script setup lang="ts">
const route = useRoute();
const slug = route.params.slug;
let nextSlug: number | undefined =
  typeof slug === "string" ? parseInt(slug, 10) : undefined;

const data = ref(
  await useAsyncData(`episode-${route.params.slug}`, () => {
    return queryContent(`episodes/${route.params.slug}`).findOne();
  })
);

if (!isNaN(nextSlug)) {
  nextSlug = nextSlug + 1;
} else {
  nextSlug = undefined;
}
</script>
