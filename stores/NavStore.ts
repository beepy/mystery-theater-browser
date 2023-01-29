import { defineStore } from 'pinia';

export type NavInfo = {
  tag: string;
  depth: number;
  index: number;
};

interface State {
  navFrom: NavInfo;
  navTo: NavInfo;
}

export const useNavStore = defineStore('NavStore', {
  state: (): State => ({
    navFrom: { tag: '', depth: 1, index: 1 },
    navTo: { tag: '', depth: 1, index: 1 },
  }),
  getters: {
    navFrom: (state) => state.navFrom,
    navTo: (state) => state.navTo,
  },
  // note there are not setters; use store.$patch({})
});
