// @flow
import {resolveAppPath, resolveOwnPath, nodePaths} from '../utils/paths';

export default (catalogSrcDir: string = 'catalog', catalogBuildDir: string = 'catalog-build', options: Object) => ({

  unresolvedCatalogSrcDir: catalogSrcDir,
  catalogSrcDir: resolveAppPath(catalogSrcDir),
  catalogBuildDir: resolveAppPath(catalogBuildDir),
  catalogIndexJs: resolveAppPath(catalogSrcDir, 'index.js'),
  catalogIndexHtml: resolveAppPath(catalogSrcDir, 'index.html'),

  catalogSrcTemplateDir: resolveOwnPath('..', '..', 'cli-template'),

  // TODO: Clean up
  appPublic: resolveAppPath('public'),
  appRoot: resolveAppPath('.'),
  ownIndexJs: resolveOwnPath('catalog-entry.js'),
  appHtml: resolveAppPath('public/index.html'),
  ownHtml: resolveOwnPath('template/index.html'),
  appConfig: resolveAppPath('catalog.config.js'),
  appPackageJson: resolveAppPath('package.json'),
  appSrc: resolveAppPath('src'),
  yarnLockFile: resolveAppPath('yarn.lock'),
  babelrc: resolveAppPath('.babelrc'),
  appNodeModules: resolveAppPath('node_modules'),
  ownNodeModules: resolveAppPath('node_modules'),
  nodePaths: nodePaths
});
