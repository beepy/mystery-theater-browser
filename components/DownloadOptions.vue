<template>
  <div class="col-span-4">
    <div class="grid grid-cols-4 gap-x-6">
      <div class="col-span-4 font-bold pb-2">
        <a
          v-if="url.sourceLink"
          class="hover:underline"
          :href="url.sourceLink"
          target="_blank"
        >
          {{ url.source }}
        </a>
        <span v-else>{{ url.source }}</span>
      </div>
      <div class="col-span-4">
        <div class="flex items-top">
          <div v-if="!directLinkOnly" class="flex-grow pr-4">
            <!-- height 42 -->
            <audio
              controls
              preload="metadata"
              class="w-full rounded-none"
              style="height: 2.6em"
            >
              <source :src="url.url" type="audio/mpeg" />
            </audio>
            <p class="text-center text-xs py-2">Preview</p>
          </div>
          <div style="width: 15%; min-width: 12rem">
            <client-download
              v-if="!directLinkOnly"
              :href="url.url"
              :download="url.filename"
              class="block px-4 py-2 rounded bg-green-600 text-center text-white font-bold"
            >
              Download <download-icon />
            </client-download>
            <a
              :href="url.url"
              :download="episode.title + '.mp3'"
              target="_blank"
              class="block py-2 text-center underline text-xs"
            >
              Direct Link
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ClientDownload from '~/components/ClientDownload'
import DownloadIcon from '~/components/DownloadIcon'

export default {
  components: {
    ClientDownload,
    DownloadIcon,
  },
  props: {
    url: {
      type: Object,
      required: true,
    },
    episode: {
      type: Object,
      required: true,
    },
  },
  computed: {
    directLinkOnly() {
      if (this.url.url && this.url.url.startsWith('https://')) {
        return false
      } else {
        return true
      }
    },
  },
}
</script>
