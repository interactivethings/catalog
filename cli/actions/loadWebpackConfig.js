// @flow
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';
import WatchMissingNodeModulesPlugin from 'react-dev-utils/WatchMissingNodeModulesPlugin';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import {exists} from 'sander';

import createReactAppConfig from '../config/createReactApp';
import nextConfig from '../config/next';

type LoadWebpackOptions = {
  paths: Object;
  framework: string;
  dev: boolean
};
type WebpackConfig = {};

export default async ({paths, framework, dev}: LoadWebpackOptions): WebpackConfig => {
  const useBabelrc = await exists(paths.babelrc);
  const frameworkConfig = framework === 'NEXT'
    ? nextConfig(paths, useBabelrc, dev)
    : createReactAppConfig(paths, useBabelrc, dev);

  return {
    devtool: dev ? 'cheap-module-source-map' : 'source-map',
    bail: dev ? false : true,
    entry: (
      dev
      ? [require.resolve('react-dev-utils/webpackHotDevClient')]
      : []
      ).concat(paths.catalogIndexJs),
    output: {
      path: paths.catalogBuildDir,
      pathinfo: dev ? true : false,
      filename: dev ? 'static/catalog-bundle.js' : 'static/catalog-bundle.[chunkhash:8].js',
      chunkFilename: dev ? 'static/[name].chunk.js' : 'static/[name].[chunkhash:8].chunk.js',
      // This is the URL that app is served from. We use "/" in development.
      // FIXME: use proper path in production that depends on server directory.
      publicPath: '/'
    },
    resolve: {
      modules: ['node_modules'].concat(paths.nodePaths),
      extensions: ['.js', '.json', '.jsx'],
      alias: {
      // Support React Native Web
      // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
        'react-native': 'react-native-web'
      }
    },
    resolveLoader: {
      modules: [
        paths.ownNodeModules,
        paths.appNodeModules
      ]
    },
    module: {
      rules: frameworkConfig.moduleRules
    },
    plugins: (
      dev
      ? []
      : [
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            screw_ie8: true, // React doesn't support IE8
            warnings: false
          },
          mangle: {
            screw_ie8: true
          },
          output: {
            comments: false,
            screw_ie8: true
          },
          sourceMap: true
        }),
        new ManifestPlugin({
          fileName: 'asset-manifest.json'
        })
      ]
    ).concat([
    // Makes some environment variables available in index.html.
    // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
    // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    // In development, this will be an empty string.
    // new InterpolateHtmlPlugin(env.raw),
    // Generates an `index.html` file with the <script> injected.
      new HtmlWebpackPlugin({
        inject: true,
        template: paths.catalogIndexHtml,
        minify: dev ? false : {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        }
      }),
    // Makes some environment variables available to the JS code, for example:
    // if (process.env.NODE_ENV === 'development') { ... }. See `./env.js`.
      new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(dev ? 'development' : 'production')}),
    // This is necessary to emit hot updates (currently CSS only):
      new webpack.HotModuleReplacementPlugin(),
    // Watcher doesn't work well if you mistype casing in a path so we use
    // a plugin that prints an error when you attempt to do this.
    // See https://github.com/facebookincubator/create-react-app/issues/240
    // new CaseSensitivePathsPlugin(),
    // If you require a missing module and then `npm install` it, you still have
    // to restart the development server for Webpack to discover it. This plugin
    // makes the discovery automatic so you don't have to restart.
    // See https://github.com/facebookincubator/create-react-app/issues/186
      new WatchMissingNodeModulesPlugin(paths.appNodeModules),
      new FriendlyErrorsWebpackPlugin(),


      // Add framework-specific plugins
      ...frameworkConfig.plugins
    ]),
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty'
    },
  // Turn off performance hints during development because we don't do any
  // splitting or minification in interest of speed. These warnings become
  // cumbersome.
    performance: {
      hints: false
    }
  };
};
