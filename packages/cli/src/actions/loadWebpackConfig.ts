import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ManifestPlugin from "webpack-manifest-plugin";
import WatchMissingNodeModulesPlugin from "react-dev-utils/WatchMissingNodeModulesPlugin";
import InterpolateHtmlPlugin from "react-dev-utils/InterpolateHtmlPlugin";
import FriendlyErrorsWebpackPlugin from "friendly-errors-webpack-plugin";
import { exists } from "sander";

import createReactAppConfig from "../config/createReactApp";
import nextConfig from "../config/next";
import getClientEnvironment from "../config/env";
import { link } from "../utils/format";

type LoadWebpackOptions = {
  paths: any;
  framework: string;
  dev: boolean;
  useBabelrc: boolean;
  url?: string;
};
type WebpackConfig = {};

export default async ({
  paths,
  framework,
  dev,
  url,
  useBabelrc
}: LoadWebpackOptions): Promise<WebpackConfig> => {
  const frameworkConfig =
    framework === "NEXT"
      ? nextConfig(paths, useBabelrc, dev)
      : createReactAppConfig(paths, useBabelrc, dev);

  const env = getClientEnvironment(paths.publicUrl.replace(/\/$/, ""));

  const devPlugins = dev
    ? [
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
        new FriendlyErrorsWebpackPlugin({
          compilationSuccessInfo: {
            messages: url ? [`Catalog is running at ${link(url)}`] : []
          }
        })
      ]
    : [];

  return {
    mode: dev ? "development" : "production",
    devtool: dev ? "cheap-module-source-map" : "source-map",
    bail: dev ? false : true,
    entry: {
      catalog: [require.resolve("react-app-polyfill/ie11")]
        .concat(
          dev ? [require.resolve("react-dev-utils/webpackHotDevClient")] : []
        )
        .concat(paths.catalogIndexJs)
    },
    output: {
      path: paths.catalogBuildDir,
      pathinfo: dev ? true : false,
      filename: dev ? "static/[name].js" : "static/[name].[chunkhash:8].js",
      chunkFilename: dev
        ? "static/[name].chunk.js"
        : "static/[name].[chunkhash:8].chunk.js",
      // This is the URL that app is served from. We use "/" in development.
      publicPath: paths.publicUrl
    },
    resolve: {
      modules: [paths.appSrc, "node_modules", paths.appNodeModules].concat(
        paths.nodePaths
      ),
      extensions: [".mjs", ".js", ".ts", ".tsx", ".json", ".jsx"],
      alias: {
        // Support React Native Web
        // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
        "react-native": "react-native-web",
        "babel-standalone": "babel-standalone/babel.min.js",
        "js-yaml": "js-yaml/dist/js-yaml.min.js"
      }
    },
    resolveLoader: {
      modules: [paths.ownNodeModules, paths.appNodeModules]
    },
    module: {
      rules: [
        ...frameworkConfig.moduleRules,
        {
          test: /\.md$/,
          loaders: [
            require.resolve("@catalog/markdown-loader"),
            require.resolve("raw-loader")
          ]
        }
      ]
    },
    plugins: (dev
      ? []
      : [
          new webpack.optimize.UglifyJsPlugin({
            compress: {
              warnings: false,
              // Disabled because of an issue with Uglify breaking seemingly valid code:
              // https://github.com/facebookincubator/create-react-app/issues/2376
              // Pending further investigation:
              // https://github.com/mishoo/UglifyJS2/issues/2011
              comparisons: false
            },
            output: {
              comments: false,
              // Turned on because emoji and regex is not minified properly using default
              // https://github.com/facebookincubator/create-react-app/issues/2488
              ascii_only: true
            },
            sourceMap: true,
            // Don't minify the vendor chunk, since it only contains minified modules anyway.
            // Adds 13K to the bundle (because of webpack stuff) but speeds up the build 3x!
            exclude: /vendor/
          }),
          new ManifestPlugin({
            fileName: "asset-manifest.json"
          })
        ]
    ).concat([
      new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
      new HtmlWebpackPlugin({
        inject: true,
        template: paths.catalogIndexHtml,
        minify: dev
          ? false
          : {
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
      new webpack.DefinePlugin(env.stringified),
      // This is necessary to emit hot updates (currently CSS only):

      ...devPlugins,
      // Add framework-specific plugins
      ...frameworkConfig.plugins
    ]),
    node: {
      fs: "empty",
      net: "empty",
      tls: "empty"
    },
    performance: {
      hints: false
    },
    optimization: {
      // Automatically split vendor and commons
      // https://twitter.com/wSokra/status/969633336732905474
      // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
      splitChunks: {
        chunks: "all",
        name: false
      },
      // Keep the runtime chunk separated to enable long term caching
      // https://twitter.com/wSokra/status/969679223278505985
      runtimeChunk: true
    }
  };
};
