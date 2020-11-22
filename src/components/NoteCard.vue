<template>
  <div
    tabindex="0"
    class="note-card"
    :style="cardStyle"
  >
    <div
      class="note-bar"
      :style="barStyle"
      draggable="true"
      @dragstart="onDragStart"
      @drag="onDrag"
    >
      {{ note.title }}
    </div>
    <div class="note-content">
      <textarea
        class="note-editor"
        name="note"
        placeholder="Type your note..."
        v-model="note.content"
        :style="editorStyle"
      ></textarea>
    </div>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue';
import { Options, Vue } from 'vue-class-component';

interface CardStyle {
  borderColor: string;
  top: string;
  left: string;
}

@Options({
  props: {
    note: Object,
  },
})
export default class NoteCard extends Vue {
  note!: Types.Note;

  appBarHeight = 96;

  noteColor = computed((): string => this.note.color);

  postionTop = computed((): string => `calc(${this.note.y}px - 6em)`);

  postionLeft = computed((): string => `${this.note.x}px`);

  cardStyle = computed(() => ({
    borderColor: this.noteColor,
    top: this.postionTop,
    left: this.postionLeft,
  }));

  barStyle = computed(() => ({
    backgroundColor: this.noteColor,
  }));

  editorStyle = computed(() => ({
    borderColor: this.noteColor,
  }));

  onDrag = (e: DragEvent): void => {
    const { clientX, clientY } = e;
    if (clientX && clientY && clientY > this.appBarHeight) {
      this.note.x = clientX;
      this.note.y = clientY;
    }
  }

  onDragStart = (e: DragEvent): void => {
    if (e.dataTransfer) {
      const img = document.createElement('img');
      e.dataTransfer.setDragImage(img, 0, 0);
    }
  }
}

</script>

<style lang="sass" scoped>
.note-card
  background-color: $background
  min-width: 300px
  min-height: 200px
  height: 300px
  width: 400px
  position: absolute
  display: flex
  flex-direction: column
  resize: both
  overflow: auto

.note-card:focus,
.note-card:focus-within
  z-index: 10
  box-shadow: 5px 15px 30px rgba(0, 0, 0, .1)

.note-bar
  background-color: $primary
  padding: .5rem
  color: $text
  transform: blur(10px)
  cursor: move

.note-content
  display: flex
  position: relative
  flex-grow: 1

.note-editor
  background-color: $background
  color: $text-darken
  padding: 1rem
  resize: none
  width: 100%
  height: 100%
  border: 1px
  border-style: solid
</style>
