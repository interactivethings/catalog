var path = require('path');

module.exports = {
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
  }
};
