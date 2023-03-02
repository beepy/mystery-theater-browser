<template>
  <div
    ref="paginatedEpisodesContainer"
    class="paginated-episodes"
    @keyup.esc="showingPageInput = false"
  >
    <Transition :name="tableTransition" mode="out-in">
      <EpisodesTable
        v-if="!episodes || episodes.length > 0"
        :key="tableKey"
        ref="episodesTable"
        :episodes="episodes"
        :empty-height="height"
        @update-height="updateHeight"
      />
    </Transition>
    <div class="fixed bottom-4 left-0 w-full">
      <div class="flex flex-col items-center">
        <div
          ref="pill"
          class="flex h-12 items-center justify-center rounded-full bg-gray-200 pill"
        >
          <PaginationComponent
            v-if="!showingPageInput"
            :key="totalPageNumber"
            :last="totalPageNumber"
            :current="currentPageNumber"
            :span="13"
          >
            <template #previous="{ pageNumber }">
              <TranLink
                v-if="pageNumber > 0"
                class="h-12 w-12 mr-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer"
                :to="linkForPageNumber(pageNumber)"
                :depth="navDepth"
                :nav-tag="navTag"
                :index="pageNumber"
                aria-label="Previous page"
              >
                <ChevronLeft class="w-6 h-6" />
              </TranLink>
              <div
                v-else
                class="h-12 w-12 mr-1 flex justify-center items-center rounded-full bg-gray-200 opacity-25"
              >
                <ChevronLeft class="w-6 h-6" />
              </div>
              <button class="md:hidden" @click="showPageInput">
                {{ currentPageNumber }}/{{ totalPageNumber }}
              </button>
            </template>
            <template #page="{ pageNumber }">
              <TranLink
                v-if="pageNumber !== -1 && pageNumber !== currentPageNumber"
                :class="{
                  'w-12 md:flex justify-center items-center hidden': true,
                  'cursor-pointer': true,
                  'leading-5 transition duration-150 ease-in': true,
                }"
                :to="linkForPageNumber(pageNumber)"
                :depth="navDepth"
                :nav-tag="navTag"
                :index="pageNumber"
              >
                <button v-if="pageNumber === -1" @click="showPageInput">
                  …
                </button>
                <template v-else>{{ pageNumber }}</template>
              </TranLink>
              <div
                v-else
                :class="{
                  'w-12 md:flex justify-center items-center hidden': true,
                  'text-red-500': pageNumber === currentPageNumber,
                  'leading-5 transition duration-150 ease-in': true,
                }"
              >
                <button v-if="pageNumber === -1" @click="showPageInput">
                  …
                </button>
                <template v-else>{{ pageNumber }}</template>
              </div>
            </template>
            <template #next="{ pageNumber }">
              <TranLink
                v-if="pageNumber > 0"
                class="h-12 w-12 mr-1 flex justify-center items-center rounded-full bg-gray-200"
                :to="linkForPageNumber(pageNumber)"
                :depth="navDepth"
                :nav-tag="navTag"
                :index="pageNumber"
                aria-label="Next page"
              >
                <ChevronRight class="w-6 h-6" />
              </TranLink>
              <div
                v-else
                class="h-12 w-12 mr-1 flex justify-center items-center rounded-full bg-gray-200 opacity-25"
              >
                <ChevronRight class="w-6 h-6" />
              </div>
            </template>
          </PaginationComponent>
          <div v-else>
            <form
              class="h-12 flex"
              style="align-items: center"
              @submit.prevent="showingPageInput = false"
            >
              <button
                type="button"
                class="px-4 mr-4 text-gray-600"
                style="height: 100%"
                @click="showingPageInput = false"
              >
                <CloseIcon class="w-6" />
              </button>
              <p class="pr-2">Jump to page:</p>
              <input
                ref="jumpToInput"
                v-model="jumpToPageNumberString"
                type="number"
                :max="totalPageNumber"
                min="1"
                inputmode="numeric"
                class="w-12 bg-transparent border-b border-black"
              />
              <button
                type="submit"
                class="px-4 text-blue-800 bg-blue-200 h-8 rounded-full mr-2 ml-4 disabled:opacity-25 transition-opacity"
                :disabled="!canJumpToPageNumber"
              >
                <ArrowRightIcon class="w-6" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import debounce from 'lodash.debounce';
import { Episode } from '@/types/episode';

import ArrowRightIcon from '@/assets/svg/arrowRight.svg';
import CloseIcon from '@/assets/svg/closeIcon.svg';
import ChevronRight from '@/assets/svg/chevronRight.svg';
import ChevronLeft from '@/assets/svg/chevronLeft.svg';
import EpisodesTable from '@/components/EpisodesTable.vue';

