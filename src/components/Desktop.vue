<template>
  <div
    class="desk"
    :style="{ 'background-image': `url(${backgroundImage})` }"
  >
    <transition-group name="note-card">
      <NoteCard
        v-for="note in allNotes"
        :key="note.id"
        :note="note"
      ></NoteCard>
    </transition-group>
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

.note-card-leave-active
  transition: all .3s cubic-bezier(0.37,-0.38, 0.54, 1.26)

.note-card-enter-active
  transition: all .3s ease-out

.note-card-enter-from,
.note-card-leave-to
  opacity: 0
  transform: scale(.1)
</style>
