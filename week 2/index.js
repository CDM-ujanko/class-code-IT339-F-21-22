const { program } = require('commander');
const fs = require('fs');

program
   .option('-h, --help', 'help text');

program
    .command('read <file>')
    .description('Read a csv file.')
    .action((file) => {
      console.log('the file is ', file);
      fs.readFile(file, (err, data) => {
        if (err) {
          console.error(err);
          return;
        }

        let rows = data.toString().split('\n');

        let col = [];

        rows.forEach((row) => {
          col.push(row.split(',').map(item => item.trim()));
        })

        console.log(col.length, col);
      })
    });

program.parse(process.argv);