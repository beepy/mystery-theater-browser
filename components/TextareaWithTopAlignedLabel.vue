<template>
  <label class="iftal textarea"
    ><span>{{ label }}</span>
    <textarea
      :placeholder="placeholder"
      :name="name"
      :aria-label="label"
      class=""
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
  </label>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
}
</script>
<style>
label.iftal {
  position: relative;
  transition: color 0.3s;
  display: inline-block;
  --input-padding: 0.714em;
  --label-font-size: 0.67;
}

label.iftal.textarea > span:first-child {
  position: absolute;
  left: 2px;
  top: 1px;
  font-size: calc(var(--label-font-size) * 1em);
  line-height: 1;
  /*  padding: calc(calc(var(--input-padding) / var(--label-font-size)) - 1px)
    calc(calc(var(--input-padding) / var(--label-font-size)) - 2px)
    calc(calc(var(--input-padding) / var(--label-font-size)) - 2px);
*/
  z-index: 1;
  /*  width: calc(
    100% -
    calc(
      calc(
        calc(
          var(--input-padding) /
          var(--label-font-size)
        ) -
        2px
      ) *
      2
    )
  );
*/
  /* postcss fails in build with nested calcs */
  --c1: calc(var(--input-padding) / var(--label-font-size));
  --c2: calc(var(--c1) - 2px);
  --c3: calc(var(--c2) * 2);
  padding: calc(var(--c1) - 1px) var(--c2) var(--c2);
  width: calc(100% - var(--c3));
}

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
