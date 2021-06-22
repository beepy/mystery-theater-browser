import { mapGetters } from 'vuex'
// import Vue from 'vue'
// import state from '~/store/index'

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

      // console.log([
      //   navFrom.tag,
      //   navFrom.depth,
      //   navFrom.index,
      //   navTo.tag,
      //   navTo.depth,
      //   navTo.index,
      // ])
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
      } else {
        name = 'slide-bottom'
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
