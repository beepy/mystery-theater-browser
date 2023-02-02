<template>
  <label class="iftal"
    ><span>{{ label }}</span>
    <input
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
    modelValue: string;
    type?: string;
    label: string;
    name?: string;
    placeholder?: string;
    maxlength?: number;
  }>(),
  {
    type: 'text',
    name: '',
    placeholder: '',
    maxlength: 255,
  }
);

defineEmits(['update:modelValue']);
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
