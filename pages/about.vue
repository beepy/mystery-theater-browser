<template>
  <div
    class="max-w-4xl mx-auto bg-white md:mt-10 p-8 md:rounded-lg shadow overflow-hidden"
  >
    <!-- <ContentDoc class="nuxt-content" /> -->
    <!-- <ContentRenderer class="nuxt-content" :value="body?.body"> -->
    <ContentRendererMarkdown class="nuxt-content" :value="body ?? {}" />
    <!-- </ContentRenderer> -->
  </div>
</template>

<script lang="ts" setup>
const { data: page } = await useAsyncData('about', () =>
  queryContent('about').findOne()
);
const { data: completedPages } = await useAsyncData('about-completed', () =>
  queryContent('episodes')
    .where({ descriptionSource: 'nrl' })
    .only(['id'])
    .find()
);
const completedCount = ref(completedPages.value?.length || 0);
const percent = ref(Math.floor((completedCount.value / 1399.0) * 1000) / 10);

const body = ref(page.value);
if (body.value) {
  body.value.percent = percent;
  body.value.complete = completedCount;
}
</script>
