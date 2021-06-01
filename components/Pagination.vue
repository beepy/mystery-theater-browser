<template>
  <div class="flex flex-col items-center">
    <div class="flex h-12 font-medium rounded-full bg-gray-200">
      <slot name="previous" v-bind:pageNumber="current > 1 ? current - 1 : -1">
        <div
          class="
            h-12
            w-12
            mr-1
            flex
            justify-center
            items-center
            rounded-full
            bg-gray-200
            cursor-pointer
          "
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
        <slot name="page" v-bind:pageNumber="p">
          <div
            :class="{
              'w-12 md:flex justify-center items-center hidden': true,
              'cursor-pointer': p !== current && p !== -1,
              'leading-5 transition duration-150 ease-in': true,
            }"
            :key="i"
          >
            <template v-if="p === -1">… </template>
            <template v-else>{{ p }} </template>
          </div>
        </slot>
      </template>
      <slot name="next" v-bind:pageNumber="current < last ? current + 1 : -1">
        <div
          class="
            h-12
            w-12
            mr-1
            flex
            justify-center
            items-center
            rounded-full
            bg-gray-200
            cursor-pointer
          "
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
  </div>
</template>
<script>
export default {
  props: {
    first: {
      type: Number,
      default: 1,
    },
    last: {
      type: Number,
    },
    current: {
      type: Number,
    },
    span: {
      type: Number,
      default: 7,
      validator(v) {
        return v >= 7
      },
    },
  },
  computed: {
    boundSpan() {
      return this.span > this.last ? this.last : this.span
    },
    middleIndex() {
      // 0-based index, so for 7 this will be 3
      return Math.ceil(this.boundSpan * 0.5)
    },
    currentIndex() {
      if (this.current <= this.middleIndex) {
        return this.current
      } else if (this.last - this.current < this.boundSpan - this.middleIndex) {
        return this.boundSpan - (this.last - this.current)
      } else {
        return this.middleIndex
      }
    },
    pagesBefore() {
      const a = []
      if (this.current === this.currentIndex || this.last <= this.span) {
        for (let i = 0; i < this.currentIndex - 1; i++) {
          a.push(i + 1)
        }
      } else {
        if (this.currentIndex > 0) {
          a.push(1)
        }
        if (this.currentIndex > 1) {
          a.push(-1)
        }
        for (let i = 2; i < this.currentIndex - 1; i++) {
          a.push(this.current - (this.currentIndex - i) + 1)
        }
      }
      return a
    },
    pagesAfter() {
      const a = []
      if (this.span - this.currentIndex >= this.last - this.current) {
        for (let i = this.current; i < this.last; i++) {
          a.push(i + 1)
        }
      } else {
        for (let i = this.currentIndex; i < this.span - 2; i++) {
          a.push(i + 1 - this.currentIndex + this.current)
        }
        if (this.span - this.currentIndex > 1) {
          a.push(-1)
        }
        if (this.span - this.currentIndex > 2) {
          a.push(this.last)
        }
      }
      return a
    },
    pageArray() {
      const a = this.pagesBefore.concat([this.current])
      const b = a.concat(this.pagesAfter)
      return b
    },
  },
}
</script>
