import { defineStore } from 'pinia';

export type DownloadQueueItem = {
  id?: number;
  total?: number;
  loaded?: number;
  url?: string;
  download?: string; // name of download attribute === default name of file
};

interface State {
  downloadQueueItemId: number;
  downloadQueue: DownloadQueueItem[];
}

export const useDownloadStore = defineStore('DownloadStore', {
  state: (): State => ({
    downloadQueueItemId: 1,
    downloadQueue: [],
  }),
  getters: {
    headOfDownloadQueue(state): DownloadQueueItem {
      return state.downloadQueue.length > 0 ? state.downloadQueue[0] : {};
    },
  },
  actions: {
    appendToDownloadQueue(v: DownloadQueueItem) {
      this.downloadQueue.push(
        Object.assign({ id: this.downloadQueueItemId }, v)
      );
      this.downloadQueueItemId = this.downloadQueueItemId + 1;
    },

    updateHeadOfDownloadQueue(v: DownloadQueueItem) {
      if (this.downloadQueue.length > 0) {
        this.downloadQueue.splice(0, 1, { ...this.downloadQueue[0], ...v });
      }
    },
    popHeadOfDownloadQueue() {
      if (this.downloadQueue.length > 0) {
        this.downloadQueue.splice(0, 1);
      }
    },
  },
});
