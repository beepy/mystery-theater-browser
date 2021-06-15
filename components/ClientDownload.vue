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
<script>
import { mapGetters } from 'vuex'
import filesize from 'filesize'

/*
NRL NOTE: We need to begin in an indeterminate state, with a "starting download"
message. For whatever reason, it can take a long time from the initial request
to traffic actually starting; probably archive.org puts content to "sleep" or
in "cold storage" and needs to have services woken up? Otherwise, status stays
in "Downloading 0%" for a long time. Needs to be mirrored in global
downloadprogress.

Also, might as well use "longtrek" http error to test handling of errors.
 */
export default {
  props: {
    href: {
      type: String,
      required: true,
    },
    download: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      progress: 0.0,
      inProgressId: 0,
      // 0 = no action, 1 = pending, 2 = downloading, 3 = done, -1 = error
      state: 0,
    }
  },
  computed: {
    ...mapGetters({
      headOfDownloadQueue: 'headOfDownloadQueue',
      noSleep: 'noSleep',
    }),
    downloadedSize() {
      if (this.state > 0 && this.headOfDownloadQueue.loaded) {
        return filesize(this.headOfDownloadQueue.loaded)
      } else {
        return filesize(0)
      }
    },
  },
  watch: {
    headOfDownloadQueue(v) {
      if (v.id && v.url === this.href) {
        if (v.id !== this.inProgressId) {
          this.inProgressId = v.id
          this.progress = 0
          this.state = 2
        } else if (v.total) {
          this.progress = v.loaded / v.total
        }
      } else {
        if (this.state === 2) {
          this.state = 3
        }
        this.inProgressId = 0
      }
    },
  },
  methods: {
    beginDownload() {
      if (this.state === 0) {
        this.$store.commit('appendToDownloadQueue', {
          url: this.href,
          download: this.download,
        })
        this.state = 1
        if (!this.noSleep) {
          this.$noSleep.enable()
          this.$store.commit('noSleep', true)
        }
      }
    },
  },
}
</script>
