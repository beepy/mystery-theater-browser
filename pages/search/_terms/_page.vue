<template>
  <div>terms: {{ terms }} page: {{ page }}</div>
</template>
<script>
export default {
  asyncData({ $content, store, params }) {
    return {
      terms: params.terms,
      page: params.page,
    }
  },
}
</script>
