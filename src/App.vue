<template>
  <AppHeader />
  <Desktop />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import AppHeader from './components/AppHeader.vue';
import Desktop from './components/Desktop.vue';

@Options({
  components: {
    AppHeader,
    Desktop,
  },
})
export default class App extends Vue {}
</script>

<style lang="sass">
*
  padding: 0
  margin: 0
  box-sizing: border-box
  font-family: $font

#app
  min-height: 100vh
  display: flex
  flex-direction: column
  overflow: hidden
</style>
