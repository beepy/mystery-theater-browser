<template>
  <span class="bg-yellow-400 px-2 py-1 rounded font-mono inline-block">
    {{ paddedNumber }}
  </span>
</template>
<script lang="ts" setup>
// export default defineComponent({
//   props: {
//     number: {
//       type: Number,
//       default: 0,
//     },
//   },
//   computed: {
//     paddedNumber() {
//       return String(this.number).padStart(4, '0');
//     },
//   },
// });

const props = defineProps<{
  number: number;
}>();

const paddedNumber = computed(() => {
  return String(props.number).padStart(4, '0') + 'x';
});
</script>
