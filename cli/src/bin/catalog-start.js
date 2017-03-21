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
import clearConsole from 'react-dev-utils/clearConsole';
import openBrowser from 'react-dev-utils/openBrowser';

import {infoMessage, errorMessage} from '../utils/format';

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

const cliOptions = args.parse(process.argv, {value: '[source directory]'});

const run = async (catalogSrcDir: void | string, options: {port: number}) => {
  clearConsole();

  console.log(infoMessage('Starting Catalog …'));
  const framework = await detectFramework();
  const paths = await loadPaths(catalogSrcDir, undefined, framework);
  const port = await detect(options.port);

  const url = PROTOCOL + '://' + HOST + ':' + port + '/';

  const webpackConfig = await loadWebpackConfig({paths, dev: true, framework, url});

  await setupCatalog(paths);
  await runDevServer(webpackConfig, HOST, port, PROTOCOL, paths, framework);

  openBrowser(url);
};

run(args.sub[0], cliOptions)
.catch(err => {
  console.error(errorMessage('Could not start Catalog\n\n' + err.stack + '\n'));
  process.exit(1);
});
