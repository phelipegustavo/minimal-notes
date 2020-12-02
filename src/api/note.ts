import StorageService from '../services/Storage';

const storage = new StorageService('note');

async function findNote(id: number): Promise<object|string> {
  const data = await storage.getData();
  const notes = Array.isArray(data) ? data : [];
  return notes && notes
    .find(({ id: noteId }: Types.Note) => (
      noteId === id
    ));
}

export async function store(note: Types.Note): Promise<object|string> {
  if (await findNote(note.id)) {
    return Promise.reject(new Error('This note already exists'));
  }
  const data = await storage.getData();
  const notes = Array.isArray(data) ? data : [];
  return storage.setData([...notes, note]);
}

export async function update(note: Types.Note): Promise<object|string> {
  const data = await storage.getData();
  const notes = Array.isArray(data) ? data : [];
  const updatedNotes = notes
    .map((noteItem: Types.Note) => (
      noteItem.id === note.id ? note : noteItem
    ));
  return storage.setData(updatedNotes);
}

export function get(id: number): Promise<object|string> {
  return findNote(id);
}

export async function list(): Promise<object> {
  const data = await storage.getData();
  const notes = Array.isArray(data) ? data : [];
  return notes;
}

export async function remove(id: number): Promise<object|string> {
  const data = await storage.getData();
  const notes = Array.isArray(data) ? data : [];
  const filterNotes = notes
    .filter((noteItem: Types.Note) => (
      noteItem.id !== id
    ));
  return storage.setData(filterNotes);
}

export default {
  list,
  get,
  update,
  store,
  remove,
};
