<template>
  <div
    class="
      md:container
      md:mx-auto
      bg-white
      md:mt-10
      px-4
      md:rounded-lg
      shadow
      overflow-hidden
    "
  >
    <div class="grid grid-cols-4 gap-6 mb-6 px-4 py-6 bg-gray-200 -mx-4">
      <div class="col-span-3">
        <h1 class="text-3xl font-bold">{{ episode.title }}</h1>
      </div>
      <div>
        <p class="text-xs mb-2">{{ episode.date }}</p>
        <episode-number :number="episode.id" />
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
      <div class="col-span-4 text-xs -mb-10">Preview</div>
      <div class="col-span-4" v-for="url in links" :key="url.url">
        <div class="grid grid-cols-4 gap-6 mb-6">
          <div class="col-span-4">
            <a v-if="url.sourceLink" :href="url.sourceLink" target="_blank">
              {{ url.source }}
            </a>
            <span v-else>{{ url.source }}</span>
          </div>
          <div class="col-span-4">
            <div class="flex items-center">
              <div v-if="url.sourceTag !== 'kl-vinyl'" class="flex-grow pr-4">
                <!-- height 42 -->
                <audio controls preload="metadata" class="w-full rounded-lg">
                  <source :src="url.url" type="audio/mpeg" />
                </audio>
              </div>
              <div>
                <a
                  :href="url.url"
                  :download="episode.title + '.mp3'"
                  class="
                    block
                    px-4
                    py-2
                    rounded
                    bg-green-600
                    text-center text-white
                  "
                  style="font-weight: bold"
                >
                  Download
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    class="inline-block"
                  >
                    <path
                      d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--
    <p v-if="episode.id < 1399">
      <nuxt-link :to="'/episode/' + (episode.id + 1)">Next</nuxt-link>
    </p>
    -->
  </div>
</template>
<script>
import EpisodeNumber from '~/components/EpisodeNumber'
export default {
  components: { EpisodeNumber },
  computed: {
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
      const quality = ['kl-vinyl', 'kf-archive', 'archive-org']
      const source = [
        'High quality vinyl transfer provided by Ken Long',
        'High quality reel-to-reel transfer provided by Keith Flowers via archive.org',
        'MP3 provided by archive.org',
        'Source unknown',
      ]
      const sourceLink = [
        'http://cbsrmt.thelongtrek.com/vinyl/index.htm',
        'https://archive.org/details/CBSRMTKf',
        null,
        null,
      ]
      // first we map them
      const urls = this.episode.urls.map((u) => {
        let i = quality.indexOf(u.source)
        if (i < 0) {
          i = 3
        }
        return {
          url: u.url,
          quality: i,
          sourceTag: u.source,
          source: source[i],
          sourceLink: sourceLink[i],
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
  async asyncData({ $content, store, params }) {
    const episode = await $content('episodes/' + params.slug).fetch()
    // const artists = await $content('artists').fetch()
    return {
      episode,
      // artists,
    }
  },
}
</script>
