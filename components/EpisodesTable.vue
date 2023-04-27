<template>
  <div class="pb-20 align-middle inline-block min-w-full episodes-table">
    <div
      ref="container"
      class="shadow overflow-hidden border-b border-gray-200 md:rounded-lg xtransitionable"
    >
      <div class="min-w-full divide-y divide-gray-200 relative">
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
        <div
          class="contextual-transition-container bg-white"
          :style="`min-height: ${emptyHeight}px;`"
        >
          <Transition name="contextual-transition-">
            <div ref="tableContent" :key="page">
              <EpisodesTableContent
                :page="page"
                :is-searching="isSearching"
                :terms="terms"
                @updateHeight="setHeight"
              />
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  page: number;
  isSearching: boolean;
  emptyHeight: number;
  terms?: string;
}>();

/**
 * Concern about setting, getting, and emitting the height is for visual
 * consistency when paging through table. The table may be shown before it is
 * filled, replacing the table before it. We start with the last known height to
 * e.g. prevent the scroll bar for disappearing (as with an empty table)
 * @param {[type]} null as null | HTMLElement [description]
 */
const container = ref(null as null | HTMLElement);
const height = ref(0);
const emit = defineEmits(['updateHeight']);
const header = ref(null as null | HTMLElement);
const tableContent = ref<null | HTMLElement>(null);

function setHeight() {
  if (tableContent.value) {
    height.value =
      (tableContent.value?.getBoundingClientRect().height || 0) - 0;
    emit('updateHeight', height.value);
  }
}

onMounted(() => {
  window.addEventListener('resize', setHeight);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', setHeight);
});

function resolveTest() {
  updateContextualTransitionResolve();
}
</script>
