<template>
  <span class="bg-yellow-400 px-2 py-1 rounded font-mono inline-block">
    {{ paddedNumber }}
  </span>
</template>
<script lang="ts" setup>
const props = defineProps<{
  number: number;
}>();

const paddedNumber = computed(() => {
  return String(props.number).padStart(4, '0');
});
</script>
