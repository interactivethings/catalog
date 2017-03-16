#!/usr/bin/env node
// @flow
import 'babel-polyfill';
process.env.NODE_ENV = 'production';

// Load environment constiables from .env file. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment constiables
// that have already been set.
// https://github.com/motdotla/dotenv
require('dotenv').config({silent: true});

import args from 'args';
import clearConsole from 'react-dev-utils/clearConsole';

import {infoMessage, errorMessage} from '../utils/format';

import loadWebpackConfig from '../actions/loadWebpackConfig';
import detectFramework from '../actions/detectFramework';
import loadPaths from '../actions/loadPaths';

import setupCatalog from '../actions/setupCatalog';
import runBuild from '../actions/runBuild';


const cliOptions = args.parse(process.argv, {value: '[catalog build directory]'});

const run = async (catalogBuildDir: void | string, options: {port: number}) => {
  clearConsole();

  const paths = await loadPaths(undefined, catalogBuildDir);
  const framework = await detectFramework(paths);
  const webpackConfig = await loadWebpackConfig({paths, dev: false, framework});

  await setupCatalog(paths);

  console.log(infoMessage('Building Catalog into ' + paths.catalogBuildDir));
  await runBuild(webpackConfig, paths);
};

run(args.sub[0], cliOptions)
.catch(err => {
  console.error(errorMessage('Failed to compile Catalog\n\n' + err.stack + '\n'));
  process.exit(1);
});
