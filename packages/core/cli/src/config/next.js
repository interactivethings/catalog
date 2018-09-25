// @flow

export default (paths: Object, useBabelrc: boolean, dev: boolean) => ({
  moduleRules: [
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
        plugins: useBabelrc
          ? []
          : [
              require.resolve("babel-plugin-react-require"),
              require.resolve("styled-jsx/babel")
            ],
        cacheDirectory: true
      }
    }
  ],
  plugins: []
});
