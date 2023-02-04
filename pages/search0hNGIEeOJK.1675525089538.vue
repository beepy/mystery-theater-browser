<template>
  <div class="bg-white">
    <h1>Search results</h1>
    <button @click="test">Test</button>
    <pre>{{ data }}</pre>
  </div>
</template>

<script setup lang="ts">
const data = await useAsyncData('search-test', () => {
  return queryContent('episodes').sort({ id: 1, $numeric: true }).find();
});

const test = () => {
  data.refresh();
};
</script>
