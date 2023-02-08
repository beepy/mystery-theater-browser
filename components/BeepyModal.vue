<template>
  <Teleport to="#foobarmodals">
    <Transition name="modal">
      <div
        v-if="show"
        class="modal fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        v-bind="$attrs"
        @click="$emit('cancel')"
      >
        <div
          class="modal-dialog relative w-auto pointer-events-none"
          @click.stop=""
        >
          <div
            class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current"
          >
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    show?: boolean;
  }>(),
  {
    show: false,
  }
);

defineEmits(['cancel']);
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
