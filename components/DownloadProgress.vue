<template>
  <div
    :class="{
      flex: true,
      'bg-gray-200': progress != 0,
      'transition-colors': true,
    }"
    style="height: 10px; width: 64px"
  >
    <div
      v-if="inProgressId && progress >= 0"
      class="bg-blue-500 transition-width"
      :style="`height: 10px; width: ${progress * 100}%`"
    />
    <div
      v-else-if="inProgressId"
      class="bg-blue-500 indeterminate-progress"
      :style="`height: 10px; width:100%`"
    />
  </div>
</template>
<script setup lang="ts">
import axios from 'axios';
import { storeToRefs } from 'pinia';

import { DownloadQueueItem, useDownloadStore } from '@/stores/DownloadStore';

const downloadStore = useDownloadStore();

const progress = ref(0.0);
const inProgressId = ref(0);
const item = ref(undefined as DownloadQueueItem | undefined);
const simulate = ref(false);
const { headOfDownloadQueue } = storeToRefs(downloadStore);

const beginDownload = (url: string) => {
  if (!simulate.value) {
    /*
    const xhr = new XMLHttpRequest()
    // const total = 0
    xhr.open('GET', url)

    xhr.responseType = 'blob'
    xhr.onprogress = (event) => {
      if (event.lengthComputable) {
        downloadStore.updateHeadOfDownloadQueue({
          total: event.total,
          loaded: event.loaded,
        })
      } else {
        // progress unknown
        downloadStore.updateHeadOfDownloadQueue({
          total: -1,
          loaded: event.loaded,
        })
      }
    }
    xhr.onreadystatechange = () => {
      // 4 == done
      if (xhr.readyState !== 4) {
        return
      }

      if (xhr.status === 200) {
        const blobUrl = URL.createObjectURL(xhr.response)
        const link = document.createElement('a') // Or maybe get it from the current document
        link.href = blobUrl
        link.download = headOfDownloadQueue.value.download
        link.click()
        downloadStore.popHeadOfDownloadQueue()
        progress.value = 0
        inProgressId.value = 0
      } else {
        progress.value = 0
        inProgressId.value = 0
      }
    }
    xhr.send()
    */
    axios({
      url,
      method: 'GET',
      responseType: 'blob', // important,
      onDownloadProgress(event) {
        if (event.total) {
          downloadStore.updateHeadOfDownloadQueue({
            total: event.total,
            loaded: event.loaded,
          });
        } else {
          // progress unknown
          downloadStore.updateHeadOfDownloadQueue({
            total: -1,
            loaded: event.loaded,
          });
        }
      },
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
          'download',
          headOfDownloadQueue.value.download || 'download.mp3'
        );
        document.body.appendChild(link);
        link.click();
        downloadStore.popHeadOfDownloadQueue();
        progress.value = 0;
        inProgressId.value = 0;
      })
      .catch(() => {
        progress.value = 0;
        inProgressId.value = 0;
      });
  } else {
    // simulate progress for debugging
    const factor = 10000;
    const t = -1;
    let l = 0;
    for (let i = 0; i < 30; i++) {
      if (i < 29) {
        setTimeout(() => {
          l = l + Math.floor(Math.random() * (66 - 1) + 1);
          downloadStore.updateHeadOfDownloadQueue({
            total: t,
            loaded: l,
          });
        }, i * factor);
      } else {
        setTimeout(() => {
          downloadStore.popHeadOfDownloadQueue();
          progress.value = 0;
          inProgressId.value = 0;
        }, i * factor);
      }
    }
  }
};

watch(headOfDownloadQueue, (v) => {
  if (v.id) {
    if (v.id !== inProgressId.value) {
      item.value = { ...headOfDownloadQueue.value };
      if (item.value?.url) {
        inProgressId.value = v.id;
        beginDownload(item.value?.url);
      } else {
        downloadStore.popHeadOfDownloadQueue();
        inProgressId.value = 0;
      }
      progress.value = 0;
    } else if (v.total) {
      progress.value = (v.loaded || 0) / v.total;
    }
  }
});
</script>
