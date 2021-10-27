import {Note, AbstractNotesStore} from './Notes.mjs';

let notes = {};

class InMemoryNotesStore extends AbstractNotesStore {
  async create (key, title, body) {
    notes[key] = new Note(key, title, body);
    return notes[key];
  }

  async update (key, title, body) {
    if (notes.hasOwnProperty(key)) {
      notes[key] = new Note(key, title, body);
    } else {
      throw new Error(`No such key: ${key}`);
    }
  }

  async read (key) {
    return notes[key];
  }

  async destroy (key) {
    if (notes.hasOwnProperty(key)) {
      delete notes[key];
    } else {
      throw new Error(`No such key: ${key}`);
    }
  }

  async keyList() {
    return Object.keys(notes);
  }

  async count() {
    return Object.keys(notes).length;
  }
}

export {InMemoryNotesStore}