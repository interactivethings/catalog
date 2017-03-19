// @flow
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

export default async (config: Object, host: string, port: number, protocol: string, paths: Object, framework: string): Promise<string> => {
  const compiler = webpack(config);
  const devServer = new WebpackDevServer(compiler, {
    compress: true,
    clientLogLevel: 'none',
    contentBase: framework === 'CREATE_REACT_APP' ? paths.appPublic : paths.appRoot,
    hot: true,
    publicPath: config.output.publicPath,
    quiet: true,
    // Reportedly, this avoids CPU overload on some systems.
    // https://github.com/facebookincubator/create-react-app/issues/293
    watchOptions: {
      ignored: /node_modules/
    },
    https: protocol === 'https',
    host: host,
    historyApiFallback: {
      disableDotRule: true
    }
  });

  // Launch WebpackDevServer.
  return new Promise((resolve, reject) => {
    devServer.listen(port, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(protocol + '://' + host + ':' + port + '/');
      }
    });
  });
};
