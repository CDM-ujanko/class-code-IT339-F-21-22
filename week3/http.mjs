import * as http from 'http';
import * as fs from 'fs';

const PORT = 4000;
const HOST = 'localhost';

const server = http.createServer();

let hello = fs.readFileSync('./assets/hello.html').toString();

let parseTemplate = (html, data) => {
  return html.replace(/{{\s?(\w+)\s?}}/gmi, (match, key) => {
    return data.hasOwnProperty(key) ? data[key] : '';
  })
}

server.on('request', (req, resp) => {
  let requrl = new URL(req.url, `http://${HOST}:${PORT}`)
  console.log(req.url, requrl.pathname);

  if (requrl.pathname === '/') {
    resp.writeHead(200, 'Content Type: application/json');
    resp.end(JSON.stringify(req.headers));
  } else if (requrl.pathname === '/hello') {
    resp.writeHead(200, 'Content Type: text/html');
    let data = Object.fromEntries(new URLSearchParams(requrl.search));

    resp.end(parseTemplate(hello, data));

  } else if (requrl.pathname === '/favicon.ico') {
    let path = './assets/favicon.ico',
        stat = fs.statSync(path);

    resp.writeHead(200, {
      'Content-Type': 'image/x-icon',
      'Content-length': stat.size
    });

    let readStream = fs.createReadStream(path);
    readStream.pipe(resp);
  } else {
    resp.writeHead(404, 'Content Type: text/plan');
    resp.end(`No such path ${req.url}`);
  }
});

server.listen(PORT, HOST);
console.log(`Server listening for connection on http://${HOST}:${PORT}`);