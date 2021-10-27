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
    await new Promise((resolve, reject) => {
      db.run(`INSERT INTO notes VALUES( ?, ?, ?) `, [key, title, body], (err, row) => {
        if (err) {
          return reject(err);
        }

        return resolve(row);
      });
    })

    return new Note(key, title, body);
  }

  async update (key, title, body) {
    await new Promise((resolve, reject) => {
      db.run(`UPDATE notes SET title = ?, body = ? WHERE key = ?`, [title, body, key], (err, row) => {
        if (err) {
          return reject(err);
        }

        return resolve(row);
      })
    });

    return new Note(key, title, body);
  }

  async read (key) {
    let data = await new Promise((resolve, reject) => {
      db.get(`SELECT * FROM notes WHERE key = ?`, key, (err, row) => {
        if (err) {
          return reject(err);
        }

        return resolve(row);
      })
    });

    // We are making an new instance of note Class based on the data.
    // console.log('Data after query!', data.JSON);
    // let note = new Note(data.key, data.title, data.body);
    // console.log('NOTE after query!', note.JSON);
    return new Note(data.key, data.title, data.body);
  }

  async destroy (key) {
    return await new Promise((resolve, reject) => {
      db.run(`DELETE FROM notes WHERE key = ?`, key, (err, rep) => {
        if (err) {
          return reject(err);
        }

        return resolve(rep);
      })
    })
  }

  async keyList() {
    return await new Promise((resolve, reject) => {
      db.all(`SELECT key FROM notes`, (err, rows) => {
        if (err) {
          return reject(err);
        }

        // console.log('The rows in keyList', rows)
        return resolve(rows.map(row => row.key));
      })
    });
  }

  async count() {
    return await new Promise((resolve, reject) => {
      db.query(`SELECT count(key) FROM notes`, (err, count) => {
        if (err) {
          return reject(err);
        }

        return resolve(count);
      })
    });
  }
}

export {SQLiteNotesStore}