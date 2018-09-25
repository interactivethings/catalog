// @flow
import autoprefixer from "autoprefixer";
import ExtractTextPlugin from "extract-text-webpack-plugin";

const cssFilename = "static/[name].[contenthash:8].css";

// ExtractTextPlugin expects the build output to be flat.
// (See https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/27)
// However, our output is structured with css, js and media folders.
// To have this structure working with relative paths, we have to use custom options.
// FIXME: detect this
const shouldUseRelativeAssetPaths = false;
const extractTextPluginOptions = shouldUseRelativeAssetPaths
  ? // Making sure that the publicPath goes back to to build folder.
    { publicPath: Array(cssFilename.split("/").length).join("../") }
  : {};

export default (paths: Object, useBabelrc: boolean, dev: boolean) => ({
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
          test: /\.(js|jsx)$/,
          include: [paths.appRoot, paths.catalogSrcDir],
          exclude: /node_modules/,
          loader: require.resolve("babel-loader"),
          options: {
            babelrc: useBabelrc,
            presets: useBabelrc
              ? []
              : [
                  require.resolve("babel-preset-react-app"),
                  require.resolve("../../../babel")
                ],
            cacheDirectory: true
          }
        },
        // "postcss" loader applies autoprefixer to our CSS.
        // "css" loader resolves paths in CSS and adds assets as dependencies.
        // "style" loader turns CSS into JS modules that inject <style> tags.
        // In production, we use a plugin to extract that CSS to a file, but
        // in development "style" loader enables hot editing of CSS.
        dev
          ? {
              test: /\.css$/,
              use: [
                require.resolve("style-loader"),
                {
                  loader: require.resolve("css-loader"),
                  options: {
                    importLoaders: 1
                  }
                },
                {
                  loader: require.resolve("postcss-loader"),
                  options: {
                    ident: "postcss", // https://webpack.js.org/guides/migrating/#complex-options
                    plugins: () => {
                      return [
                        autoprefixer({
                          browsers: [
                            ">1%",
                            "last 4 versions",
                            "Firefox ESR",
                            "not ie < 9" // React doesn't support IE8 anyway
                          ]
                        })
                      ];
                    }
                  }
                }
              ]
            }
          : {
              test: /\.css$/,
              loader: ExtractTextPlugin.extract({
                fallback: require.resolve("style-loader"),
                use: [
                  {
                    loader: require.resolve("css-loader"),
                    options: {
                      importLoaders: 1
                    }
                  },
                  {
                    loader: require.resolve("postcss-loader"),
                    options: {
                      ident: "postcss", // https://webpack.js.org/guides/migrating/#complex-options
                      plugins: () => {
                        return [
                          autoprefixer({
                            browsers: [
                              ">1%",
                              "last 4 versions",
                              "Firefox ESR",
                              "not ie < 9" // React doesn't support IE8 anyway
                            ]
                          })
                        ];
                      }
                    }
                  }
                ],
                ...extractTextPluginOptions
              })
            },
        {
          exclude: [/\.js$/, /\.html$/, /\.json$/, /\.md$/],
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
        new ExtractTextPlugin({
          filename: cssFilename
        })
      ]
});
