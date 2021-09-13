console.log('Hello world!');
console.log(process.argv);

if (process.argv.length >= 3) {
  console.log(`Hello ${process.argv[2]}`);
}