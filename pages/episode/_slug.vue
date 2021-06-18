<template>
  <div class="absolute-on-leave">
    <div class="md:container lg:max-w-4xl mx-auto">
      <div class="md:pt-5">
        <!-- <div class="bg-white p-12 text-black absolute">Hello world</div> -->
        <div
          class="
            bg-white
            px-4
            md:rounded-lg
            shadow
            overflow-hidden
            transitionable
          "
        >
          <div class="grid grid-cols-4 mb-6 px-4 py-6 bg-gray-200 -mx-4">
            <div class="col-span-3 pr-6">
              <h1 class="text-3xl font-bold mb-6">{{ episode.title }}</h1>
            </div>
            <div class="pr-0 md:pr-6 text-right">
              <p class="text-xs mb-2">{{ episode.date }}</p>
              <episode-number :number="episode.id" />
            </div>
            <div class="flex col-span-4">
              <n-link
                v-if="episode.id !== 1"
                :to="'/episode/' + (parseInt(episode.id) - 1)"
                :index="parseInt(episode.id) - 1"
                nav-tag="episode"
                :depth="2"
                class="flex-shrink"
              >
                <previous-icon class="text-black w-8" />
              </n-link>
              <div class="flex-grow" />
              <n-link
                v-if="episode.id !== 1399"
                :to="'/episode/' + (parseInt(episode.id) + 1)"
                :index="parseInt(episode.id) + 1"
                nav-tag="episode"
                :depth="2"
                class="text-right flex-shrink"
              >
                <next-icon class="text-black w-8" />
              </n-link>
            </div>
          </div>
          <div class="grid grid-cols-4 gap-6 mb-6">
            <div class="col-span-4 md:col-span-2">
              <nuxt-content :document="episode" />
            </div>
            <div class="col-span-2 md:col-span-1">
              <h2 class="font-bold">Written by</h2>
              <ul>
                <li v-for="artist in episode.writers" :key="artist.id">
                  <nuxt-link :to="'/artist/' + artist.id">
                    {{ artist.name }}
                  </nuxt-link>
                </li>
              </ul>
            </div>
            <div class="col-span-2 md:col-span-1">
              <h2 class="font-bold">Featured Cast</h2>
              <ul>
                <li v-for="artist in episode.actors" :key="artist.id">
                  <nuxt-link :to="'/artist/' + artist.id">
                    {{ artist.name }}
                  </nuxt-link>
                </li>
              </ul>
            </div>
            <div class="col-span-4 text-xs">
              <em class="text-gray-500">
                Description provided by
                <a
                  :href="
                    'http://www.nettally.com/keith.flowers/biblio/' +
                    String(episode.id).padStart(4, '0') +
                    '.htm'
                  "
                  target="_blank"
                  class="underline"
                  >Keith Flowers</a
                >.
              </em>
            </div>
            <download-options
              v-if="!showAllDownloads"
              :url="links[0]"
              :key="links[0].url"
              :episode="episode"
            />
            <download-options
              v-else
              v-for="url in links"
              :key="url.url"
              :url="url"
              :episode="episode"
            />
            <div v-if="links.length > 1" class="col-span-4 text-xs">
              <button
                v-if="showAllDownloads"
                @click="toggleShowAllDownloads(false)"
                class="rounded p-2 bg-gray-200"
              >
                Hide additional downloads
              </button>
              <button
                v-else
                @click="toggleShowAllDownloads(true)"
                class="rounded p-2 bg-gray-200"
              >
                Show additional downloads
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

import EpisodeNumber from '~/components/EpisodeNumber'
import RelativeTransitions from '~/mixins/relativeTransitions'
import NLink from '~/components/NLink'
import NextIcon from '~/components/NextIcon'
import PreviousIcon from '~/components/PreviousIcon'
import DownloadOptions from '~/components/DownloadOptions'

