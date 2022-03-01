<template>
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
        <input-with-top-aligned-label
          v-model="name"
          type="text"
          name="name"
          label="Your Name"
          class="contact"
        />
      </p>
      <p>
        <input-with-top-aligned-label
          v-model="email"
          type="email"
          name="email"
          label="Your Email"
          class="contact"
        />
      </p>
      <p>
        <textarea-with-top-aligned-label
          v-model="message"
          type="text"
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
</template>
<script>
import InputWithTopAlignedLabel from '~/components/InputWithTopAlignedLabel'
import TextareaWithTopAlignedLabel from '~/components/TextareaWithTopAlignedLabel'
export default {
  components: { InputWithTopAlignedLabel, TextareaWithTopAlignedLabel },
  data() {
    return {
      name: '',
      email: '',
      message: '',
    }
  },
}
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
