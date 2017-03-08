#!/usr/bin/env node
const program = require('commander');

program
  .version(require('../../package.json').version)
  .command('init', 'Add Catalog to your project')
  .command('start [entry]', 'Starts the Catalog server')
  .command('build', 'Builds a Catalog static site');

program.parse(process.argv);
