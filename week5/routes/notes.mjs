import express from 'express'
import {InMemoryNotesStore} from '../models/notes-memory.mjs';

const router = express.Router();
let notes = new InMemoryNotesStore();

/* GET home page. */
router.get('/', async(req, resp, next) => {
  resp.render('notes', {
    title: 'Notes',
    noteKeys: await notes.keyList()
  });
});

router.get('/add', (req, resp, next) => {
  if (req.query.key && req.query.title && req.query.body) {
    notes.create(req.query.key, req.query.title, req.query.body);
    resp.redirect('/notes');
  } else {
    resp.render('edit-note', {
      title: 'Create Note'
    });
  }
});

export default router;
