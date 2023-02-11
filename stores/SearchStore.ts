import { defineStore } from 'pinia';
import { Episode } from '@/types/episode';

interface State {
  terms: string;
  episodes: Episode[];
  matchedEpisodes: Episode[];
  matchedTerms: string;
}

export const useSearchStore = defineStore('SearchStore', {
  state: (): State => ({
    terms: '',
    episodes: [],
    matchedEpisodes: [],
    matchedTerms: '',
  }),
  getters: {
    isSearching: (state): boolean => state.terms.length > 2,
    hasMatches: (state): boolean => state.matchedEpisodes.length > 0,
    matchCount: (state): number | undefined =>
      state.terms === state.matchedTerms
        ? state.matchedEpisodes.length
        : undefined,
  },
  actions: {
    getAllEpisodes() {
      if (this.episodes.length === 0) {
        return queryContent<Episode>('episodes')
          .without([
            'urls',
            'audioQuality',
            'actorIds',
            'writerIds',
            'notes',
            'descriptionSource',
            // 'searchable',
          ])
          .sort({ id: 1, $numeric: true })
          .find()
          .then((d) => {
            this.episodes = d ?? [];
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
