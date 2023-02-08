<template>
  <div
    class="max-w-4xl mx-auto bg-white md:mt-10 p-8 md:rounded-lg shadow overflow-hidden"
  >
    <!-- <ContentDoc class="nuxt-content" /> -->
    <!-- <ContentRenderer class="nuxt-content" :value="body?.body"> -->
    <ContentRendererMarkdown class="nuxt-content" :value="body ?? {}" />
    <!-- </ContentRenderer> -->
    <!-- <div class="pill" @click="changeContent">
      <div ref="pillElement">
        <div ref="pillContent">{{ content[contentIndex] }}</div>
      </div>
    </div> -->
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

useHead({
  title: 'About',
});

// test stuff
// const content = ['Pill Contents', 'Super long contents that are longer' ,'ABC']
// const contentIndex = ref(0)
// const pillContent = ref(null as null | HTMLElement)
// const pillElement = ref(null as null | HTMLElement)

// function changeContent() {
//   contentIndex.value = contentIndex.value + 1
//   if (contentIndex.value >= content.length) {
//     contentIndex.value = 0
//   }
//   if (pillContent.value !== null && pillElement.value !== null) {
//     nextTick(() => {
//       const size = pillContent.value?.getBoundingClientRect()

//       if (size) {
//         pillElement.value.style.width = size?.width + "px"
//       }
//     })
//   }
// }
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

// .pill {
//   @apply fixed top-24 left-0 w-full flex flex-col items-center;
//   > *:first-child {
//     @apply flex h-12 font-medium rounded-full bg-gray-200 items-center justify-center;
//     transition: width 0.3s cubic-bezier(.47,1.64,.41,.8);
//     overflow: hidden;

//     > * {
//       @apply px-4;
//       flex-grow: 0;
//       flex-shrink: 1;
//       white-space: nowrap;
//     }
//   }
// }
</style>
