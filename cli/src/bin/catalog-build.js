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

import {infoMessage, errorMessage, successMessage} from '../utils/format';

import loadWebpackConfig from '../actions/loadWebpackConfig';
import detectFramework from '../actions/detectFramework';
import loadPaths from '../actions/loadPaths';

import setupCatalog from '../actions/setupCatalog';
import runBuild from '../actions/runBuild';

args
  .option(['o', 'out'], 'Directory to build into', 'catalog/build');

const cliOptions = args.parse(process.argv, {value: '[source directory]'});

const run = async (catalogSrcDir: void | string, {out}: {out: string}) => {
  clearConsole();

  const framework = await detectFramework();
  const paths = await loadPaths(catalogSrcDir, out, framework);

  const webpackConfig = await loadWebpackConfig({paths, dev: false, framework});

  await setupCatalog(paths);

  console.log(infoMessage('Building Catalog. This may take a while …'));
  await runBuild(webpackConfig, paths);
  console.log(successMessage('Built Catalog into ' + paths.unresolvedCatalogBuildDir));
};

run(args.sub[0], cliOptions)
.catch(err => {
  console.error(errorMessage('Failed to compile Catalog\n\n' + err.stack + '\n'));
  process.exit(1);
});
