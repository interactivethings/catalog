// @flow
import {
  resolveAppPath,
  resolveOwnPath,
  nodePaths,
  ensureSlash
} from "../utils/paths";

export default async (
  catalogSrcDir: string,
  catalogBuildDir: string,
  framework: string,
  publicUrl: string
) => ({
  unresolvedCatalogSrcDir: catalogSrcDir,
  unresolvedCatalogBuildDir: catalogBuildDir,
  catalogSrcDir: resolveAppPath(catalogSrcDir),
  catalogBuildDir: resolveAppPath(catalogBuildDir),
  catalogIndexJs: resolveAppPath(catalogSrcDir, "index.js"),
  catalogIndexHtml: resolveAppPath(catalogSrcDir, "index.html"),
  catalogStaticSrcDir: resolveAppPath(catalogSrcDir, "static"),
  catalogStaticBuildDir: resolveAppPath(catalogBuildDir),

  catalogSrcTemplateDir: resolveOwnPath("..", "setup-template"),

  appRoot: resolveAppPath("."),
  appStaticSrcDir:
    framework === "NEXT" ? resolveAppPath("static") : resolveAppPath("public"),
  appStaticBuildDir:
    framework === "NEXT"
      ? resolveAppPath(catalogBuildDir, "static")
      : resolveAppPath(catalogBuildDir),

  appPackageJson: resolveAppPath("package.json"),
  appSrc: resolveAppPath("src"),
  yarnLockFile: resolveAppPath("yarn.lock"),
  babelrc: resolveAppPath(".babelrc"),
  appNodeModules: resolveAppPath("node_modules"),
  ownNodeModules: resolveOwnPath("..", "..", "node_modules"),
  nodePaths: nodePaths,

  publicUrl: ensureSlash(publicUrl, true)
});
