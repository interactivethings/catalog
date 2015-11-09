/*eslint-disable*/

var webpack = require('webpack');
var assignDeep = require('assign-deep');
var webpackConfig = require('./webpack.config');

var libConfig = {
  entry: './src/index',
  output: {
    filename: 'catalog-lib.js',
    libraryTarget: 'umd'
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
  },
  plugins: [
    new webpack.DefinePlugin({
     '__DEV__': JSON.stringify(process.env.NODE_ENV === 'development'),
     'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ]
}

module.exports = assignDeep({}, webpackConfig, libConfig);
