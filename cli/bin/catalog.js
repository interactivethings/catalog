#!/usr/bin/env node
const program = require('commander');

program
  .version(require('../../package.json').version)
  .command('start [args...]', 'Starts the Catalog server')
  .command('build [args...]', 'Builds a Catalog static site');

program.parse(process.argv);
