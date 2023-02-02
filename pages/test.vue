<template>
  <div class="bg-white max-w-5xl mx-auto p-6 mt-6 transitionable">
    <p>Test</p>
    <pre> store.counter: {{ counter }}</pre>
    <p>
      <TranLink
        to="/test2"
        nav-tag="test"
        :depth="1"
        :index="2"
        class="bg-slate-200 rounded p-2 m-2"
        >Slide Test 2</TranLink
      >
      <TranLink
        to="/test2"
        nav-tag="test"
        :depth="1"
        :index="2"
        class="bg-slate-200 rounded p-2 m-2"
        >Fade Test 2</TranLink
      >
      <button class="bg-orange-200 rounded p-2 m-2" @click="counterPlus">
        Counter++
      </button>
      <button class="bg-green-200 rounded p-2 m-2" @click="counterReset">
        Reset Counter
      </button>
    </p>
    <pre> store.navTo.index: {{ navTo.index }}</pre>
    <p>
      <button class="bg-orange-200 rounded p-2 m-2" @click="navToPlus">
        NavTo++
      </button>
      <button class="bg-green-200 rounded p-2 m-2" @click="navToReset">
        Reset NavTo
      </button>
    </p>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';

import { useTestStore } from '~/stores/TestStore';

const store = useTestStore();

const { counter, navTo } = storeToRefs(store);

const counterPlus = () => {
  counter.value = counter.value + 1;
};

const counterReset = () => {
  counter.value = 0;
};

const navToPlus = () => {
  navTo.value.index = navTo.value.index + 1;
};

const navToReset = () => {
  navTo.value.index = 0;
};

onMounted(() => {
  counter.value = (counter?.value ?? 0) + 1;
});

/*
// we can't use definePageMeta b/c it is a not a real function - it's a macro
// and cannot refer to local vars
definePageMeta({
  pageTransition: {
    name: 'slide-bottom' // ok
    // name: counter.value // error (counter is not defined)
    // name: useSomeStore().someValue // error (no active Pinia)
  }
})
*/
// you should not modify the store in setup, though
// counter.value = counter.value + 1
/*

// modifying the store directly seems to work, but is not proper
const counterPlus = () => {
  store.counter = store.counter + 1
}

const counterReset = () => {
  store.counter = 0;
}

const navToPlus = () => {
  store.navTo.index = store.navTo.index + 1
}

const navToReset = () => {
  store.navTo.index = 0;
}

*/
</script>
