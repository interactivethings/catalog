const resolveHere = require('path').resolve.bind(null, __dirname);
const webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-hot-middleware/client?noInfo=true&reload=true',
    resolveHere('src/index-standalone')
  ],
  output: {
    library: 'Catalog',
    libraryTarget: 'umd',
    path: resolveHere('.'),
    filename: 'catalog.js',
    pathinfo: true
  },
  module: {
    loaders: [
      {test: /\.js$/, include: resolveHere('src'), loader: 'babel'},
      {test: require.resolve('react'), loader: 'expose?React'}
    ],
    noParse: /\.min\.js$/
  },
  externals: {
    'babel-standalone': 'Babel'
  },
  devtool: '#eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
