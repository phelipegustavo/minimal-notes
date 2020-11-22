<template>
  <header class="app-header">
    <div class="title">
      <h1>{{ title }}</h1>
    </div>
    <div class="actions">
      <button class="action" @click="addNewNote">
        New note
      </button>
    </div>
  </header>
</template>
<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { mapActions } from 'vuex';

@Options({
  methods: {
    ...mapActions('notes', [
      'addNewNote',
    ]),
  },
})
export default class AppHeader extends Vue {
  title = 'Minimal Notes';

  addNewNote!: () => void;
}
</script>

<style lang="sass" scoped>
.app-header
  background-color: $primary
  min-height: 6em
  display: flex
  align-items: center
  color: $text
  font-family: system-ui, sans-serif
  padding: 1em

.title
  display: flex
  flex-grow: 1

.actions
  display: flex
  align-items: center

.action
  background-color: transparent
  border: 1px solid $border
  padding: 1rem
  color: $text
</style>
