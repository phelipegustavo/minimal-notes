interface StorageService {
  getData: Function;
  setData: Function;
  clearData: Function;
}

const StorageService = (key: string): StorageService => {
  function getData() {
    const data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    }
    return false;
  }

  function setData(data: object|Array<object>) {
    try {
      const stringData = JSON.stringify(data);
      localStorage.setItem(key, stringData);
      return true;
    } catch (e) {
      return false;
    }
  }

  function clearData(): boolean {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      return false;
    }
  }

  return {
    getData,
    setData,
    clearData,
  };
};

const storage = StorageService('note');

function findNote(id: number) {
  try {
    const data = storage.getData();
    return data && data
      .find(({ id: noteId }: Types.Note) => (
        noteId === id
      ));
  } catch (e) {
    return false;
  }
}

export function store(note: Types.Note): boolean {
  if (!findNote(note.id)) {
    const data = storage.getData();
    const notes = Array.isArray(data) ? data : [];
    return storage.setData([...notes, note]);
  }
  return false;
}

export function update(note: Types.Note): boolean {
  const data = storage.getData();
  const notes = Array.isArray(data) ? data : [];
  const updatedNotes = notes
    .map((noteItem: Types.Note) => (
      noteItem.id === note.id ? note : noteItem
    ));
  storage.setData(updatedNotes);
  if (!findNote(note.id)) {
    return store(note);
  }
  return true;
}

export function get(id: number) {
  return findNote(id);
}

export function list() {
  const data = storage.getData();
  const notes = Array.isArray(data) ? data : [];
  return notes;
}

export function remove(id: number) {
  const notes = storage.getData()
    .filter((noteItem: Types.Note) => (
      noteItem.id !== id
    ));
  storage.setData(notes);
}

export default {
  list,
  get,
  update,
  store,
  remove,
};
