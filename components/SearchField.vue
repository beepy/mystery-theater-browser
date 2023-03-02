<template>
  <div class="relative px-2 md:px-0">
    <input
      ref="searchField"
      :value="newTerms"
      placeholder="Search"
      class="px-3 py-3 mb-4 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded-lg text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
      @input="search(($event.target as HTMLInputElement).value || '')"
      @focus="hasFocus = true"
      @blur="hasFocus = false"
    />
    <CloseIcon
      v-if="searchTerms.length > 2"
      class="absolute right-4 md:right-2 top-2 cursor-pointer w-7 h-7"
      @click="clickClear"
    />
    <div
      v-else-if="!hasFocus"
      class="absolute right-4 md:right-2 top-2 keyboard-keys"
    >
      <KeyboardKeys :keys="shortcutKeysText" />
    </div>
    <p
      v-if="searchTerms.length > 2"
      class="p-4 mb-4 rounded-lg text-center text-white hide-on-leave"
    >
      Searching for ”<strong>{{ searchTerms }}</strong
      >”<span v-if="matchCount !== undefined"
        >. Found <strong> {{ matchCount }}</strong> episode<span
          v-if="matchCount !== 1"
          >s</span
        >.</span
      ><span v-else>…</span>
    </p>
  </div>
</template>
<script lang="ts" setup>
import debounce from 'lodash.debounce';

import { storeToRefs } from 'pinia';

import { useSearchStore } from '@/stores/SearchStore';
import { usePageStore } from '@/stores/PageStore';

import { useCaptureKey } from '@/composables/captureKey';
import { useIsMac } from '@/composables/isMac';

import CloseIcon from '@/assets/svg/closeIcon.svg';

// search

const router = useRouter();
const route = useRoute();
const searchStore = useSearchStore();
const newTerms = ref('');
const searchTerms = ref('');
const { matchCount } = storeToRefs(searchStore);
const { indexRoute } = storeToRefs(usePageStore());
const searchField = ref(null as HTMLInputElement | null);
const hasFocus = ref(false);

const updateSearchTerms = debounce((s: string) => {
  if (searchTerms.value !== s) {
    searchTerms.value = s;
    searchStore.$patch({
      terms: searchTerms.value,
    });
    if (s.trim().length > 2) {
      router.push({
        name: 'index',
        query: {
          search: s,
        },
      });
    } else {
      router.push(indexRoute.value);
    }
  }
}, 333);

const search = (t: string) => {
  newTerms.value = t;
  updateSearchTerms(t.trim());
};

const clear = (updateRoute = true) => {
  updateSearchTerms.cancel();
  newTerms.value = '';
  searchTerms.value = '';
  searchStore.$patch({
    terms: '',
  });
  if (updateRoute) {
    router.push(indexRoute.value);
  }
};

const clickClear = (_e: InputEvent) => {
  clear();
};

onMounted(() => {
  newTerms.value = searchTerms.value = searchStore.terms;
  searchStore.$patch({
    terms: searchTerms.value,
  });
});

onBeforeUnmount(() => {
  updateSearchTerms.flush();
});

watch(
  () => route.query.search,
  (s) => {
    if (typeof s === 'string') {
      search(s);
    }
  }
);

// keyboard shortcut

const { isMac } = useIsMac();

useCaptureKey(
  (e: KeyboardEvent) => {
    if (
      e.altKey === false &&
      ((e.metaKey === true && isMac.value) ||
        (e.ctrlKey === true && !isMac.value)) &&
      e.shiftKey === false &&
      e.key === 'k'
    ) {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === 'keydown') {
        if (searchField.value) {
          searchField.value.focus();
        }
      }
    }
  },
  true,
  true
);

const shortcutKeysText = computed(() => {
  if (isMac.value === undefined) {
    return '';
  } else {
    return isMac.value ? '⌘ K' : 'CTRL K';
  }
});
</script>

<style lang="scss">
.keyboard-keys {
  @apply text-gray-400;
  .keyboard-key {
    @apply bg-gray-100;
  }
}
</style>
