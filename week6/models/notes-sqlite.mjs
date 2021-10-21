import {Note, AbstractNotesStore} from './Notes.mjs';
import sqlite3 from 'sqlite3';

let db = await new sqlite3.Database('./data/notes.sqlite3', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE);
let notes = {};

db.run(`CREATE TABLE IF NOT EXISTS notes (
    key VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    body VARCHAR(1000) NOT NULL
)`);

class SQLiteNotesStore extends AbstractNotesStore {
  async create (key, title, body) {
    let note = new Note(key, title, body);
    notes[key] = note;
    db.run(`INSERT INTO notes VALUES( ?, ?, ?) `, [key, title, body]);
    return note;
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

export {SQLiteNotesStore}