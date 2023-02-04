import { defineStore } from 'pinia';

interface State {
  terms: string;
  matchedIds: number[];
}

export const useSearchStore = defineStore('SearchStore', {
  state: (): State => ({
    terms: '',
    matchedIds: [],
  }),
  getters: {
    isSearching: (state): boolean => state.terms.length > 2,
    hasMatches: (state): boolean => state.matchedIds.length > 0,
  },
});