export default {
  components: {
    EpisodeNumber,
    NextIcon,
    NLink,
    PreviousIcon,
    DownloadOptions,
  },
  mixins: [RelativeTransitions],
  async asyncData({ $content, store, params }) {
    const episode = await $content('episodes/' + params.slug).fetch()
    // const artists = await $content('artists').fetch()
    return {
      episode,
      // artists,
    }
  },
  head() {
    return {
      title: this.episode.title + ' | MysteryTheater.org ',
    }
  },
  computed: {
    ...mapGetters({
      showAllDownloads: 'showAllDownloads',
    }),
    actors() {
      if (this.episode && this.episode.actors && this.artists) {
        return this.artists.body.filter((a) => {
          return this.episode.actors.includes(parseInt(a.ID))
        })
      } else {
        return []
      }
    },
    links() {
      const quality = [
        'kl-vinyl',
        'kf-archive',
        'kl-kf',
        'archive-org',
        'kl-extra',
        'kl-rwm',
        'kl-jl',
        'kl-DH',
        'kl-dlg',
        'kl-ed',
        'kl-jc',
        'kl-pp',
        'kl-tc',
        'kl-ws',
        'kl-pp',
        'kl-cinci',
        'kl-rw',
        'kl-kixi',
        'kl-rb',
        'kl-misc',
        'kl-post-2013distro',
        'kl-br',
      ]

      const source = [
        'High quality vinyl transfer provided by Ken Long',
        'High quality reel-to-reel transfer provided by Keith Flowers via archive.org',
        'Ken Long Collection: KF',
        'MP3 provided by archive.org',
        'Ken Long collection',
        'Ken Long Collection: RWM',
        'Ken Long Collection: JL',
        'Ken Long Collection: DH',
        'Ken Long Collection: DLG',
        'Ken Long Collection: ED',
        'Ken Long Collection: JC',
        'Ken Long Collection: PP',
        'Ken Long Collection: TC',
        'Ken Long Collection: WS',
        'Ken Long Collection: PP',
        'Ken Long Collection: CINCI',
        'Ken Long Collection: RW',
        'Ken Long Collection: KIXI',
        'Ken Long Collection: RB',
        'Ken Long Collection: MISC',
        'Ken Long Collection: POST-2013',
        'Ken Long Collection: BR',
        'Source unknown',
      ]
      const sourceLink = [
        'http://cbsrmt.thelongtrek.com/vinyl/index.htm',
        'http://cbsrmt.thelongtrek.com/kf/kf.html',
        'https://archive.org/details/CBSRMTKf',
        null,
        'http://cbsrmt.thelongtrek.com',
        'http://cbsrmt.thelongtrek.com/rwm/index.htm',
        'http://cbsrmt.thelongtrek.com/jl/jl.html',
        'http://cbsrmt.thelongtrek.com/DH/dh.html',
        'http://cbsrmt.thelongtrek.com/dlg/dlg.html',
        'http://cbsrmt.thelongtrek.com/ed/ed.html',
        'http://cbsrmt.thelongtrek.com/jc/jc.html',
        'http://cbsrmt.thelongtrek.com/pp/PP_Disk_1-16.html',
        'http://cbsrmt.thelongtrek.com/tc/tc.html',
        'http://cbsrmt.thelongtrek.com/ws/ws.html',
        'http://cbsrmt.thelongtrek.com/pp/PP_Disk_17.html',
        /*
        'http://cbsrmt.thelongtrek.com/pp/PP_Disk_18.html',
        'http://cbsrmt.thelongtrek.com/pp/PP_Disk_19.html',
        'http://cbsrmt.thelongtrek.com/pp/PP_Disk_20.html',
        'http://cbsrmt.thelongtrek.com/pp/PP_Disk_21.html',
        'http://cbsrmt.thelongtrek.com/pp/PP_Disk_22.html',
        'http://cbsrmt.thelongtrek.com/pp/PP_Disk_23.html',
        'http://cbsrmt.thelongtrek.com/pp/PP_Disk_24.html',
        */
        'http://cbsrmt.thelongtrek.com/cinci/cinci.html',
        'http://cbsrmt.thelongtrek.com/rw/rw.htm',
        'http://cbsrmt.thelongtrek.com/kixi/kixi.html',
        'http://cbsrmt.thelongtrek.com/rb/RB-WLNH.htm',
        /*
        'http://cbsrmt.thelongtrek.com/rb/RB-WUWM.htm',
        'http://cbsrmt.thelongtrek.com/rb/RB-WBBM.htm',
        'http://cbsrmt.thelongtrek.com/rb/rb-wjw/rb-wjw.html',
        */
        'http://cbsrmt.thelongtrek.com/misc/misc.html',
        'http://cbsrmt.thelongtrek.com/post-2013distro/post-distro-2013-upgrades.htm',
        'http://cbsrmt.thelongtrek.com/br/br.htm',
        /*
        'http://cbsrmt.thelongtrek.com/br/br2.htm',
        'http://cbsrmt.thelongtrek.com/br/br3.htm',
        'http://cbsrmt.thelongtrek.com/br/br4.htm',
        */
        null,
      ]
      // first we map them
      const urls = this.episode.urls.map((u) => {
        let i = quality.indexOf(u.source)
        let cleanUrlFile = u.url.substring(u.url.lastIndexOf('/') + 1)

        cleanUrlFile = decodeURIComponent(cleanUrlFile)

        if (i < 0) {
          i = 4
        }
        return {
          url: u.url,
          quality: i,
          sourceTag: u.source,
          source: source[i],
          sourceLink: sourceLink[i],
          filename:
            String(this.episode.id).padStart(4, '0') +
            ' ' +
            this.episode.title +
            ' (' +
            cleanUrlFile +
            ').mp3',
        }
      })
      // then we sort them
      return urls.sort((a, b) => {
        if (a.quality < b.quality) {
          return -1
        } else if (a.quality > b.quality) {
          return 1
        } else {
          return 0
        }
      })
    },
  },
  methods: {
    altDownload(url) {
      this.$store.commit('appendToDownloadQueue', { url })
    },
    toggleShowAllDownloads(v) {
      this.$store.commit('showAllDownloads', v)
    },
  },
}
</script>
