var resolveHere = require('path').resolve.bind(null, __dirname);
var webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-hot-middleware/client?noInfo=true&reload=true',
    resolveHere('index')
  ],
  output: {
    path: __dirname,
    filename: 'app.js'
  },
  devtool: '#eval-source-map',
  module: {
    loaders: [
      {test: /\.js$/, include: [__dirname, resolveHere('../../src')], loader: 'babel'},
      {test: /\.md$/, include: [__dirname], loaders: [resolveHere('../../src/loader'), 'raw']}
    ],
    noParse: /\.min\.js$/
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('hot')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurenceOrderPlugin()
  ]
};
