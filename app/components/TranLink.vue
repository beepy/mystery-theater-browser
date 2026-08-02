<template>
  <NuxtLink v-slot="{ navigate, href, route }" :to="to" custom>
    <a
      :href="href"
      v-bind="$attrs"
      @click.prevent="beforeClick(navigate, route)"
    >
      <slot />
    </a>
  </NuxtLink>
</template>
<script setup lang="ts">
import type { RouteLocationNormalized } from 'vue-router';
import { storeToRefs } from 'pinia';

import { useNavStore } from '~/stores/NavStore';

const store = useNavStore();

const { navTo } = storeToRefs(store);

const props = withDefaults(
  defineProps<{
    to: Object | string;
    navTag: string;
    depth?: number;
    index?: number | string;
  }>(),
  {
    depth: 0,
    index: 0,
  }
);

const indexValue = computed((): number | undefined => {
  const t = typeof props.index;
  if (t === 'number') {
    return props.index as number;
  } else if (t === 'string') {
    const n = parseInt(props.index as string);
    if (!isNaN(n)) {
      return n;
    }
  }
  return undefined;
});

const beforeClick = (f: Function, r: RouteLocationNormalized) => {
  store.$patch({
    navFrom: { ...navTo.value },
    navTo: {
      tag: props.navTag,
      depth: props.depth,
      index: indexValue.value,
      path: r.path,
    },
  });
  f(r);
};
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
