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
import { RouteLocationNormalized } from 'vue-router';
import { storeToRefs } from 'pinia';

import { useNavStore } from '~/stores/NavStore';

const store = useNavStore();

const { navTo } = storeToRefs(store);

const props = withDefaults(
  defineProps<{
    to: Object | string;
    navTag: string;
    depth?: number;
    index?: number;
  }>(),
  {
    depth: 0,
    index: 0,
  }
);

const beforeClick = (f: Function, r: RouteLocationNormalized) => {
  store.$patch({
    navFrom: { ...navTo.value },
    navTo: {
      tag: props.navTag,
      depth: props.depth,
      index: props.index,
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
