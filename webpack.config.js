/*eslint-disable*/

var resolveHere = require('path').resolve.bind(null, __dirname);
var assignDeep = require('assign-deep');
var values = require('object-values');
var webpack = require('webpack');

var env = process.env.NODE_ENV || 'development';

var loaders = {
  common: {
    js: {test: /\.js$/, include: [resolveHere('src')], loader: 'babel'},
    css: {test: /\.css$/, loader: 'style!css'},

    // Images
    png: {test: /\.png$/, loader: 'url?limit=8192&mimetype=image/png'},
    gif: {test: /\.gif$/, loader: 'url?limit=8192&mimetype=image/gif'},
    jpg: {test: /\.jpe?g$/, loader: 'file?mimetype=image/jpg'},
    svg: {test: /\.svg$/, loader: 'url?limit=8192&mimetype=image/svg+xml'},

    // Fonts
    woff2: {test: /\.woff2$/, loader: 'url?limit=8192&mimetype=application/font-woff2'},
    woff: {test: /\.woff$/, loader: 'url?limit=8192&mimetype=application/font-woff'},
    ttf: {test: /\.ttf$/, loader: 'file'},
    eot: {test: /\.eot$/, loader: 'file'},

    // Other
    json: {test: /\.json$/, loader: 'json'},
    html: {test: /\.html$/, loader: 'file?name=[name].[ext]'}
  },

  development: {},

  production: {}
}

var webpackConfig = {
  common: {
    output: {
      library: 'Catalog',
      libraryTarget: 'umd',
      path: resolveHere('.'),
      filename: 'catalog.js'
    },
    resolve: {
      root: resolveHere('src')
    },
    module: {
      loaders: values(assignDeep(loaders.common, loaders[env])),
      noParse: [
        /\.min\.js$/
      ]
    }
  },

  development: {
    entry: [
      'webpack-hot-middleware/client',
      resolveHere('src/index')
    ],
    output: {
      pathinfo: true
    },
    devtool: '#eval-source-map',
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
       '__DEV__': JSON.stringify(true),
       'process.env.NODE_ENV': JSON.stringify('development')
      })
    ]
  },

  production: {
    entry: resolveHere('src/index'),
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
      })
    ]
  }
};

var libConfig = {
  output: {
    filename: 'catalog-lib.js'
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom'
    },
    'react-router': {
      root: 'ReactRouter',
      commonjs2: 'react-router',
      commonjs: 'react-router',
      amd: 'react-router'
    }
  }
}

module.exports = [
  assignDeep({}, webpackConfig.common, webpackConfig[env]),
  assignDeep({}, webpackConfig.common, libConfig, webpackConfig[env])
];
