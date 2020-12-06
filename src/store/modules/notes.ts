import {
  update,
  list,
  remove,
  store,
} from '../../api/note';

interface Context {
  commit: Function;
}

interface NotesSate {
  notes: Array<Types.Note>;
}

const noteState = (): NotesSate => ({
  notes: Array<Types.Note>(),
});

const actions = {
  listNotes: async ({ commit }: Context) => {
    try {
      const notes = await list();
      commit('setNotes', notes);
    } catch (e) {
      commit('setNotes', []);
    }
  },
  addNewNote: ({ commit }: Context) => {
    const colors = ['#00c853', '#2962ff', '#263238', '#4a148c', '#ff1744'];
    const randomIndex = Math.ceil(Math.random() * 4);
    const note: Types.Note = {
      id: (new Date()).getTime(),
      color: colors[randomIndex],
      title: 'Note',
      content: '',
      x: 0.1,
      y: 0.1,
      height: 300,
      width: 400,
    };
    store(note);
    commit('pushNote', note);
  },
  updateNote: (context: Context, payload: Types.Note): Promise<object|string> => (
    update(payload)
  ),
  removeNote: async ({ commit }: Context, payload: Types.Note) => {
    await remove(payload.id);
    commit('deleteNote', payload);
  },
};

const mutations = {
  pushNote({ notes }: NotesSate, payload: Types.Note): void {
    notes.push(payload);
  },
  deleteNote(state: NotesSate, payload: Types.Note): void {
    state.notes = state.notes.filter((noteItem: Types.Note) => (
      noteItem.id !== payload.id
    ));
  },
  setNotes(state: NotesSate, payload: Array<Types.Note>): void {
    state.notes = payload;
  },
};

const getters = {
  allNotes({ notes }: NotesSate): Array<Types.Note> {
    return notes;
  },
};

export default {
  namespaced: true,
  state: noteState,
  actions,
  mutations,
  getters,
};
