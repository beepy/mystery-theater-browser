<template>
  <p>
    <span
      v-for="tag in titledTags"
      :key="tag.tag"
      :class="[
        'rounded inline-block mt-2',
        'text-' + tag.meta.color,
        'px-2 py-1 text-xs mr-2 uppercase font-bold bg-gray-100',
      ]"
    >
      {{ tag.meta.title }}
    </span>
  </p>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useTagStore } from '~/stores/TagStore';

const store = useTagStore();
const { tags } = storeToRefs(store);
const props = defineProps<{
  episodeTags: string[];
}>();

const titledTags = computed(() => {
  return props.episodeTags.map((t) => {
    return {
      tag: t,
      meta: { ...tags.value[t] },
    };
  });
});
</script>
