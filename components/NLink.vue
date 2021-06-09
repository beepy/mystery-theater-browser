<template>
  <nuxt-link v-slot="{ navigate, href, route }" :to="to" custom>
    <a :href="href" @click.prevent="beforeClick(navigate, route)">
      <slot />
    </a>
  </nuxt-link>
</template>
<script>
export default {
  props: {
    to: {
      type: [Object, String],
      required: true,
    },
    navTag: {
      type: String,
      required: true,
    },
    depth: {
      type: [Number, String],
      default: 0,
    },
    index: {
      type: [Number, String],
      default: 0,
    },
  },
  methods: {
    beforeClick(f, r) {
      this.$store.commit('navTo', {
        tag: this.navTag,
        depth: this.depth,
        index: this.index,
      })
      f(r)
    },
  },
}
</script>
