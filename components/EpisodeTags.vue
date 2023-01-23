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
<script>
// import { mapGetters } from 'vuex'

export default defineComponent({
  props: {
    episodeTags: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    // ...mapGetters({
    //   tags: 'tags',
    // }),
    titledTags() {
      return [];
      // return this.episodeTags.map((t) => {
      //   return {
      //     tag: t,
      //     meta: Object.assign({ color: 'red' }, this.tags[t]),
      //   }
      // })
    },
  },
});
</script>
