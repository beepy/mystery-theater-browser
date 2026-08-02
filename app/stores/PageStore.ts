import { storeToRefs, defineStore } from 'pinia';
import { type RouteLocationRaw } from 'vue-router';

import { useSearchStore } from '@/stores/SearchStore';

interface State {
  normalPage: number;
  searchPage: number;
}

const pageKey = 'mt-page';

export const usePageStore = defineStore('PageStore', {
  state: (): State => ({
    normalPage: 1,
    searchPage: 1,
  }),
  getters: {
    page: (state): number => {
      if (useSearchStore().isSearching) {
        return state.searchPage;
      } else {
        return state.normalPage;
      }
    },
    indexRoute: (state): RouteLocationRaw => {
      const searchStore = useSearchStore();
      const page = searchStore.isSearching
        ? state.searchPage
        : state.normalPage;
      const results: RouteLocationRaw =
        page > 1
          ? { name: 'index-page-page', params: { page } }
          : { name: 'index' };
      if (searchStore.isSearching) {
        results.query = { search: searchStore.terms };
      }
      return results;
    },
  },
  actions: {
    savePage(p: number) {
      if (useSearchStore().isSearching) {
        this.searchPage = p;
      } else {
        this.normalPage = p;
        if (localStorage) {
          localStorage[pageKey] = p;
        }
      }
    },
    restorePage(): number {
      let result = 1;
      if (localStorage && localStorage[pageKey]) {
        result = parseInt(localStorage[pageKey], 10) || 1;
      }
      return result;
    },
  },
});
