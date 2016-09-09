var resolveHere = require('path').resolve.bind(null, __dirname);
var webpack = require('webpack');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');

module.exports = {
  entry: { app: resolveHere('index') },
  output: {
    path: resolveHere('build'),
    libraryTarget: 'umd',
    filename: 'app.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {test: /\.js$/, include: [__dirname, resolveHere('../../src')], loader: 'babel'},
      {test: /\.md$/, include: [__dirname], loaders: [resolveHere('../../src/loader'), 'raw']}
    ],
    noParse: /\.min\.js$/
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
	new StaticSiteGeneratorPlugin('app.js', ['/', '/bar'], { title: 'Catalog' })
  ]
};
