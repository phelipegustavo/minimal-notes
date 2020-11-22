import { createStore } from 'vuex';
import notes from './modules/notes';

export default createStore({
  modules: {
    notes,
  },
});
