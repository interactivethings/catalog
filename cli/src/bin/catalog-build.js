#!/usr/bin/env node
// @flow
import 'babel-polyfill';
process.env.NODE_ENV = 'production';

import args from 'args';
import chalk from 'chalk';

import {infoMessage, errorMessage, successMessage, warningMessage} from '../utils/format';

import loadWebpackConfig from '../actions/loadWebpackConfig';
import detectFramework from '../actions/detectFramework';
import loadPaths from '../actions/loadPaths';

import setupCatalog from '../actions/setupCatalog';
import runBuild from '../actions/runBuild';

args
  .option(['o', 'out'], 'Directory to build into', '<catalog directory>/build')
  .option(['u', 'public-url'], 'The URL where production assets get loaded from', '/')
  .option('public-path', '[DEPRECATED] Use --public-url');

const cliOptions = args.parse(process.argv, {value: '<catalog directory>'});

const run = async (catalogSrcDir: string = 'catalog', {out, publicPath, publicUrl}: {out: string, publicPath: ?string, publicUrl: string}) => {
  const framework = await detectFramework();

  let webpackPublicPath = publicUrl;
  if (publicPath) {
    console.warn(warningMessage('The --public-path option has been deprecated. Use --public-url'));
    webpackPublicPath = publicPath;
  }

  const paths = await loadPaths(catalogSrcDir, out.replace('<catalog directory>', catalogSrcDir), framework, webpackPublicPath);

  const webpackConfig = await loadWebpackConfig({paths, dev: false, framework});

  await setupCatalog(paths);

  console.log(chalk`
  Building Catalog. This may take a while …
`);
  await runBuild(webpackConfig, paths);
  console.log(chalk`  {green Built Catalog into} ${paths.unresolvedCatalogBuildDir}
`);
};

run(args.sub[0], cliOptions)
.catch(err => {
  console.error(errorMessage('Failed to compile Catalog\n\n' + err.stack + '\n'));
  process.exit(1);
});
