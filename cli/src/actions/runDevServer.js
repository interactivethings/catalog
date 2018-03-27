// @flow
import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import express from "express";
import errorOverlayMiddleware from "react-dev-utils/errorOverlayMiddleware";

export default async (
  config: Object,
  host: string,
  port: number,
  https: boolean,
  paths: Object,
  framework: string,
  proxy: void | string
): Promise<string> => {
  const compiler = webpack(config);
  const devServer = new WebpackDevServer(compiler, {
    compress: true,
    clientLogLevel: "none",
    contentBase: [paths.catalogStaticSrcDir, paths.appStaticSrcDir],
    // By default files from `contentBase` will not trigger a page reload.
    watchContentBase: true,
    hot: true,
    publicPath: config.output.publicPath,
    quiet: true,
    disableHostCheck: true,
    // Reportedly, this avoids CPU overload on some systems.
    // https://github.com/facebookincubator/create-react-app/issues/293
    watchOptions: {
      ignored: /node_modules/
    },
    historyApiFallback: {
      disableDotRule: true,
      htmlAcceptHeaders: proxy ? ["text/html"] : ["text/html", "*/*"]
    },
    https,
    host,
    ...(proxy
      ? {
          proxy: {
            "**": proxy
          }
        }
      : {}),
    overlay: false,
    before(app) {
      // Next.js serves static files from /static – which can't be configured with `contentBase` directly
      if (framework === "NEXT") {
        app.use("/static", express.static(paths.appStaticSrcDir));
      }
      // This lets us open files from the runtime error overlay.
      app.use(errorOverlayMiddleware());
    }
  });

  // Launch WebpackDevServer.
  return new Promise((resolve, reject) => {
    devServer.listen(port, err => {
      if (err) {
        reject(err);
      } else {
        resolve((https ? "https" : "http") + "://" + host + ":" + port + "/");
      }
    });
  });
};
