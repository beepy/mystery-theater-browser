<template>
  <input
    v-model="newTerms"
    @change="search"
    placeholder="Search"
    class="
      px-3
      py-3
      mb-4
      placeholder-blueGray-300
      text-blueGray-600
      relative
      bg-white
      rounded
      text-sm
      border-0
      shadow
      outline-none
      focus:outline-none
      focus:ring
      w-full
    "
  />
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    terms: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      newTerms: '',
    }
  },
  computed: {
    ...mapGetters({
      searchTerms: 'searchTerms',
    }),
  },
  mounted() {
    this.newTerms = this.terms
  },
  watch: {
    searchTerms(v) {
      if (v.length > 2) {
        const terms = v.replace('/', ' ')
        // this.$router.push({
        //   path: '/search/' + encodeURI(terms),
        // })
        this.$router.push({
          path: '/',
          query: {
            search: terms,
          },
        })
      } else {
        this.$router.push({
          path: '/',
        })
      }
    },
  },
  methods: {
    search() {
      this.$store.commit('searchTerms', this.newTerms)
    },
  },
}
</script>
