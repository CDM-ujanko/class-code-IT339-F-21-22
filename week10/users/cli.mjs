#!/usr/bin/env node
import {Command} from 'commander';
import axios from 'axios';


const program = new Command();
program.version('0.0.1');

program
    .command('hello <name>')
    .description('Says hello to a person with a name!')
    .option('-l, --last-name <lastName>', 'The users last name')
    .action((name, cmd) => {
      console.log(cmd);
      if (cmd.lastName) {
        name += ` ${cmd.lastName}`;
      }
      console.log(`Hello ${name}`);
    })

program
    .command('check <username> <password>')
    .description('Check the users username and password from the user service')
    .action((username, password, cmd) => {
      console.log(cmd, username, password);
      axios.post('http://localhost:4000/user/check/' + username, {
        username: username,
        password: password
      }, {
        auth: {
          username: 'admin',
          password: 'D4ED43C0-8BD6-4FE2-B358-7C0E230D11EF'
        },
      })
          .then(function (response) {
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
    })


program.parse(process.argv);
