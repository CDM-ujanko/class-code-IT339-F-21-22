import {Note, AbstractNotesStore} from './Notes.mjs';
import * as fs from 'fs/promises';

const notesFile = `./data/notes-fs.json`;

let notes = {};

try {
  // the short one line way of doing it:
  // notes = JSON.parse((await fs.readFile(notesFile)).toString());
  let buff = await fs.readFile(notesFile);
  let data = JSON.parse(buff.toString());


  Object.keys(data).forEach((key) => {
    let noteData = JSON.parse(data[key]);

    console.log('noteData', noteData);

    if (typeof noteData !== 'object' ||
        !noteData.hasOwnProperty('key') ||
        !noteData.hasOwnProperty('title') ||
        !noteData.hasOwnProperty('body') ||
        typeof noteData.key !== 'string' ||
        typeof noteData.title !== 'string' ||
        typeof noteData.body !== 'string') {
      throw new Error(`Not a valid note: ${data[key]}`);
    }

    notes[key] = new Note(noteData.key, noteData.title, noteData.body);
  })

  console.log('Notes after reading file!', notes);
} catch (e) {
  console.error(e)
}

class FSNotesStore extends AbstractNotesStore {
  async create (key, title, body) {
    notes[key] = new Note(key, title, body);
    await saveNotesFile(notes);
    return notes[key];
  }

  async update (key, title, body) {
    if (notes.hasOwnProperty(key)) {
      notes[key] = new Note(key, title, body);
      await saveNotesFile(notes);
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
      await saveNotesFile(notes);
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

function  saveNotesFile(data) {
  return fs.writeFile(notesFile, JSON.stringify(data, null, 2));
}

export {FSNotesStore}