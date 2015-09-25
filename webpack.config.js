/*eslint-disable*/

var resolveHere = require('path').resolve.bind(null, __dirname);
var assignDeep = require('assign-deep');
var values = require('object-values');
var bourbon = require('node-bourbon');
var webpack = require('webpack');

var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var DedupePlugin = webpack.optimize.DedupePlugin;
var DefinePlugin = require('webpack').DefinePlugin;
var OccurenceOrderPlugin = webpack.optimize.OccurenceOrderPlugin;
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

var config = {
  env: process.env.NODE_ENV || 'development',
  globals: {
    __DEV__: (process.env.NODE_ENV === 'development'),
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }
}

var sassLoader = function(loadersDef) {
  return loadersDef + '?includePaths[]=' + [
    resolveHere('node_modules'),
    resolveHere('src'),
    bourbon.includePaths
  ].join('&includePaths[]=');
}

var loaders = {
  common: {
    js: {test: /\.js$/, include: [resolveHere('src')], loaders: ['babel?stage=0']},
    coffee: {test: /\.coffee$/, loader: 'coffee-loader'},
    scss: {test: /\.scss$/, loader: sassLoader('style!css!sass')},
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

  development: {
    js: {
      loaders: ['babel?stage=0']
    }
  },

  production: {}
}

var webpackConfig = {
  common: {
    resolve: {
      root: resolveHere('src'),
      extensions: ['', '.js', '.coffee', '.json', '.css', '.scss']
    },
    module: {
      loaders: values(assignDeep(loaders.common, loaders[config.env])),
      noParse: [
        /\.min\.js$/
      ]
    }
  },

  development: {
    entry: [
      resolveHere('src/catalog')
    ],
    output: {
      path: resolveHere('.'),
      filename: 'catalog.js',
      pathinfo: true
    },
    devtool: '#eval-source-map',
    plugins: [
      new DefinePlugin(config.globals)
    ]
  },

  production: {
    entry: {
      app: resolveHere('src/catalog')
    },
    output: {
      path: resolveHere('.'),
      filename: 'catalog.js'
    },
    plugins: [
      new DefinePlugin(config.globals),
      new DedupePlugin(),
      new UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new OccurenceOrderPlugin()
    ]
  }
};

module.exports = assignDeep(webpackConfig.common, webpackConfig[config.env]);
