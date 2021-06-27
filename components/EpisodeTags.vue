<template>
  <p class="text-right">
    <span
      v-for="tag in titledTags"
      :key="tag.tag"
      :class="[
        'rounded',
        tag.meta.color,
        'px-2 py-1 text-xs mr-2 uppercase font-bold bg-gray-100',
      ]"
    >
      {{ tag.meta.title }}
    </span>
  </p>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    episodeTags: {
      type: Array,
      default() {
        return []
      },
    },
  },
  computed: {
    ...mapGetters({
      tags: 'tags',
    }),
    titledTags() {
      return this.episodeTags.map((t) => {
        return {
          tag: t.tag,
          meta: this.tags[t.tag],
        }
      })
    },
  },
}
</script>
