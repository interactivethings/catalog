#!/usr/bin/env node
// @flow
import 'babel-polyfill';
process.env.NODE_ENV = 'development';

import args from 'args';
import detect from 'detect-port';
import {exists} from 'sander';
import clearConsole from 'react-dev-utils/clearConsole';
import openBrowser from 'react-dev-utils/openBrowser';

import {infoMessage, infoMessageDimmed, errorMessage} from '../utils/format';

import loadWebpackConfig from '../actions/loadWebpackConfig';
import detectFramework from '../actions/detectFramework';
import loadPaths from '../actions/loadPaths';

import setupCatalog from '../actions/setupCatalog';
import runDevServer from '../actions/runDevServer';

import type {Framework} from '../actions/detectFramework';

// Parse env

args
  .option('port', 'Port on which the Catalog server runs', 4000, port => parseInt(port, 10))
  .option('https', 'Use https', false)
  .option('host', 'Host', 'localhost')
  .option('proxy', 'Proxy');

const cliOptions = args.parse(process.argv, {value: '[source directory]'});

const getFrameworkName = (framework: Framework): string => {
  switch (framework) {
  case 'CREATE_REACT_APP':
    return 'Create React App';
  case 'NEXT':
    return 'next.js';
  case 'UNKNOWN':
  default:
    return '';
  }
};

const run = async (catalogSrcDir: void | string, options: {port: number, https: boolean, host: string, proxy: void | string}) => {
  clearConsole();

  console.log(infoMessage('Starting Catalog …'));
  const framework = await detectFramework();
  if (framework !== 'UNKNOWN') {
    console.log(infoMessageDimmed('Detected ' + getFrameworkName(framework)));
  }
  const paths = await loadPaths(catalogSrcDir, undefined, framework, '/');
  if (await exists(paths.babelrc)) {
    console.log(infoMessageDimmed('Using custom .babelrc'));
  }
  const port = await detect(options.port);

  const url = (options.https ? 'https' : 'http') + '://' + options.host + ':' + port + '/';

  const webpackConfig = await loadWebpackConfig({paths, dev: true, framework, url});

  await setupCatalog(paths);
  await runDevServer(webpackConfig, options.host, port, options.https, paths, framework, options.proxy);

  openBrowser(url);
};

run(args.sub[0], cliOptions)
.catch(err => {
  console.error(errorMessage('Could not start Catalog\n\n' + err.stack + '\n'));
  process.exit(1);
});
