/*eslint-disable*/

var resolveHere = require('path').resolve.bind(null, __dirname);
var assignDeep = require('assign-deep');
var webpack = require('webpack');
var version = require('./package.json').version;

var env = process.env.NODE_ENV || 'development';

var bannerPlugin = new webpack.BannerPlugin('Catalog ' + version + ' http://interactivethings.github.io/catalog/');

var baseConfig = {
  entry: resolveHere('src/index'),
  output: {
    library: 'Catalog',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [{test: /\.js$/, include: [resolveHere('src')], loader: 'babel'}]
  }
};

var webpackConfig = {
  // Used for the local development server
  hot: {
    entry: [
      'webpack-hot-middleware/client',
      resolveHere('src/index')
    ],
    output: {
      path: resolveHere('.'),
      filename: 'catalog.js',
      pathinfo: true
    },
    devtool: '#eval-source-map',
    plugins: [
      new webpack.DefinePlugin({
       '__DEV__': JSON.stringify(true),
       'process.env.NODE_ENV': JSON.stringify('development')
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.optimize.OccurenceOrderPlugin()
    ]
  },

  // Used for unminified development build
  development: {
    plugins: [
      new webpack.DefinePlugin({
       '__DEV__': JSON.stringify(true),
       'process.env.NODE_ENV': JSON.stringify('development')
      }),
      new webpack.optimize.OccurenceOrderPlugin(),
      bannerPlugin
    ]
  },

  // Minified production build
  production: {
    plugins: [
      new webpack.DefinePlugin({
        '__DEV__': JSON.stringify(false),
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      bannerPlugin
    ]
  }
};

module.exports = assignDeep({}, baseConfig, webpackConfig[env]);
