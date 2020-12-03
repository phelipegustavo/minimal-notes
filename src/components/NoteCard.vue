<template>
  <div
    tabindex="0"
    class="note-card"
    :style="cardStyle"
    v-resize
    @resize="onResize"
  >
    <div
      class="note-bar"
      :style="barStyle"
      draggable="true"
      @dragstart="onDragStart"
      @drag="onDrag"
    >
      <span>{{ note.title }}</span>
      <div class="actions">
        <transition name="sync">
          <span v-if="isSyncing">
            <IconBase
              style="color: #fff"
              :size="18"
              :path="syncIcon"
            ></IconBase>
          </span>
        </transition>
        <button
          class="btn-remove"
          @click="removeNote(note)"
        >
          <IconBase
            style="color: #fff"
            :size="18"
            :path="deleteIcon"
          ></IconBase>
        </button>
      </div>
    </div>
    <div class="note-content">
      <NoteEditor
        v-model.lazy="note.content"
        :editor-style="editorStyle"
      ></NoteEditor>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { mdiTrashCan, mdiSync } from '@mdi/js';
import { mapActions } from 'vuex';
import { Note } from '@/types/types.d';
import { CardStyle, BarStyle, EditorStyle } from '@/types/styles.d';
import Resize from '@/directives/resize';
import IconBase from '@/components/base/IconBase.vue';
import NoteEditor from './NoteEditor.vue';

@Options({
  components: {
    IconBase,
    NoteEditor,
  },
  directives: {
    Resize,
  },
  props: {
    note: Object,
  },
  methods: {
    ...mapActions('notes', [
      'updateNote',
      'removeNote',
    ]),
  },
  watch: {
    note: {
      deep: true,
      handler(note: Note) {
        this.handleNote(note);
      },
    },
  },
})
export default class NoteCard extends Vue {
  note!: Types.Note;

  updateNote!: (note: Types.Note) => Promise<Types.Note>;

  appBarHeight = 96;

  isSyncing = false;

  syncInterval?: number;

  deleteIcon = mdiTrashCan;

  syncIcon = mdiSync;

  get cardStyle(): CardStyle {
    return {
      borderColor: this.note.color,
      top: `calc(${this.note.y}px - 6em)`,
      left: `${this.note.x}px`,
      width: `${this.note.width}px`,
      height: `${this.note.height}px`,
    };
  }

  get barStyle(): BarStyle {
    return {
      backgroundColor: this.note.color,
    };
  }

  get editorStyle(): EditorStyle {
    return {
      borderColor: this.note.color,
    };
  }

  onDrag(e: DragEvent): void {
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

  onResize({ detail }: CustomEvent): void {
    this.note.height = detail.height;
    this.note.width = detail.width;
  }

  async handleNote(note: Types.Note) {
    try {
      await this.debounceNoteUpdate();
      this.isSyncing = true;
      setTimeout(async () => {
        await this.updateNote(note);
        this.isSyncing = false;
      }, 1000);
    } catch (e) {
      this.isSyncing = false;
    }
  }

  debounceNoteUpdate(): Promise<void> {
    return new Promise((resolve: Function) => {
      if (this.syncInterval) {
        clearTimeout(this.syncInterval);
      }
      this.syncInterval = setTimeout(() => resolve(), 1500);
    });
  }
}

</script>

<style lang="sass" scoped>
.sync-enter-active,
.sync-leave-active
  transition: opacity .5s ease

.sync-enter-from,
.sync-leave-to
  opacity: 0

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
  display: flex
  justify-content: space-between
  background-color: $primary
  padding: .5rem
  color: $text
  cursor: move

.note-content
  display: flex
  position: relative
  flex-grow: 1

.btn-remove
  border: none
  background-color: transparent
  color: $text
  padding: .2rem
  margin: 0 3px
</style>
