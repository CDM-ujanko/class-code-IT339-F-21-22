import * as fs from 'fs';
import * as fsp from 'fs/promises'

const file = './package.json';

// Callback way!
// fs.stat(file, (err1, stats) => {
//   if (err1)
//     throw err1;
//
//   console.log(stats);
//   fs.readFile(file, (err2, buffer) => {
//     if (err2)
//       throw err2;
//
//     console.log(buffer.toString())
//   });
// })

// let s;
// Promises wayL
// fsp.stat(file)
//     .then(stat => {
//       console.log(stat);
//       s = stat;
//       return fsp.readFile(file)
//     })
//     .then(buffer => {
//       console.log(buffer.toString())
//     })
//     .catch(err => console.error(err));
//
// console.log('stat', s);

try {
  let stats = await fsp.stat(file);
  console.log(stats);
  let buffer = await fsp.readFile(file);
  console.log(buffer.toString());
} catch (e) {
  console.error(e);
}


