<template>
  <textarea
    class="note-editor"
    name="note"
    placeholder="Type your note..."
    v-model="content"
    :style="editorStyle"
  ></textarea>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { EditorStyle } from '@/types/styles.d';
import { useModelWrapper } from '../utils/modelWrapper';

@Options({
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    editorStyle: {
      type: Object,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  setup: ((props, { emit }) => ({
    content: useModelWrapper(props, emit),
  })),
})
export default class NoteEditor extends Vue {
  modelValue!: string

  editorStyle!: EditorStyle

  get content(): string {
    return this.modelValue;
  }

  set content(value) {
    this.$emit('update:modelValue', value);
  }
}
</script>
<style lang="sass" scoped>
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
