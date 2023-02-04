import { defineStore } from 'pinia';

interface State {
  terms: string;
  matchedIds: number[];
  episodes: any[];
  matchedEpisodes: any[];
  matchedTerms: string;
}

export const useSearchStore = defineStore('SearchStore', {
  state: (): State => ({
    terms: '',
    matchedIds: [],
    episodes: [],
    matchedEpisodes: [],
    matchedTerms: '',
  }),
  getters: {
    isSearching: (state): boolean => state.terms.length > 2,
    hasMatches: (state): boolean => state.matchedIds.length > 0,
  },
  actions: {
    getAllEpisodes() {
      if (this.episodes.length === 0) {
        return queryContent('episodes')
          .without([
            'urls',
            'audioQuality',
            'actorIds',
            'writerIds',
            'notes',
            'descriptionSource',
            'searchable',
          ])
          .sort({ id: 1, $numeric: true })
          .find()
          .then((d) => {
            this.episodes = d;
            return Promise.resolve(d);
          });
      } else {
        return Promise.resolve(this.episodes);
      }
    },
    getMatchedEpisodes() {
      if (this.terms === this.matchedTerms) {
        return Promise.resolve(this.matchedEpisodes);
      } else if (this.terms === '') {
        this.matchedEpisodes = [];
        this.matchedTerms = '';
        return Promise.resolve([]);
      } else {
        return this.getAllEpisodes().then((d) => {
          const r = RegExp(this.terms, 'ig');
          this.matchedTerms = this.terms;
          this.matchedEpisodes = d.filter((e) => e._searchable.search(r) >= 0);
          return Promise.resolve(this.matchedEpisodes);
        });
      }
    },
  },
});