const router = useRouter();

const props = withDefaults(
  defineProps<{
    currentPageNumber?: number;
    totalPageNumber?: number;
    episodes: Episode[] | null;
    linkPrefix?: string;
    firstPageLink?: string;
    navTag?: string;
    navDepth?: number;
    searchTerms?: string;
  }>(),
  {
    currentPageNumber: 1,
    totalPageNumber: 1,
    linkPrefix: '/page',
    navTag: '',
    navDepth: 1,
  }
);

const showingPageInput = ref(false);
const jumpToPageNumberString = ref(props.currentPageNumber + '');
const pageInput = ref(null);
const jumpToInput = ref(null as null | HTMLInputElement);
const header = ref(null as null | HTMLElement);
const tableKey = ref(1);
const tableTransition = ref('slide-left');
const paginatedEpisodesContainer = ref(null as null | HTMLElement);
const episodesTable = ref(null as null | typeof EpisodesTable);
const height = ref(0);
let lastSearchTerms: string | undefined = '';

function linkForPageNumber(p: string | number) {
  const l = {
    path:
      p === 1 && props.firstPageLink
        ? props.firstPageLink
        : props.linkPrefix + '/' + p,
    query: {},
  };
  if (props.searchTerms && props.searchTerms.length > 2) {
    l.query = {
      search: props.searchTerms,
    };
  }
  return l;
}

watch(showingPageInput, () => {
  updatePill();
});

const showPageInput = () => {
  showingPageInput.value = true;
  nextTick(() => {
    jumpToInput.value?.select();
  });
};

watch(
  () => props.currentPageNumber,
  (v, p) => {
    jumpToPageNumberString.value = v + '';
    if (header.value) {
      header.value.scrollIntoView({ behavior: 'smooth' });
    }
    if (props.searchTerms !== lastSearchTerms) {
      lastSearchTerms = props.searchTerms;
      tableTransition.value = 'page';
    } else if (v < p) {
      tableTransition.value = 'slide-left';
    } else {
      tableTransition.value = 'slide-right';
    }
  }
);

watch(
  () => props.searchTerms,
  () => {
    lastSearchTerms = props.searchTerms;
    tableTransition.value = 'page';
  }
);
function updateHeight(h: number) {
  height.value = h;
}

watch(
  () => props.episodes,
  (v, o) => {
    if (o) {
      tableKey.value = tableKey.value + 1;
    }
  }
);

const jumpToPageNumber = computed((): number => {
  const p = parseInt(jumpToPageNumberString.value);

  if (typeof p === 'number') {
    return Math.floor(p);
  } else {
    return -1;
  }
});

const canJumpToPageNumber = computed(() => {
  return (
    jumpToPageNumber.value >= 1 &&
    jumpToPageNumber.value <= props.totalPageNumber
  );
});

watch(
  jumpToPageNumber,
  debounce((v) => {
    doJumpToPageNumber();
  }, 333)
);

const doJumpToPageNumber = () => {
  if (canJumpToPageNumber.value) {
    router.push(linkForPageNumber(jumpToPageNumber.value));
  }
};

// Animation of Pill Container

const pill = ref(null as null | HTMLElement);
let haveAddedPillEventListener = false;

function setPillWidthFromContentWidth() {
  if (pill.value === null) {
    return;
  }
  const p = pill.value as HTMLElement;

  const el = p.querySelector(':scope > *'); // get first child

  if (!el) {
    return;
  }

  const size = el.getBoundingClientRect();

  p.style.width = size.width + 'px';
  if (!haveAddedPillEventListener) {
    haveAddedPillEventListener = true;
    p.addEventListener('transitionend', removeWidthFromPill);
  }
}

function updatePill() {
  setPillWidthFromContentWidth();
  nextTick(() => {
    setPillWidthFromContentWidth();
  });
}

function removeWidthFromPill(e: TransitionEvent) {
  if (e.propertyName === 'width' && e.target) {
    if (pill.value) {
      pill.value.style.width = '';
    }
  }
}

onUnmounted(() => {
  if (haveAddedPillEventListener && pill.value) {
    pill.value.removeEventListener('transitionend', removeWidthFromPill);
  }
});
</script>

<style lang="scss">
.paginated-episodes {
  .pill {
    transition: width 0.5s cubic-bezier(0.47, 1.64, 0.41, 0.8);
    overflow: hidden;
    > * {
      flex-grow: 0;
      flex-shrink: 1;
      white-space: nowrap;
    }
  }
}
</style>
