<template>
  <div>
    <div class="max-w-xs mx-auto nuxt-content">
      <h2 class="text-center text-gray-100">Contact</h2>
      <form
        name="contact"
        method="post"
        netlify
        netlify-honeypot="alt"
        class="px-4"
      >
        <input type="hidden" name="form-name" value="contact" />
        <input type="text" name="alt" class="bot" />
        <p>
          <InputWithTopAlignedLabel
            v-model="name"
            type="text"
            name="name"
            label="Your Name"
            class="contact"
          />
        </p>
        <p>
          <InputWithTopAlignedLabel
            v-model="email"
            type="email"
            name="email"
            label="Your Email"
            class="contact"
          />
        </p>
        <p>
          <TextAreaWithTopAlignedLabel
            v-model="message"
            name="message"
            label="Your Message"
            class="contact textarea"
          />
        </p>
        <p class="text-right mt-4">
          <button
            type="submit"
            class="px-10 py-2 rounded-lg bg-green-500 text-gray-900 font-bold"
          >
            Send
          </button>
        </p>
      </form>
    </div>
  </div>
</template>
<script lang="ts" setup>
const name = ref('');
const email = ref('');
const message = ref('');

useHead({
  title: 'Contact',
});
</script>

<style>
label.iftal {
  width: 100%;
}

label.iftal > span {
  font-weight: bold;
}

label.iftal > input {
  /*  border-radius: 0.5em;
  border: 1px solid black;
  background-color: #e7f5ff;
  */
}
</style>
