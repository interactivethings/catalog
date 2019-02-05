import { exists } from "sander";

import {
  resolveAppPath,
  resolveOwnPath,
  nodePaths,
  ensureSlash
} from "../utils/paths";

export interface CatalogCLIPaths {
  unresolvedCatalogSrcDir: string;
  unresolvedCatalogBuildDir: string;
  catalogSrcDir: string;
  catalogBuildDir: string;
  catalogIndexJs: string;
  catalogIndexHtml: string;
  catalogStaticSrcDir: string;
  catalogStaticBuildDir: string;
  catalogSrcTemplateDir: string;
  appRoot: string;
  appStaticSrcDir: string;
  appStaticBuildDir: string;
  appPackageJson: string;
  appSrc: string;
  yarnLockFile: string;
  babelrc: string;
  appNodeModules: string;
  ownNodeModules: string;
  nodePaths: string[];
  publicUrl: string;
}

export default async (
  catalogSrcDir: string,
  catalogBuildDir: string,
  publicUrl: string
): Promise<CatalogCLIPaths> => ({
  unresolvedCatalogSrcDir: catalogSrcDir,
  unresolvedCatalogBuildDir: catalogBuildDir,
  catalogSrcDir: resolveAppPath(catalogSrcDir),
  catalogBuildDir: resolveAppPath(catalogBuildDir),
  catalogIndexJs: resolveAppPath(catalogSrcDir, "index"),
  catalogIndexHtml: resolveAppPath(catalogSrcDir, "index.html"),
  catalogStaticSrcDir: resolveAppPath(catalogSrcDir, "static"),
  catalogStaticBuildDir: resolveAppPath(catalogBuildDir),

  catalogSrcTemplateDir: resolveOwnPath("..", "setup-template"),

  appRoot: resolveAppPath("."),
  appStaticSrcDir: resolveAppPath("static"),
  appStaticBuildDir: resolveAppPath(catalogBuildDir),

  appPackageJson: resolveAppPath("package.json"),
  appSrc: resolveAppPath("src"),
  yarnLockFile: resolveAppPath("yarn.lock"),
  babelrc: resolveAppPath(".babelrc"),
  appNodeModules: resolveAppPath("node_modules"),
  ownNodeModules: resolveOwnPath("..", "..", "node_modules"),
  nodePaths: nodePaths(),

  publicUrl: ensureSlash(publicUrl, true)
});
