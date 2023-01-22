<template>
  <div
      class="max-w-4xl mx-auto bg-white md:mt-10 p-8 md:rounded-lg shadow overflow-hidden"
    >
    <p>Hello World</p>
    <pre v-if="data">{{ data.data }}</pre>
    <p v-else><em>Not found</em></p>
  </div>
</template>

<script lang="ts" setup>
const data = ref(useAsyncData('home', async () => {
  const d =  await queryContent('episodes').only(['id']).find()
  return d.length
}))
console.log(data)
</script>