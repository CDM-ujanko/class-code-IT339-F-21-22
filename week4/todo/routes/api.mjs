import express from 'express';
import data from '../data.mjs';

const router = express.Router();

router.get('/hello', (req, resp) => {
  resp.json({message: 'hello'});
})

router.get('/student/:id', (req, resp) => {
  resp.json(data[req.params.id]);
})

export default router;