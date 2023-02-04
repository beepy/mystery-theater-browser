<template>
  <div class="bg-white">
    <!-- not used, except to force desired resource to be generated -->
    <pre>{{ data }}</pre>
  </div>
</template>

<script setup lang="ts">
const data = await useAsyncData('search-test', () => {
  return queryContent('episodes')
    .without([
      'urls',
      'audioQuality',
      'actorIds',
      'writerIds',
      'notes',
      'descriptionSource',
      'searchable',
    ])
    .sort({ id: 1, $numeric: true })
    .find();
});
</script>
