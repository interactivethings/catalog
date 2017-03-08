#! /usr/bin/env node
let program = require('commander');
const chalk = require('chalk');

program
  .parse(process.argv);

console.log(`
${chalk.bgBlue.black(' TODO ')} ${chalk.blue('create a Catalog entry file (at ./catalog.js) 😅')}
`);
