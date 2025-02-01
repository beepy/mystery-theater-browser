<template>
  <div class="md:pt-10">
    <div
      class="max-w-4xl mx-auto bg-white p-8 md:rounded-lg shadow overflow-hidden"
    >
      <ContentRendererMarkdown
        v-if="pageWithValues"
        class="nuxt-content"
        :value="pageWithValues"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { data: completedPages } = await useAsyncData('about-completed', () =>
  queryContent('episodes')
    .where({ descriptionSource: 'nrl' })
    .only(['id'])
    .find()
);
const complete = computed(() => completedPages.value?.length || 0);
const percent = computed(
  () => Math.floor((complete.value / 1399.0) * 1000) / 10
);

const { data: page } = await useAsyncData('about', () =>
  queryContent('about').findOne()
);

const timeToComplete = computed(() => {
  const episodesPerWeek = 5;
  const episodesComplete = percent.value * 0.01 * complete.value;
  const episodesToGo = 1399 - episodesComplete;
  const weeksToGo = episodesToGo / episodesPerWeek;
  return Math.ceil(weeksToGo) * 7 * 24 * 60 * 60 * 1000;
});

const completeDate = computed(() => {
  const now = new Date();
  const then = new Date(now.getTime() + timeToComplete.value);
  const month = then.toLocaleString('default', { month: 'long' });
  return `${month}, ${then.getFullYear()}`;
});

const pageWithValues = computed(() => {
  if (!page.value) {
    return page.value;
  } else {
    return {
      ...page.value,
      complete: complete.value,
      percent: percent.value,
      timeToComplete: timeToComplete.value,
      completeDate: completeDate.value,
    };
  }
});
useHead({
  title: 'About',
});
</script>

<style lang="scss">
section.footnotes {
  padding-top: 4rem;
}
.nuxt-content {
  h2,
  h3 {
    a {
      text-decoration: none;
    }
  }
}
</style>
