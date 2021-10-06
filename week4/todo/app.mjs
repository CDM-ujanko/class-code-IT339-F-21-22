import express from 'express';
import * as path from 'path';
import apiRouter from './routes/api.mjs';

const __dirname = path.resolve();
const PORT = 4000;

const app = express();

// console.log(__dirname, path.join(__dirname, 'views'), './views')
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

function myMiddlewareFunction(req, resp, next) {
  console.log('second middleware function!!!!');
  next();
}

app.use((req, resp, next) => {
  console.log('Logged!');
  req.myAwesomeVariable = req.path;
  next();
});

app.use(myMiddlewareFunction);

app.get('/', (req, resp) => {
  console.log('the / got hit!');
  console.log('myAwesomeVariable', req.myAwesomeVariable);
  resp.send('hello world!');
});

app.get('/hello', (req, resp) => {
  // console.log('the /hello got hit!');
  // console.log('myAwesomeVariable', req.myAwesomeVariable);
  resp.render('hello', {title: 'Hello'});
});

app.get('/todo/:name', (req, resp) => {
  console.log(req.query, req.params.name);
  resp.render('todo', {
    title: req.params.name.split('-').join(' '),
    items: typeof req.query.item === 'string' ? [req.query.item] : req.query.item
  });
});

app.use('/api', apiRouter);