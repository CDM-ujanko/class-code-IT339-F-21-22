import express from 'express';

const PORT = 4000;

let app = express();

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.get('/', (req, resp) => {
  resp.json({message: 'hello world!'});
})