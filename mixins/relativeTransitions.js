import { mapGetters } from 'vuex'
// import Vue from 'vue'
// import state from '~/store/index'

export default {
  transition(to, from) {
    if (
      window &&
      window.$nuxt &&
      window.$nuxt.$store &&
      window.$nuxt.$store.state.navFrom &&
      window.$nuxt.$store.state.navTo
    ) {
      const navTo = window.$nuxt.$store.state.navTo
      const navFrom = window.$nuxt.$store.state.navFrom

      console.log([
        navFrom.tag,
        navFrom.depth,
        navFrom.index,
        navTo.tag,
        navTo.depth,
        navTo.index,
      ])
      if (navFrom.tag === navTo.tag) {
        if (navFrom.index === navTo.index) {
          return 'page'
        } else if (navFrom.index < navTo.index) {
          return 'slide-right'
        } else {
          return 'slide-left'
        }
      } else if (navFrom.depth === navTo.depth) {
        return 'page'
      } else if (navFrom.depth < navTo.depth) {
        return 'slide-top'
      } else {
        return 'slide-bottom'
      }
    }
    return 'page'
  },
  computed: {
    ...mapGetters({
      navFrom: 'navFrom',
      navTo: 'navTo',
    }),
  },
}
