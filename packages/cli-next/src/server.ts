import { createServer } from "http";
import * as path from "path";
// import { parse } from "url";

import * as next from "next";
import webpack = require("webpack");

// const dev = process.env.NODE_ENV !== 'production'

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
  dir: string = "catalog",
  options: Options
): Promise<Server> => {
  const app = next({
    dev: true,
    dir,
    conf: {
      exportPathMap: async (defaultPathMap: any) => {
        return {
          ...defaultPathMap
        };
      },

      webpack(webpackConfig: any) {
        webpackConfig.module.rules.push({
          test: /\.md$/,
          use: ["@catalog/markdown-loader", "raw-loader"]
        });

        return webpackConfig;
      }
    }
  });
  const handle = app.getRequestHandler();
  await app.prepare();

  const devServer = createServer(handle).listen(3000, (err: Error) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
  return { port: 3000, url: "http://localhost:3000", devServer };
};

export const stopServer = async (server: Server) => {
  server.devServer.close();
};
