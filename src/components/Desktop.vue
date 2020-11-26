<template>
  <div
    class="desk"
    :style="{ 'background-image': `url(${backgroundImage})` }"
  >
    <NoteCard
      v-for="note in allNotes"
      :key="note.id"
      :note="note"
    ></NoteCard>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { mapActions, mapGetters } from 'vuex';
import { Note } from '@/types/types.d';
import NoteCard from './NoteCard.vue';

@Options({
  components: {
    NoteCard,
  },
  computed: {
    ...mapGetters('notes', [
      'allNotes',
    ]),
    ...mapActions('notes', [
      'listNotes',
    ]),
  },
  async mounted() {
    await this.listNotes;
  },
})
export default class Desktop extends Vue {
  backgroundImage = 'https://picsum.photos/1280/720'

  allNotes!: () => Array<Note>;

  listNotes!: Function;
}
</script>

<style lang="sass" scoped>
.desk
  flex-grow: 1
  width: 100%
  background-color: $background
  background-repeat: no-repeat
  background-position: center
  background-size: cover
  position: relative
</style>
