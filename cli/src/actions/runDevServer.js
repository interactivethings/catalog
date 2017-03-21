// @flow
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

export default async (config: Object, host: string, port: number, https: boolean, paths: Object, framework: string): Promise<string> => {
  const compiler = webpack(config);
  const devServer = new WebpackDevServer(compiler, {
    compress: true,
    clientLogLevel: 'none',
    contentBase: framework === 'NEXT' ? paths.appRoot : paths.staticSrcDir,
    hot: true,
    publicPath: config.output.publicPath,
    quiet: true,
    // Reportedly, this avoids CPU overload on some systems.
    // https://github.com/facebookincubator/create-react-app/issues/293
    watchOptions: {
      ignored: /node_modules/
    },
    historyApiFallback: {
      disableDotRule: true
    },
    https,
    host
  });

  // Launch WebpackDevServer.
  return new Promise((resolve, reject) => {
    devServer.listen(port, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve((https ? 'https' : 'http') + '://' + host + ':' + port + '/');
      }
    });
  });
};
