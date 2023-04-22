<template>
  <span
    v-shared-element="{
      id: n,
      role: 'number',
      type: 'episode',
    }"
    class="bg-yellow-400 px-2 py-1 rounded font-mono inline-block"
  >
    {{ paddedNumber }}
  </span>
</template>
<script lang="ts" setup>
const props = defineProps<{
  n: number | string;
}>();

const paddedNumber = computed(() => {
  return String(props.n).padStart(4, '0');
});
</script>
