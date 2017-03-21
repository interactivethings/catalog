// @flow
import {resolveAppPath, resolveOwnPath, nodePaths} from '../utils/paths';

export default async (catalogSrcDir: string = 'catalog', catalogBuildDir: string = 'catalog/build', framework: string) => ({

  unresolvedCatalogSrcDir: catalogSrcDir,
  unresolvedCatalogBuildDir: catalogBuildDir,
  catalogSrcDir: resolveAppPath(catalogSrcDir),
  catalogBuildDir: resolveAppPath(catalogBuildDir),
  catalogIndexJs: resolveAppPath(catalogSrcDir, 'index.js'),
  catalogIndexHtml: resolveAppPath(catalogSrcDir, 'index.html'),

  catalogSrcTemplateDir: resolveOwnPath('..', 'setup-template'),

  appRoot: resolveAppPath('.'),
  staticSrcDir: framework === 'NEXT' ? resolveAppPath('static') : resolveAppPath('public'),
  staticBuildDir: framework === 'NEXT' ? resolveAppPath(catalogBuildDir, 'static') : resolveAppPath(catalogBuildDir),

  appPackageJson: resolveAppPath('package.json'),
  appSrc: resolveAppPath('src'),
  yarnLockFile: resolveAppPath('yarn.lock'),
  babelrc: resolveAppPath('.babelrc'),
  appNodeModules: resolveAppPath('node_modules'),
  ownNodeModules: resolveOwnPath('..', '..', 'node_modules'),
  nodePaths: nodePaths
});
