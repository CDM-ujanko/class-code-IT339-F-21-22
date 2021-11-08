let arr = [2, 4, 8];

console.log('My arr', arr);

 function square(item) {
   return item * item;
 }

// let afterMap = arr.map((item) => item * item);
let afterMap = arr.map(square);

console.log('Initial array', arr);
console.log('After map', afterMap);
console.log('------');

let afterFilter = arr.filter(item => true);

console.log('Initial array', arr);
console.log('After filter', afterFilter);
afterFilter.pop();

console.log('After pop Initial array', arr);
console.log('After pop  After filter', afterFilter);

console.log('------');


let sum = arr.reduce((acc, cur) => acc + cur, '')

console.log('Initial array', arr);
console.log('After reduce', sum);