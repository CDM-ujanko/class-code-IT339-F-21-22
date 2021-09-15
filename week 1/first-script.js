console.log('Hello world!');
console.log(process.argv);

if (process.argv.length >= 3) {
  console.log(`Hello ${process.argv[2]}`);
}

let x = 3;
console.log(typeof x, typeof undefined, typeof [], typeof {});