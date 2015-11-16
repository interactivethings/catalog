/*eslint-disable*/

var webpack = require('webpack');
var path = require('path');
var assignDeep = require('assign-deep');
var webpackConfig = require('./webpack.config');

var libConfig = {
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
    },
    'history': {
      root: 'History',
      commonjs2: 'history',
      commonjs: 'history',
      amd: 'history'
    }
  }
}

module.exports = assignDeep({}, webpackConfig, libConfig);
