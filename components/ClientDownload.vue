<template>
  <a
    :href="href"
    :download="download"
    class="relative overflow-hidden"
    @click.prevent="beginDownload"
  >
    <slot v-if="state === 0" />
    <span v-else-if="state === 1">Waiting…</span>
    <span v-else-if="state === 2">
      <span
        v-if="progress >= 0"
        class="block absolute bg-green-800"
        :style="`width: ${
          progress * 100
        }%; left: 0; top: 0; height: 100%; z-index: 1`"
      />
      <span v-if="progress >= 0" class="relative text-xs" style="z-index: 2">
        Downloading {{ Math.floor(progress * 100) }}%
      </span>
      <span v-else class="text-xs">Downloading {{ downloadedSize }}</span>
    </span>
    <span v-else-if="state === 3">Complete</span>
  </a>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
// import filesize from 'filesize'

import { DownloadQueueItem, useDownloadStore } from '@/stores/DownloadStore';

const downloadStore = useDownloadStore();

const props = defineProps<{
  href: string;
  download: string;
}>();

const { headOfDownloadQueue } = storeToRefs(downloadStore);

const progress = ref(0.0);
const inProgressId = ref(0);

// 0 = no action, 1 = pending, 2 = downloading, 3 = done, -1 = error
const state = ref(0);
/*
NRL NOTE: We need to begin in an indeterminate state, with a "starting download"
message. For whatever reason, it can take a long time from the initial request
to traffic actually starting; probably archive.org puts content to "sleep" or
in "cold storage" and needs to have services woken up? Otherwise, status stays
in "Downloading 0%" for a long time. Needs to be mirrored in global
downloadprogress.

Also, might as well use "longtrek" http error to test handling of errors.
 */

const downloadedSize = computed(() => {
  if (state.value > 0 && headOfDownloadQueue.value.loaded) {
    return headOfDownloadQueue.value.loaded;
    // return filesize(headOfDownloadQueue.value.loaded)
  } else {
    return 0;
    // return filesize(0)
  }
});

watch(headOfDownloadQueue, (v: DownloadQueueItem) => {
  if (v.id && v.url === props.href) {
    if (v.id !== inProgressId.value) {
      inProgressId.value = v.id;
      progress.value = 0;
      state.value = 2;
    } else if (v.total) {
      progress.value = (v.loaded || 0) / v.total;
    }
  } else {
    if (state.value === 2) {
      state.value = 3;
    }
    inProgressId.value = 0;
  }
});

const beginDownload = () => {
  if (state.value === 0) {
    downloadStore.appendToDownloadQueue({
      url: props.href,
      download: props.download,
    });
    state.value = 1;
  }
};
</script>
