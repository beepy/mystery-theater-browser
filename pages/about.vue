<template>
  <div
    class="max-w-4xl mx-auto bg-white md:mt-10 p-8 md:rounded-lg shadow overflow-hidden"
  >
    <pre>{{ data }}</pre>
    <ContentDoc class="nuxt-content" />
  </div>
</template>

<script lang="ts" setup>
const data = ref(
  await useAsyncData('about', async () => {
    const page = await queryContent('about').findOne();
    const completedCount = (
      await queryContent('episodes')
        .where({ descriptionSource: 'nrl' })
        .only(['id'])
        .find()
    ).length;
    return {
      page,
      completedCount,
    };
  })
);
</script>
