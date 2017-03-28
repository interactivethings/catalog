// @flow
import autoprefixer from 'autoprefixer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const cssFilename = 'static/[name].[contenthash:8].css';

// ExtractTextPlugin expects the build output to be flat.
// (See https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/27)
// However, our output is structured with css, js and media folders.
// To have this structure working with relative paths, we have to use custom options.
// FIXME: detect this
const shouldUseRelativeAssetPaths = false;
const extractTextPluginOptions = shouldUseRelativeAssetPaths
  // Making sure that the publicPath goes back to to build folder.
  ? {publicPath: Array(cssFilename.split('/').length).join('../')}
  : {};


export default (paths: Object, useBabelrc: boolean, dev: boolean) => ({
  moduleRules: [
      // Disable require.ensure as it's not a standard language feature.
      {parser: {requireEnsure: false}},
    {
      exclude: [
        /\.html$/,
        /\.(js|jsx)$/,
        /\.css$/,
        /\.json$/,
        /\.bmp$/,
        /\.gif$/,
        /\.jpe?g$/,
        /\.png$/,
        /\.md$/
      ],
      loader: 'file-loader',
      options: {
        name: 'static/media/[name].[hash:8].[ext]'
      }
    },
      // "url" loader works like "file" loader except that it embeds assets
      // smaller than specified limit in bytes as data URLs to avoid requests.
      // A missing `test` is equivalent to a match.
    {
      test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'static/media/[name].[hash:8].[ext]'
      }
    },
      // Process JS with Babel.
    {
      test: /\.(js|jsx)$/,
      include: [paths.appSrc, paths.catalogSrcDir],
      loader: 'babel-loader',
      options: {
        babelrc: useBabelrc,
        presets: useBabelrc ? [] : [require.resolve('babel-preset-react-app'), require.resolve('../../../lib/babel/preset')],
        // TODO check if this is an issue when this plugin is already included
        plugins: useBabelrc ? [] : [require.resolve('babel-plugin-syntax-dynamic-import')],
        cacheDirectory: true
      }
    },
      // "postcss" loader applies autoprefixer to our CSS.
      // "css" loader resolves paths in CSS and adds assets as dependencies.
      // "style" loader turns CSS into JS modules that inject <style> tags.
      // In production, we use a plugin to extract that CSS to a file, but
      // in development "style" loader enables hot editing of CSS.
    (
    dev
      ? {
        test: /\.css$/,
        use: [
          'style-loader', {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          }, {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
              plugins: function() {
                return [
                  autoprefixer({
                    browsers: [
                      '>1%',
                      'last 4 versions',
                      'Firefox ESR',
                      'not ie < 9' // React doesn't support IE8 anyway
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
        fallback: 'style-loader',
        use: [
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          }, {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
              plugins: function() {
                return [
                  autoprefixer({
                    browsers: [
                      '>1%',
                      'last 4 versions',
                      'Firefox ESR',
                      'not ie < 9' // React doesn't support IE8 anyway
                    ]
                  })
                ];
              }
            }
          }
        ],
        ...extractTextPluginOptions
      })
    }
    )
  ],
  plugins: dev
    ? []
    : [
      new ExtractTextPlugin({
        filename: cssFilename
      })
    ]
});
