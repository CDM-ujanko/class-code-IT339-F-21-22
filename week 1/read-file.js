#!/usr/bin/env node
'use strict';

const fs = require('fs');

if (process.argv.length < 3) {
  console.error(`Missing the file argument!`);
  return;
}

let path = process.argv[2];
// Blocking way of doing things:
// console.log(`Reading the file ${path}`);
// let file = fs.readFileSync(path);
//
// console.log('Read the file', file.toString());

// NON Blocking way of doing things:
console.log(`Reading the file ${path}`);
// fs.readFile(path, (err, resp) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//
//   let content =  resp.toString();
//
//   fs.readFile(content, (err, resp) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//
//     console.log(`Read the SECOND file with the content\n${resp.toString()}`);
//   });
//
//   console.log(`Read the file with the content\n${content}`);
// });
//

fs.promises.readFile(path)
    .then((resp) => {
      let content =  resp.toString();
      console.log(`Read the file with the content\n${content}`);
    })
    .catch((err) => {
      console.error(err);
    })

console.log('Right after the readFile function call!');


