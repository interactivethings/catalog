import * as webpack from "webpack";
import * as WebpackDevServer from "webpack-dev-server";
import * as express from "express";
import * as errorOverlayMiddleware from "react-dev-utils/errorOverlayMiddleware";

export default async (
  config: any,
  host: string,
  port: number,
  https: boolean,
  paths: any,
  framework: string,
  proxy: void | string
): Promise<any> => {
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
    } as any /* because htmlAcceptHeaders is not documented */,
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
    before(app: any) {
      // Next.js serves static files from /static – which can't be configured with `contentBase` directly
      if (framework === "NEXT") {
        app.use("/static", express.static(paths.appStaticSrcDir));
      }
      // This lets us open files from the runtime error overlay.
      app.use(errorOverlayMiddleware());
    }
  });

  // Launch WebpackDevServer.
  return new Promise<any>((resolve, reject) => {
    devServer.listen(port, host, (err: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(devServer);
      }
    });
  });
};
