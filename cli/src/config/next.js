// @flow

export default (paths: Object, useBabelrc: boolean, dev: boolean) => ({
  moduleRules: [
    // Disable require.ensure as it's not a standard language feature.
    {parser: {requireEnsure: false}},

    // Process JS with Babel.
    {
      test: /\.(js|jsx)$/,
      include: paths.appRoot,
      exclude: /node_modules/,
      loader: require.resolve('babel-loader'),
      options: {
        babelrc: useBabelrc,
        presets: useBabelrc ? [] : [require.resolve('next/babel'), require.resolve('../../../babel')],
        // TODO check if this is an issue when this plugin is already included
        plugins: useBabelrc ? [] : [require.resolve('babel-plugin-syntax-dynamic-import')],
        cacheDirectory: true
      }
    }
  ],
  plugins: []
});
