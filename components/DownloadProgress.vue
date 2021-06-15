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
<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      progress: 0.0,
      inProgressId: 0,
      item: false,
      simulate: false,
    }
  },
  computed: {
    ...mapGetters({
      headOfDownloadQueue: 'headOfDownloadQueue',
      noSleep: 'noSleep',
    }),
  },
  watch: {
    headOfDownloadQueue(v) {
      if (v.id) {
        if (v.id !== this.inProgressId) {
          this.item = this.headOfDownloadQueue
          this.inProgressId = v.id
          this.beginDownload(this.item.url)
          this.progress = 0
        } else if (v.total) {
          this.progress = v.loaded / v.total
        }
      } else {
        this.inProgress = false
        if (this.noSleep) {
          this.$noSleep.disable()
          this.$store.commit('noSleep', false)
        }
      }
    },
  },
  methods: {
    beginDownload(url) {
      if (!this.simulate) {
        const xhr = new XMLHttpRequest()
        // const total = 0
        xhr.open('GET', url)

        xhr.responseType = 'blob'
        xhr.onprogress = (event) => {
          if (event.lengthComputable) {
            // total = event.total
            // this.progress = event.loaded / event.total
            // console.log(Math.floor((event.loaded / event.total) * 100) + '%')
            this.$store.commit('updateHeadOfDownloadQueue', {
              total: event.total,
              loaded: event.loaded,
            })
          } else {
            // console.log('progress unknown')
            // this.progress = -1
            this.$store.commit('updateHeadOfDownloadQueue', {
              total: -1,
              loaded: event.loaded,
            })
          }
        }
        xhr.onreadystatechange = () => {
          if (xhr.readyState !== 4) {
            return
          }

          if (xhr.status === 200) {
            // window.navigator.msSaveBlob(xhr.response, fileName)
            const blobUrl = URL.createObjectURL(xhr.response)
            // window.location.replace(blobUrl)
            const link = document.createElement('a') // Or maybe get it from the current document
            link.href = blobUrl
            link.download = this.headOfDownloadQueue.download
            link.click()
            this.$store.commit('popHeadOfDownloadQueue')
            this.progress = 0
            this.inProgressId = 0
          } else {
            this.progress = 0
            this.inProgressId = 0
            console.error('download test:', xhr.status, xhr.statusText)
          }
        }
        xhr.send()
      } else {
        const factor = 10000
        const t = -1 // 1000
        let l = 0
        for (let i = 0; i < 30; i++) {
          if (i < 29) {
            setTimeout(() => {
              l = l + Math.floor(Math.random() * (66 - 1) + 1)
              this.$store.commit('updateHeadOfDownloadQueue', {
                total: t,
                loaded: l,
              })
            }, i * factor)
          } else {
            setTimeout(() => {
              this.$store.commit('popHeadOfDownloadQueue')
              this.progress = 0
              this.inProgressId = 0
            }, i * factor)
          }
        }
      }
    },
  },
}
</script>
