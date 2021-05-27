<template>
  <span class="bg-yellow-400 px-2 py-1 rounded font-mono">
    {{ paddedNumber }}
  </span>
</template>
<script>
export default {
  props: {
    number: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    paddedNumber() {
      return String(this.number).padStart(4, '0')
    },
  },
}
</script>
