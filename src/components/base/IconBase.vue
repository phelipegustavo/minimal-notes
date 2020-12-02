<template>
  <svg :width="size" :height="size" viewBox="0 0 24 24">
    <path fill="currentColor" :d="path" />
  </svg>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    path: String,
    size: {
      type: Number,
      default: 24,
    },
  },
})
export default class App extends Vue {}
</script>
