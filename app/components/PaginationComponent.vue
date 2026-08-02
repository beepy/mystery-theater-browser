<template>
  <div class="flex h-12 font-medium">
    <slot name="previous" :page-number="current > 1 ? current - 1 : -1">
      <div
        class="h-12 w-12 mr-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-chevron-left w-6 h-6"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </div>
    </slot>
    <template v-for="(p, i) in pageArray">
      <slot name="page" :page-number="p">
        <div
          :key="i"
          :class="{
            'w-12 md:flex justify-center items-center hidden': true,
            'cursor-pointer': p !== current && p !== -1,
            'leading-5 transition duration-150 ease-in': true,
          }"
        >
          <template v-if="p === -1">… </template>
          <template v-else>{{ p }} </template>
        </div>
      </slot>
    </template>
    <slot name="jump" />
    <slot name="next" :page-number="current < last ? current + 1 : -1">
      <div
        class="h-12 w-12 mr-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-chevron-left w-6 h-6"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </div>
    </slot>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    first?: number;
    last: number;
    current: number;
    span?: number;
  }>(),
  {
    first: 1,
    span: 7,
  }
);

const boundSpan = computed(() => {
  return Math.min(props.last, props.span);
});

const middleIndex = computed(() => {
  return Math.ceil(boundSpan.value * 0.5);
});

const currentIndex = computed(() => {
  if (props.current <= middleIndex.value) {
    return props.current;
  } else if (props.last - props.current < boundSpan.value - middleIndex.value) {
    return boundSpan.value - (props.last - props.current);
  } else {
    return middleIndex.value;
  }
});

const pagesBefore = computed(() => {
  const a = [];
  if (props.current === currentIndex.value || props.last <= props.span) {
    for (let i = 0; i < currentIndex.value - 1; i++) {
      a.push(i + 1);
    }
  } else {
    if (currentIndex.value > 0) {
      a.push(1);
    }
    if (currentIndex.value > 1) {
      a.push(-1);
    }
    for (let i = 2; i < currentIndex.value - 1; i++) {
      a.push(props.current - (currentIndex.value - i) + 1);
    }
  }
  return a;
});

const pagesAfter = computed(() => {
  const a = [];
  if (props.span - currentIndex.value >= props.last - props.current) {
    for (let i = props.current; i < props.last; i++) {
      a.push(i + 1);
    }
  } else {
    for (let i = currentIndex.value; i < props.span - 2; i++) {
      a.push(i + 1 - currentIndex.value + props.current);
    }
    if (props.span - currentIndex.value > 1) {
      a.push(-1);
    }
    if (props.span - currentIndex.value > 2) {
      a.push(props.last);
    }
  }
  return a;
});

const pageArray = computed(() => {
  const a = pagesBefore.value.concat([props.current]);
  const b = a.concat(pagesAfter.value);
  return b;
});
</script>
