import { exists } from "sander";
import openBrowser from "react-dev-utils/openBrowser";
import { choosePort } from "react-dev-utils/WebpackDevServerUtils";

import { infoMessageDimmed } from "./utils/format";

import loadWebpackConfig from "./actions/loadWebpackConfig";
import loadConfigFile from "./actions/loadConfigFile";
import loadPaths from "./actions/loadPaths";

import setupCatalog from "./actions/setupCatalog";
import runDevServer from "./actions/runDevServer";

export interface Options {
  port: number;
  https: boolean;
  host: string;
  proxy: void | string;
  babelrc: void | boolean;
}

export interface Server {
  port: number;
  url: string;
  devServer: any;
}

export const startServer = async (
  catalogSrcDir: string = "catalog",
  options: Options
): Promise<Server> => {
  const configFile = await loadConfigFile();

  const paths = await loadPaths(catalogSrcDir, "", "/");

  const port = await choosePort("0.0.0.0", options.port);

  const url =
    (options.https ? "https" : "http") +
    "://" +
    options.host +
    ":" +
    port +
    "/";

  const babelrcExists: boolean = await exists(paths.babelrc);

  const useBabelrc =
    options.babelrc !== undefined
      ? options.babelrc
      : configFile && configFile.useBabelrc !== undefined
      ? configFile.useBabelrc
      : babelrcExists;

  const webpackOptions = { paths, dev: true, url, useBabelrc };

  let webpackConfig = await loadWebpackConfig(webpackOptions);

  if (configFile) {
    if (typeof configFile.webpack === "function") {
      webpackConfig = configFile.webpack(webpackConfig, webpackOptions);
    }
  }

  await setupCatalog(paths);

  console.log(`
  Starting Catalog …
`);
  if (configFile) {
    console.log(
      infoMessageDimmed("  Using configuration file catalog.config.js")
    );
  }
  if (useBabelrc) {
    console.log(infoMessageDimmed("  Using custom .babelrc"));
  }

  const devServer = await runDevServer(
    webpackConfig,
    options.host,
    port,
    options.https,
    paths,
    options.proxy
  );

  openBrowser(url);

  return { port, url, devServer };
};

export const stopServer = async (server: Server) => {
  server.devServer.close();
};
