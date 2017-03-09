#!/usr/bin/env node
// @flow
import 'babel-polyfill';
process.env.NODE_ENV = 'development';

// Load environment constiables from .env file. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment constiables
// that have already been set.
// https://github.com/motdotla/dotenv
require('dotenv').config({silent: true});

import args from 'args';
import detect from 'detect-port';

import loadConfig from '../actions/loadConfig';
import loadPaths from '../actions/loadPaths';

import setupCatalog from '../actions/setupCatalog';
import runDevServer from '../actions/runDevServer';

// Parse env

const PROTOCOL: string = process.env.HTTPS === 'true' ? 'https' : 'http';
const HOST: string = process.env.HOST || 'localhost';

args
  .option('port', 'Port on which the Catalog server runs', 4000, port => parseInt(port, 10));

const cliOptions = args.parse(process.argv, {value: '[catalog source]'});

const run = async (catalogSrcDir: void | string, options: {port: number}) => {
  const paths = loadPaths(catalogSrcDir, undefined, options);
  const config = loadConfig();

  await setupCatalog(paths);

  detect(options.port).then(port => {
    runDevServer(config, HOST, port, PROTOCOL);
  }).catch(err => {
    console.error(err);
  });
};

run(args.sub[0], cliOptions);
