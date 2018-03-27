#!/usr/bin/env node
// @flow
import "babel-polyfill";
process.env.NODE_ENV = "production";

import args from "args";
import chalk from "chalk";
import { exists } from "sander";

import {
  errorMessage,
  warningMessage,
  infoMessageDimmed
} from "../utils/format";

import loadWebpackConfig from "../actions/loadWebpackConfig";
import loadConfigFile from "../actions/loadConfigFile";
import detectFramework from "../actions/detectFramework";
import type { Framework } from "../actions/detectFramework";
import loadPaths from "../actions/loadPaths";

import setupCatalog from "../actions/setupCatalog";
import runBuild from "../actions/runBuild";

args
  .option(["o", "out"], "Directory to build into", "<catalog directory>/build")
  .option(
    ["u", "public-url"],
    "The URL where production assets get loaded from",
    "/"
  )
  .option("public-path", "[DEPRECATED] Use --public-url")
  .option("babelrc", "Use local .babelrc file (defaults to true)");

const cliOptions = args.parse(process.argv, {
  value: "<catalog directory>",
  mri: {
    boolean: ["babelrc"]
  }
});

const getFrameworkName = (framework: Framework): string => {
  switch (framework) {
    case "CREATE_REACT_APP":
      return "Create React App";
    case "NEXT":
      return "next.js (support is experimental)";
    case "UNKNOWN":
    default:
      return "";
  }
};

const run = async (
  catalogSrcDir: string = "catalog",
  {
    out,
    publicPath,
    publicUrl,
    babelrc
  }: {
    out: string,
    publicPath: ?string,
    publicUrl: string,
    babelrc: void | boolean
  }
) => {
  const framework = await detectFramework();

  const configFile = await loadConfigFile();

  let webpackPublicPath = publicUrl;
  if (publicPath) {
    console.warn(
      warningMessage(
        "The --public-path option has been deprecated. Use --public-url"
      )
    );
    webpackPublicPath = publicPath;
  }

  const paths = await loadPaths(
    catalogSrcDir,
    out.replace("<catalog directory>", catalogSrcDir),
    framework,
    webpackPublicPath
  );

  const babelrcExists: boolean = await exists(paths.babelrc);

  const useBabelrc =
    babelrc !== undefined
      ? babelrc
      : configFile && configFile.useBabelrc !== undefined
        ? configFile.useBabelrc
        : babelrcExists;

  const webpackOptions = { paths, dev: false, framework, useBabelrc };

  let webpackConfig = await loadWebpackConfig(webpackOptions);

  if (configFile) {
    if (typeof configFile.webpack === "function") {
      webpackConfig = configFile.webpack(webpackConfig, webpackOptions);
    }
  }

  await setupCatalog(paths);

  console.log(chalk`
  Building Catalog. This may take a while …
`);

  if (configFile) {
    console.log(
      infoMessageDimmed("  Using configuration file catalog.config.js")
    );
  }
  if (framework !== "UNKNOWN") {
    console.log(infoMessageDimmed("  Detected " + getFrameworkName(framework)));
  }
  if (useBabelrc) {
    console.log(infoMessageDimmed("  Using custom .babelrc"));
  }

  await runBuild(webpackConfig, paths);
  console.log(chalk`  {green Built Catalog into} ${
    paths.unresolvedCatalogBuildDir
  }
`);
};

run(args.sub[0], cliOptions).catch(err => {
  console.error(
    errorMessage("Failed to compile Catalog\n\n" + err.stack + "\n")
  );
  process.exit(1);
});
