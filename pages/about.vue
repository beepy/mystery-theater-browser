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

const pageWithValues = computed(() => {
  if (!page.value) {
    return page.value;
  } else {
    return {
      ...page.value,
      complete: complete.value,
      percent: percent.value,
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
