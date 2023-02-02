import { defineStore } from 'pinia';

export type NavInfo = {
  tag: string;
  depth: number;
  index: number;
  path: string;
};

interface State {
  navFrom: NavInfo;
  navTo: NavInfo;
}

export const useNavStore = defineStore('NavStore', {
  state: (): State => ({
    navFrom: { tag: '', depth: 1, index: 1, path: '' },
    navTo: { tag: '', depth: 1, index: 1, path: '' },
  }),
  /*
  getters: {
    navFrom: (state) => state.navFrom,
    navTo: (state) => state.navTo,
  }, */
  getters: {
    // transitionName(state) {
    //   if (state.navFrom.tag.length && state.navTo.tag.length) {
    //     if (state.navFrom.tag === state.navTo.tag) {
    //       if (state.navFrom.index < state.navTo.index) {
    //         return("nav forward/animate left")
    //       } else if (state.navFrom.index > state.navTo.index) {
    //         return("nav back/animate right")
    //       } else {
    //         return("have not moved; cross fade")
    //       }
    //     } else {
    //       if (state.navFrom.depth < state.navTo.depth) {
    //         return("nav deeper; zoom in")
    //       } else if (state.navFrom.index > state.navTo.index) {
    //         return("nav shallowed; zoom out")
    //       } else {
    //         return("change tag but not depth; cross fade")
    //       }
    //     }
    //   } else {
    //     return("missing tag")
    //   }
    //   return "foobar"
    // }
    transitionStyle(state) {
      const name = 'page';
      const mode = 'out-in';
      const navTo = state.navTo;
      const navFrom = state.navFrom;

      // console.log('navTo')

      // console.log(navTo)

      // console.log('navFrom')
      // console.log(navFrom)

      // if (navFrom.tag === navTo.tag) {
      //   if (navFrom.index === navTo.index) {
      //     name = 'page'
      //   } else if (navFrom.index < navTo.index) {
      //     name = 'slide-right'
      //     mode = ''
      //   } else {
      //     name = 'slide-left'
      //     mode = ''
      //   }
      // } else if (navFrom.depth === navTo.depth) {
      //   name = 'page'
      // } else if (navFrom.depth < navTo.depth) {
      //   name = 'slide-top'
      //   mode = ''
      // } else {
      //   name = 'slide-bottom'
      //   mode = ''
      // }
      // if (navFrom.tag.includes('*') || navTo.tag.includes('*')) {
      //   mode = 'out-in'
      // }

      // if (window.$nuxt.$store.state.historyNav) {
      //   name = 'page'
      //   mode = 'out-in'
      // }
      // options for mode are 'out-in', 'in-out', or '' for simultaneous
      return {
        name: 'page',
        mode: 'out-in',
      };
    },
  },
  // note there are not setters; use store.$patch({})
  actions: {
    pushTo(info: NavInfo) {
      // console.log("pushTo")
      // console.log(
      //   {
      //     tag: this.navFrom.tag,
      //     depth: this.navFrom.depth,
      //     index: this.navFrom.index
      //   }
      // )
      // console.log(
      //   {
      //     tag: this.navTo.tag,
      //     depth: this.navTo.depth,
      //     index: this.navTo.index
      //   }
      // )
      if (this) {
        // this.navFrom = {
        //   tag: this.navTo.tag,
        //   depth: this.navTo.depth,
        //   index: this.navTo.index
        // }
        this.navFrom = {
          tag: 'hi',
          depth: 2,
          index: 3,
        };
        this.navTo = { ...info };
      }
    },
  },
});
