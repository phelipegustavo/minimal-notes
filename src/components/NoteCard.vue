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
              class="sync"
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
import Resize, { Sizes } from '@/directives/resize';
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
    desktopSizes: Object,
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

  desktopSizes!: Sizes;

  updateNote!: (note: Types.Note) => Promise<Types.Note>;

  appBarHeight = 96;

  isSyncing = false;

  syncInterval?: number;

  deleteIcon = mdiTrashCan;

  syncIcon = mdiSync;

  get cardStyle(): CardStyle {
    const top = this.note.y * this.desktopSizes.height;
    const left = this.note.x * this.desktopSizes.width;
    return {
      borderColor: this.note.color,
      top: `calc(${top}px)`,
      left: `${left}px`,
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

  onDrag({ clientX, clientY }: DragEvent): void {
    const x = clientX;
    const y = clientY - this.appBarHeight;
    if (clientX > 0 && y > 0) {
      this.note.x = x / this.desktopSizes.width;
      this.note.y = y / this.desktopSizes.height;
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
      }, 500);
    } catch (e) {
      this.isSyncing = false;
    }
  }

  debounceNoteUpdate(): Promise<void> {
    return new Promise((resolve: Function) => {
      if (this.syncInterval) {
        clearTimeout(this.syncInterval);
      }
      this.syncInterval = setTimeout(() => resolve(), 1000);
    });
  }
}

</script>

<style lang="sass" scoped>
.sync
  display: inline-block
  animation: rotate infinite linear 1s

@keyframes rotate
  from
    transform: rotate(0deg)
  to
    transform: rotate(360deg)

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
