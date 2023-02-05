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
});
