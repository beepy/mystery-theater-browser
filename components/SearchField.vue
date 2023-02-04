<template>
  <div class="relative px-2 md:px-0">
    <input
      :value="newTerms"
      placeholder="Search"
      class="px-3 py-3 mb-4 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded-lg text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
      @input="search(($event.target as HTMLInputElement).value || '')"
    />
    <svg
      v-if="searchTerms.length > 2"
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 18 18"
      class="absolute right-2 top-2 cursor-pointer"
      @click="clear"
    >
      <path
        d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
      />
    </svg>
    <p
      v-if="searchTerms.length > 2"
      class="p-4 mb-4 rounded-lg text-center text-white hide-on-leave"
    >
      Searching for ”<strong>{{ searchTerms }}</strong
      >”<span v-if="searchTerms === searchedTerms"
        >. Found <strong> {{ count }}</strong> episode<span v-if="count !== 1"
          >s</span
        >.</span
      ><span v-else>…</span>
    </p>
  </div>
</template>
<script lang="ts" setup>
import debounce from 'lodash.debounce';
import { useSearchStore } from '@/stores/SearchStore';

const router = useRouter();
const searchStore = useSearchStore();
const newTerms = ref('');
const searchTerms = ref('');
const searchedTerms = ref('');
const count = ref(0);

const updateSearchTerms = debounce((s: string) => {
  if (searchTerms.value !== s) {
    searchTerms.value = s;
    searchStore.$patch({
      terms: searchTerms.value,
      // matchedIds: d.map((e) => e.id),
    });
    router.push('/');
    // queryContent('episodes')
    //   .where({ _searchable: { $regex: `/${s}/ig` } })
    //   // .where({ _searchable: { $regex: /blood/ig } })
    //   // .where({ title: s })
    //   .only(['id'])
    //   .find()
    //   .then((d) => {
    //     count.value = d.length;
    //     searchedTerms.value = s;
    //     searchStore.$patch({
    //       terms: searchTerms.value,
    //       matchedIds: d.map((e) => e.id),
    //     });
    //     router.push('/');
    //   });
  }
}, 333);

const search = (t: string) => {
  newTerms.value = t;
  updateSearchTerms(t.trim());
};

const clear = () => {
  updateSearchTerms.cancel();
  newTerms.value = '';
  searchTerms.value = '';
  searchStore.$patch({
    terms: '',
    matchedIds: [],
  });
  router.push('/');
};

onBeforeUnmount(() => {
  updateSearchTerms.flush();
});
</script>
