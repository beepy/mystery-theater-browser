<template>
  <label class="iftal"
    ><span>{{ label }}</span>
    <input
      v-bind="$attrs"
      ref="input"
      :placeholder="placeholder"
      :type="type"
      :maxlength="256"
      :name="name"
      :aria-label="label"
      class=""
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
  /></label>
</template>
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: string | number;
    type?: string;
    label: string;
    name?: string;
    placeholder?: string;
    maxlength?: number;
    focusOnMount?: boolean;
  }>(),
  {
    type: 'text',
    name: '',
    placeholder: '',
    maxlength: 255,
    focusOnMount: false,
  }
);

const input = ref(null as HTMLInputElement | null);

defineEmits(['update:modelValue']);
defineExpose({ input });

onMounted(() => {
  if (input.value) {
    input.value.focus();
    input.value.select();
  }
});
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<style>
label.iftal {
  position: relative;
  transition: color 0.3s;
  display: inline-block;
  --input-padding: 0.714em;
  --label-font-size: 0.67;
}

label.iftal > span:first-child {
  position: absolute;
  left: 2px;
  top: 2px;
  font-size: calc(var(--label-font-size) * 1em);
  line-height: 1;
  /*  padding: calc(calc(var(--input-padding) / var(--label-font-size)) - 2px)
    calc(calc(var(--input-padding) / var(--label-font-size)) - 2px);
*/
  z-index: 1;
  /* postcss fails in build with nested calcs */
  --c1: calc(var(--input-padding) / var(--label-font-size));
  --c2: calc(var(--c1) - 2px);
  padding: var(--c2);
}

label.iftal > input,
label.iftal > textarea {
  line-height: 1.5;
  height: auto;
  display: block;
  font-size: inherit;
  padding: 2.25em var(--input-padding) var(--input-padding);
  width: 100%;
  background: none;
  border: 0 none transparent;
}
</style>
