import express from 'express'
// import {InMemoryNotesStore} from '../models/notes-memory.mjs';
// import {SQLiteNotesStore} from '../models/notes-sqlite.mjs';
import {MongoDBNotesStore} from '../models/notes-mongodb.mjs';
import {authenticate} from './users.mjs';

const router = express.Router();
let notes = new MongoDBNotesStore();

/* GET home page. */
router.get('/', async (req, resp, next) => {
  try {
    let keys = await notes.keyList();

    resp.render('notes', {
      title: 'My Notes',
      notes: await Promise.all(keys.map(key => notes.read(key)))
    });
  } catch (e) {
    next(e);
  }
});

router.get('/add', authenticate, async (req, resp, next) => {
  try {
    if (req.query.key && req.query.title && req.query.body) {
      await notes.create(req.query.key, req.query.title, req.query.body);
      resp.redirect('/notes');
    } else {
      resp.render('edit-note', {
        title: 'Create Note'
      });
    }
  } catch (e) {
    next(e);
  }
});

router.get('/edit/:key', authenticate, async (req, resp, next) => {
  try {
    let note = await notes.read(req.params.key);

    if (!note) {
      next(new Error(`No such key ${req.params.key}`));
      return;
    }

    if (req.query.title && req.query.body) {
      await notes.update(note.key, req.query.title, req.query.body);
      resp.redirect('/notes');
    } else {
      resp.render('edit-note', {
        title: 'Edit Note',
        note: note,
        edit: true
      });
    }
  } catch (e) {
    next(e);
  }
});

router.get('/delete/:key', async (req, resp, next) => {
  try {
    let note = await notes.read(req.params.key);

    if (!note) {
      next(new Error(`No such key ${req.params.key}`));
      return;
    }

    await notes.destroy(note.key);
    resp.redirect('/notes');
  } catch (e) {
    next(e);
  }
});

export default router;
