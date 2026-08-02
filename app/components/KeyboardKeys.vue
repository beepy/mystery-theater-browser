<template>
  <span v-if="keyGroups.length > 1">
    <template v-for="(group, i) in keyGroups" :key="i">
      <template v-if="i > 0">, </template>
      <span v-for="keyString in group" :key="keyString" class="keyboard-key">{{
        keyString
      }}</span>
    </template>
  </span>
  <template v-else-if="keyGroups.length > 0">
    <span
      v-for="keyString in keyGroups[0]"
      :key="keyString"
      class="keyboard-key"
      >{{ keyString }}</span
    >
  </template>
</template>

<script setup lang="ts">
const props = defineProps<{
  keys: string | string[];
}>();

const keyGroups = computed((): string[][] => {
  let ks: string | string[] = props.keys;

  if (typeof ks === 'string') {
    ks = [ks];
  }

  return ks.map((g) => {
    return g.split(' ');
  });
});
</script>

<style lang="scss">
.keyboard-key {
  @apply rounded;
  display: inline-block;
  padding: {
    left: 0.4em;
    right: 0.4em;
  }
  border: {
    top: 1px solid rgba(255, 255, 255, 0.35);
    right: 1px solid rgba(0, 0, 0, 0.1);
    bottom: 1px solid rgba(0, 0, 0, 0.15);
    left: 1px solid rgba(255, 255, 255, 0.25);
  }
  + .keyboard-key {
    margin-left: 0.25em;
  }
}
</style>
