import { mapGetters } from 'vuex'

export default {
  transition(to, from) {
    let name = 'page'
    let mode = 'out-in'
    if (
      window &&
      window.$nuxt &&
      window.$nuxt.$store &&
      window.$nuxt.$store.state.navFrom &&
      window.$nuxt.$store.state.navTo
    ) {
      const navTo = window.$nuxt.$store.state.navTo
      const navFrom = window.$nuxt.$store.state.navFrom

      if (navFrom.tag === navTo.tag) {
        if (navFrom.index === navTo.index) {
          name = 'page'
        } else if (navFrom.index < navTo.index) {
          name = 'slide-right'
          mode = ''
        } else {
          name = 'slide-left'
          mode = ''
        }
      } else if (navFrom.depth === navTo.depth) {
        name = 'page'
      } else if (navFrom.depth < navTo.depth) {
        name = 'slide-top'
        mode = ''
      } else {
        name = 'slide-bottom'
        mode = ''
      }
      if (navFrom.tag.includes('*') || navTo.tag.includes('*')) {
        mode = 'out-in'
      }
    }
    if (window.$nuxt.$store.state.historyNav) {
      name = 'page'
      mode = 'out-in'
    }
    // options for mode are 'out-in', 'in-out', or '' for simultaneous
    return {
      name,
      mode,
    }
  },
  computed: {
    ...mapGetters({
      navFrom: 'navFrom',
      navTo: 'navTo',
      historyNav: 'historyNav',
    }),
  },
}
