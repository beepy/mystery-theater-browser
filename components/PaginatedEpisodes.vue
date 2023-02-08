<template>
  <div class="paginated-episodes" @keyup.esc="showingModal = false">
    <div class="pb-20 align-middle inline-block min-w-full">
      <div
        class="shadow overflow-hidden border-b border-gray-200 md:rounded-lg bg-white transitionable"
      >
        <div class="min-w-full divide-y divide-gray-200">
          <div class="hidden md:grid grid-cols-12 bg-gray-50">
            <div
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider col-span-4"
            >
              Title/Cast
            </div>
            <div
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider col-span-6 xl:col-span-7"
            >
              Description
            </div>
            <div
              class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider col-span-2 xl:col-span-1"
            >
              Episode
            </div>
          </div>
          <TranLink
            v-for="episode in episodes"
            :key="episode.id"
            :to="'/episode/' + episode.id"
            class="grid grid-cols-12 hover:bg-gray-50 row"
            :depth="2"
            nav-tag="episode"
            :index="episode.id"
          >
            <div class="order-1 col-span-8 md:col-span-4 px-6 py-4">
              <span class="block font-bold">
                {{ episode.title }}
              </span>
              <div class="leading-tight mt-2">
                <span
                  v-for="(actor, i) in episode.actors"
                  :key="actor.id"
                  class="text-xs"
                >
                  <span v-if="i > 0">, </span>
                  <span class="whitespace-nowrap">{{ actor.name }}</span>
                </span>
              </div>
            </div>
            <div
              class="order-3 md:order-2 col-span-12 md:col-span-6 xl:col-span-7 px-6 py-4"
            >
              <ContentRenderer :value="episode" class="nuxt-content" />
              <EpisodeTags
                v-if="episode.tags"
                :episode-tags="episode.tags"
                class="block text-right"
              />
            </div>
            <div
              class="order-2 md:order-3 col-span-4 md:col-span-2 xl:col-span-1 px-6 py-4 text-center"
            >
              <div class="text-xs text-center mb-2">
                {{ episode.date }}
              </div>
              <EpisodeNumber :number="episode.id" />
            </div>
          </TranLink>
        </div>
      </div>
    </div>
    <div class="fixed bottom-4 left-0 w-full">
      <div class="flex flex-col items-center">
        <div
          ref="pill"
          class="flex h-12 items-center justify-center rounded-full bg-gray-200 pill"
        >
          <PaginationComponent
            v-if="!showingModal"
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
              >
                <ChevronLeft class="w-6 h-6" />
              </TranLink>
              <div
                v-else
                class="h-12 w-12 mr-1 flex justify-center items-center rounded-full bg-gray-200 opacity-25"
              >
                <ChevronLeft class="w-6 h-6" />
              </div>
              <button class="md:hidden" @click="showModal">
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
                <button v-if="pageNumber === -1" @click="showModal">…</button>
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
                <button v-if="pageNumber === -1" @click="showModal">…</button>
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
              @submit.prevent="showingModal = false"
            >
              <button
                type="button"
                class="px-4 mr-4 text-gray-600"
                style="height: 100%"
                @click="showingModal = false"
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
                class="w-12"
                style="
                  background-color: transparent;
                  border-bottom: 1px solid black;
                "
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
    <!-- <BeepyModal :show="showingModal && false" class="jump-to-page" @cancel="showingModal = false; jumpToPageNumberString = currentPageNumber + ''">
      <form @submit.prevent="doJumpToPageNumber">
        <InputWithTopAlignedLabel
          ref="pageInput"
          v-model="jumpToPageNumberString"
          type="number"
          name="jumpToPageNumber"
          :label="`Page Number (1—${totalPageNumber})`"
          focus-on-mount
        />
        <button type="submit" :disabled="!canJumpToPageNumber">Jump to Page</button>
      </form>
    </BeepyModal> -->
  </div>
</template>

<script setup lang="ts">
import debounce from 'lodash.debounce';

import ArrowRightIcon from '@/assets/svg/arrowRight.svg';
import CloseIcon from '@/assets/svg/closeIcon.svg';
import ChevronRight from '@/assets/svg/chevronRight.svg';
import ChevronLeft from '@/assets/svg/chevronLeft.svg';

const router = useRouter();

const props = withDefaults(
  defineProps<{
    currentPageNumber?: number;
    totalPageNumber?: number;
    episodes?: any[];
    linkPrefix?: string;
    firstPageLink?: string;
    navTag?: string;
    navDepth?: number;
    searchTerms?: string;
  }>(),
  {
    currentPageNumber: 1,
    totalPageNumber: 1,
    episodes() {
      return [];
    },
    linkPrefix: '/page',
    navTag: '',
    navDepth: 1,
  }
);

const showingModal = ref(false);
const jumpToPageNumberString = ref(props.currentPageNumber + '');
const pageInput = ref(null);
const jumpToInput = ref(null as null | HTMLInputElement);

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

watch(showingModal, () => {
  updatePill();
});

const showModal = () => {
  showingModal.value = true;
  nextTick(() => {
    //   pageInput.value?.input?.focus()
    jumpToInput.value?.select();
  });
};

watch(
  () => props.currentPageNumber,
  (v) => {
    jumpToPageNumberString.value = v + '';
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
  // showingModal.value = false;
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
// .modal.jump-to-page {
//   display: flex;
//   align-items: flex-end;
//   background-color: rgb(31 41 55 / 0.95);
//   > * {
//     flex-basis: 100%;
//   }
//   > * > * {
//     width: 25rem;
//     margin: 0 auto;
//     background-color: white;
//     form {
//       display: grid;
//       grid-template-columns: 13rem auto;
//       align-items: center;
//     }
//     label.iftal {
//       max-height: 10rem;
//       --label-font-size: 0.9;
//       & > span {
//         font-weight: bold;
//       }
//       & > input {
//         @apply bg-gray-100;
//       }
//     }
//     button {
//       background-color: green;
//       height: 100%;
//       padding: {
//         left: 2em;
//         right: 2rem;
//       }
//       &:disabled {
//         opacity: 0.5;
//       }
//     }
//   }
// }
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
