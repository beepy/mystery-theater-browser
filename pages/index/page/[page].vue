<template>
  <div v-relative-slide="{ value: page, type: 'episodes' }">
    <p class="bg-white">PAGE OF EPISODES HERE</p>
    <PageOfEpisodes :page="page" />

    <!-- not used, except to force desired route to be generated -->
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const page = ref(
  parseInt(
    typeof route.params.page === 'string' ? route.params.page : '1',
    10
  ) ?? 1
);
</script>
