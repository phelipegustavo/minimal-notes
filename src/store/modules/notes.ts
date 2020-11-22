interface Context {
  commit: Function;
}

interface NotesSate {
  notes: Array<Types.Note>;
}

const state = (): NotesSate => ({
  notes: Array<Types.Note>(),
});

const actions = {
  addNewNote: ({ commit }: Context) => {
    const colors = ['#00c853', '#2962ff', '#263238', '#4a148c', '#ff1744'];
    const randomIndex = Math.ceil(Math.random() * 4);
    const note: Types.Note = {
      id: (new Date()).getTime(),
      color: colors[randomIndex],
      title: 'Note',
      content: '',
      x: 10,
      y: 100,
    };
    commit('pushNote', note);
  },
};

const mutations = {
  pushNote({ notes }: NotesSate, payload: Types.Note): void {
    notes.push(payload);
  },
};

const getters = {
  allNotes({ notes }: NotesSate): Array<Types.Note> {
    return notes;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
