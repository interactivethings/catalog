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
      // "url" loader embeds assets smaller than specified size as data URLs to avoid requests.
      // Otherwise, it acts like the "file" loader.
    {
      exclude: [
        /\.html$/,
        /\.(js|jsx)$/,
        /\.css$/,
        /\.json$/,
        /\.svg$/,
        /\.md$/
      ],
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
        presets: [require.resolve('babel-preset-react-app')],
        // TODO check if this is an issue when this plugin is already included
        plugins: [require.resolve('babel-plugin-syntax-dynamic-import')],
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
    ),
      // "file" loader for svg
    {
      test: /\.svg$/,
      loader: 'file-loader',
      options: {
        name: 'static/media/[name].[hash:8].[ext]'
      }
    }
      // ** STOP ** Are you adding a new loader?
      // Remember to add the new extension(s) to the "url" loader exclusion list.
  ],
  plugins: dev
    ? []
    : [
      new ExtractTextPlugin({
        filename: cssFilename
      })
    ]
});
