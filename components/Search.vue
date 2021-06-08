<template>
  <div class="relative px-2 md:px-0">
    <input
      v-model="newTerms"
      placeholder="Search"
      class="
        px-3
        py-3
        mb-4
        placeholder-blueGray-300
        text-blueGray-600
        relative
        bg-white
        rounded-lg
        text-sm
        border-0
        shadow
        outline-none
        focus:outline-none
        focus:ring
        w-full
      "
      @change="search"
    />
    <svg
      v-if="searchTerms.length > 2"
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 18 18"
      class="absolute right-2 top-2 cursor-pointer"
      @click="clear"
    >
      <path
        d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
      />
    </svg>
    <p
      v-if="searchTerms.length > 2"
      class="p-4 mb-4 rounded-lg text-center text-white"
    >
      Searching for ”<strong>{{ searchTerms }}</strong
      >”<span v-if="searchTerms === searchedTerms"
        >. Found <strong> {{ count }}</strong> episode<span v-if="count !== 1"
          >s</span
        >.</span
      ><span v-else>…</span>
    </p>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    terms: {
      type: String,
      default: '',
    },
    count: {
      type: Number,
      default: 0,
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
      searchedTerms: 'searchedTerms',
    }),
  },
  watch: {
    searchTerms(v) {
      if (this.newTerms !== v) {
        this.newTerms = v
      }
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
  mounted() {
    this.newTerms = this.terms
  },
  methods: {
    search() {
      this.$store.commit('searchTerms', this.newTerms)
    },
    clear() {
      this.$store.commit('searchTerms', '')
    },
  },
}
</script>
