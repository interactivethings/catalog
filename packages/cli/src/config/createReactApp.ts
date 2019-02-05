import autoprefixer from "autoprefixer";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import getCSSModuleLocalIdent from "react-dev-utils/getCSSModuleLocalIdent";

import { CatalogCLIPaths } from "../actions/loadPaths";

const cssFilename = "static/[name].[contenthash:8].css";
const shouldUseSourceMap = true;

// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

// FIXME: detect when this should be true
const shouldUseRelativeAssetPaths = false;

// common function to get style loaders
const getStyleLoaders = ({
  cssOptions,
  preProcessor,
  dev
}: {
  cssOptions: any;
  preProcessor?: string;
  dev: boolean;
}) => {
  const loaders = [
    dev && require.resolve("style-loader"),
    !dev && {
      loader: MiniCssExtractPlugin.loader,
      options: Object.assign(
        {},
        shouldUseRelativeAssetPaths ? { publicPath: "../../" } : undefined
      )
    },
    {
      loader: require.resolve("css-loader"),
      options: cssOptions
    },
    {
      // Options for PostCSS as we reference these options twice
      // Adds vendor prefixing based on your specified browser support in
      // package.json
      loader: require.resolve("postcss-loader"),
      options: {
        // Necessary for external CSS imports to work
        // https://github.com/facebook/create-react-app/issues/2677
        ident: "postcss",
        plugins: () => [
          require("postcss-flexbugs-fixes"),
          require("postcss-preset-env")({
            autoprefixer: {
              flexbox: "no-2009"
            },
            stage: 3
          })
        ],
        sourceMap: !dev && shouldUseSourceMap
      }
    }
  ].filter(Boolean);
  if (preProcessor) {
    loaders.push({
      loader: require.resolve(preProcessor),
      options: {
        sourceMap: !dev && shouldUseSourceMap
      }
    });
  }
  return loaders;
};

export default (paths: CatalogCLIPaths, useBabelrc: boolean, dev: boolean) => ({
  moduleRules: [
    {
      oneOf: [
        // "url" loader works like "file" loader except that it embeds assets
        // smaller than specified limit in bytes as data URLs to avoid requests.
        // A missing `test` is equivalent to a match.
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          loader: require.resolve("url-loader"),
          options: {
            limit: 10000,
            name: "static/media/[name].[hash:8].[ext]"
          }
        },
        // Process JS with Babel.
        {
          test: /\.(mjs|js|jsx|ts|tsx)$/,
          include: [paths.appRoot, paths.catalogSrcDir],
          exclude: /(lodash|standalone)/,
          loader: require.resolve("babel-loader"),
          options: {
            babelrc: useBabelrc,
            presets: useBabelrc
              ? []
              : [
                  require.resolve("babel-preset-react-app"),
                  require.resolve("@catalog/babel-preset")
                ],
            cacheDirectory: true
          }
        },
        // "postcss" loader applies autoprefixer to our CSS.
        // "css" loader resolves paths in CSS and adds assets as dependencies.
        // "style" loader turns CSS into JS modules that inject <style> tags.
        // In production, we use MiniCSSExtractPlugin to extract that CSS
        // to a file, but in development "style" loader enables hot editing
        // of CSS.
        // By default we support CSS Modules with the extension .module.css
        {
          test: cssRegex,
          exclude: cssModuleRegex,
          use: getStyleLoaders({
            cssOptions: {
              importLoaders: 1,
              sourceMap: !dev && shouldUseSourceMap
            },
            dev
          }),
          // Don't consider CSS imports dead code even if the
          // containing package claims to have no side effects.
          // Remove this when webpack adds a warning or an error for this.
          // See https://github.com/webpack/webpack/issues/6571
          sideEffects: true
        },
        // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
        // using the extension .module.css
        {
          test: cssModuleRegex,
          use: getStyleLoaders({
            cssOptions: {
              importLoaders: 1,
              sourceMap: !dev && shouldUseSourceMap,
              modules: true,
              getLocalIdent: getCSSModuleLocalIdent
            },
            dev
          })
        },
        // Opt-in support for SASS (using .scss or .sass extensions).
        // By default we support SASS Modules with the
        // extensions .module.scss or .module.sass
        {
          test: sassRegex,
          exclude: sassModuleRegex,
          use: getStyleLoaders({
            cssOptions: {
              importLoaders: 2,
              sourceMap: !dev && shouldUseSourceMap
            },
            preProcessor: "sass-loader",
            dev
          }),
          // Don't consider CSS imports dead code even if the
          // containing package claims to have no side effects.
          // Remove this when webpack adds a warning or an error for this.
          // See https://github.com/webpack/webpack/issues/6571
          sideEffects: true
        },
        // Adds support for CSS Modules, but using SASS
        // using the extension .module.scss or .module.sass
        {
          test: sassModuleRegex,
          use: getStyleLoaders({
            cssOptions: {
              importLoaders: 2,
              sourceMap: !dev && shouldUseSourceMap,
              modules: true,
              getLocalIdent: getCSSModuleLocalIdent
            },
            preProcessor: "sass-loader",
            dev
          })
        },
        {
          exclude: [/\.mjs$/, /\.js$/, /\.html$/, /\.json$/, /\.md$/],
          loader: require.resolve("file-loader"),
          options: {
            name: "static/media/[name].[hash:8].[ext]"
          }
        }
      ]
    }
  ],
  plugins: dev
    ? []
    : [
        new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: "static/css/[name].[contenthash:8].css",
          chunkFilename: "static/css/[name].[contenthash:8].chunk.css"
        })
      ]
});
