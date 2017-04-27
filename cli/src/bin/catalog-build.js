#!/usr/bin/env node
// @flow
import 'babel-polyfill';
process.env.NODE_ENV = 'production';

import args from 'args';

import {infoMessage, errorMessage, successMessage} from '../utils/format';

import loadWebpackConfig from '../actions/loadWebpackConfig';
import detectFramework from '../actions/detectFramework';
import loadPaths from '../actions/loadPaths';

import setupCatalog from '../actions/setupCatalog';
import runBuild from '../actions/runBuild';

args
  .option(['o', 'out'], 'Directory to build into', 'catalog/build')
  .option('public-path', 'The path/URL where production assets get loaded from', '/');

const cliOptions = args.parse(process.argv, {value: '[source directory]'});

const run = async (catalogSrcDir: void | string, {out, publicPath}: {out: string, publicPath: string}) => {
  const framework = await detectFramework();
  const paths = await loadPaths(catalogSrcDir, out, framework);

  const webpackConfig = await loadWebpackConfig({paths, dev: false, framework, publicPath});

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
