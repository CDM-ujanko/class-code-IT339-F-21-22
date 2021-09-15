'use strict';

let globalVar = 1223;

console.log(this);

let that = this;
// This in a regular function get resigned.
function myFunction(x) {
  console.log(this, that, x);
}

myFunction(3);

// In an arrow function it stays the same.
let arrowFunction = (x) => {
  console.log(this, x);
}

arrowFunction(3);