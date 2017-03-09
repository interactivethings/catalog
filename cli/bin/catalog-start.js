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

import loadWebpackConfig from '../actions/loadWebpackConfig';
import detectFramework from '../actions/detectFramework';
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
  const paths = await loadPaths(catalogSrcDir, undefined, options);
  const framework = await detectFramework(paths);
  const webpackConfig = await loadWebpackConfig({paths, dev: true, framework});

  await setupCatalog(paths);

  detect(options.port).then(port => {
    runDevServer(webpackConfig, HOST, port, PROTOCOL, paths, framework);
  }).catch(err => {
    console.error(err);
  });
};

run(args.sub[0], cliOptions);
