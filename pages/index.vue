<template>
  <div class="container mx-auto">
    <div>
      <a
        href="https://archive.org/download/cbs_radio_mystery_theater/cbs_radio_mystery_theater-0701-0750.zip/cbs_radio_mystery_theater-0701-0750%2Fcbsrmt_0749_neatness_counts.mp3"
      >
        Test Link
      </a>
      <nuxt-content :document="page" />
      <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div
            class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
          >
            <div
              class="
                shadow
                overflow-hidden
                border-b border-gray-200
                sm:rounded-lg
              "
            >
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="
                        px-6
                        py-3
                        text-left text-xs
                        font-medium
                        text-gray-500
                        uppercase
                        tracking-wider
                      "
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      class="
                        px-6
                        py-3
                        text-left text-xs
                        font-medium
                        text-gray-500
                        uppercase
                        tracking-wider
                      "
                    >
                      Description
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="(episode, i) in episodes.body" :key="episode.ID">
                    <td class="px-6 py-4">
                      <a :href="episode.URL" target="_blank">
                        {{ episode.Title }}
                      </a>
                    </td>
                    <td class="px-6 py-4">
                      {{ episode.Description }}
                    </td>
                    <td class="px-6 py-4">
                      <div v-if="activeEpisode === episode.ID">
                        <a :href="links[i]" target="_blank">Download</a>
                        <audio controls>
                          <source :src="links[i]" type="audio/mpeg" />
                        </audio>
                      </div>
                      <nuxt-link v-else :to="'/episode/' + episode.ID">
                        {{ episode.ID }}
                      </nuxt-link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const slugify = function (s, separator = '-') {
  return (
    s
      // split an accented letter in the base letter and the acent    .toString()
      .normalize('NFD')
      // remove all previously split accents
      .replace(/[\u0300-\u036F]/g, '')
      .toLowerCase()
      .trim()
      // remove all chars not letters, numbers and spaces (to be replaced)
      .replace(/[^a-z0-9 ]/g, '')
      .replace(/\s+/g, separator)
  )
}

export default {
  data() {
    return {
      activeEpisode: -1,
    }
  },
  async asyncData({ $content, store }) {
    const page = await $content('hello').fetch()
    const episodes = await $content('episodes-all').fetch()
    return {
      page,
      episodes,
    }
  },
  computed: {
    links() {
      const a = []
      if (typeof this.episodes !== 'object' || this.episodes.body.length < 1) {
        return a
      }
      for (let i = 1; i < 1400; i += 50) {
        const endValue = i < 1351 ? i + 49 : 1399
        const startString = String(i).padStart(4, '0')
        const endString = String(endValue).padStart(4, '0')
        const urlStart =
          'https://archive.org/download/cbs_radio_mystery_theater/cbs_radio_mystery_theater-' +
          startString +
          '-' +
          endString +
          '.zip/cbs_radio_mystery_theater-' +
          startString +
          '-' +
          endString +
          '%2Fcbsrmt_'
        for (let j = i; j < (i < 1351 ? i + 50 : 1400); j++) {
          if (this.episodes.body[j - 1].Title) {
            a.push(
              urlStart +
                String(j).padStart(4, '0') +
                '_' +
                slugify(this.episodes.body[j - 1].Title, '_') +
                '.mp3'
            )
          } else {
            a.push('missing title')
          }
        }
      }
      return a
    },
  },
}
</script>
