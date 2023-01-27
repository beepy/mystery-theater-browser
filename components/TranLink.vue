<template>
  <NuxtLink v-slot="{ navigate, href, route }" :to="to" custom>
    <a :href="href" v-bind="$attrs" :foo="navigate" :bar="route">
      <!-- @click.prevent="beforeClick(navigate, route)" -->
      <slot />
    </a>
  </NuxtLink>
</template>
<script>
export default defineComponent({
  inheritAttrs: false,
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
      // this.$store.commit('navTo', {
      //   tag: this.navTag,
      //   depth: this.depth,
      //   index: this.index,
      // })
      // f(r)
    },
  },
});
</script>
