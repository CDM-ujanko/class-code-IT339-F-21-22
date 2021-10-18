import express from 'express'
// import {InMemoryNotesStore} from '../models/notes-memory.mjs';
import {FSNotesStore} from '../models/notes-fs.mjs';

const router = express.Router();
let notes = new FSNotesStore();

/* GET home page. */
router.get('/', async(req, resp, next) => {
  resp.render('notes', {
    title: 'My Notes',
    noteKeys: await notes.keyList()
  });
});

router.get('/add', async (req, resp, next) => {
  if (req.query.key && req.query.title && req.query.body) {
    await notes.create(req.query.key, req.query.title, req.query.body);
    resp.redirect('/notes');
  } else {
    resp.render('edit-note', {
      title: 'Create Note'
    });
  }
});

router.get('/edit/:key', async (req, resp, next) => {
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
});

router.get('/delete/:key', async (req, resp, next) => {
  let note = await notes.read(req.params.key);

  if (!note) {
    next(new Error(`No such key ${req.params.key}`));
    return;
  }

  await notes.destroy(note.key);
  resp.redirect('/notes');
});

export default router;
