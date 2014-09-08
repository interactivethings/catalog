var path = require('path');
var webpack = require('webpack');

var env = {
  __DEV__: process.env.NODE_ENV !== 'production'
}

var config = {
  entry: path.join(__dirname, 'catalog.coffee'),
  output: {
    filename: path.join(__dirname, '..', 'catalog.js')
  },
  module: {
    loaders: [
      { test: /\.coffee$/, loader: 'coffee-loader' },
      {
        test: /\.scss$/,
        loader: "style!css!sass?outputStyle=compressed&includePaths[]=" +
          (path.resolve(__dirname, '../node_modules'))
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json', '.coffee']
  },
  plugins: [
    new webpack.DefinePlugin(env)
  ]
};

if (env.__DEV__) {
  config.module.loaders.push({
    test: require.resolve("react"),
    loader: "expose?React"
  });
}

module.exports = config;
