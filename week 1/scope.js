'use strict';

// This works when not in strict mode:
// bla = 3;
// console.log(bla);

let x = 3;
var y = 4;

console.log('x', x, 'y', y);

if (true) {
  var j = 'The value of the J variable!';
  let k = 'The value of the K variable!';

  console.log('Inside the IF block!', j, k);
}

console.log('Outside the IF block!', j);
// let has block scope, this will not work.
// console.log('Outside the IF block!', k);


for (var i = 0; i < 3; i++) {
  console.log('The value of I ', i);
}

console.log('After the loop: ', i);

