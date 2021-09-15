#!/usr/bin/env node
'use strict';

const fs = require('fs');

if (process.argv.length < 3) {
  console.error(`Missing the file argument!`);
  return;
}

let path = process.argv[2];

fs.watchFile(path, (curr, prev) => {
  console.log(`The file changed!`);
});
