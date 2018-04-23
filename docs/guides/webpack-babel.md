> For customized build setups, Catalog provides a [webpack](https://webpack.js.org/) loader and a [Babel](http://babeljs.io/) preset

This is for the adventurous who don't shy away from configuring webpack! Use this guide if you:

- have a custom webpack/Babel setup already
- need to use specific webpack loaders (e.g. for TypeScript) or Babel transforms

```hint|directive
You _don't_ need a custom setup if you're using Catalog on its own or in combination with [Create React App](https://github.com/facebookincubator/create-react-app) or [next.js](https://github.com/zeit/next.js). Use [Create Catalog](/installation/create-catalog) instead.
```

## `catalog.config.js`

If you use the Catalog command line scripts (`catalog start` and `catalog build`), you can add a `catalog.config.js` file to modify Catalog's generated webpack configuration. This is useful when you want to add another webpack loader or plugin.

Example `catalog.config.js`:

```code|lang-js
module.exports = {
  webpack: (catalogWebpackConfig, {paths, dev, framework}) => {
    // Modify catalogWebpackConfig ...
    return modifiedWebpackConfig;
  }
}
```

```hint|warning
# Warning

Modifying a webpack configuration is tricky! Only do this if you know what you're doing! We don't make any guarantees that the shape of Catalog's webpack configuration will stay stable, so it's probably a good idea to lock Catalog to an exact version in your `package.json` to prevent unexpected results when Catalog updates.
```

## Webpack loader

Catalog's webpack loader allows you to import Markdown files as pages.

Also install webpack's `raw-loader` with `npm install raw-loader --save-dev`

To get the full benefit of Catalog's webpack loader, enable [hot module replacement](https://webpack.js.org/guides/hot-module-replacement/) in your app.

```code|lang-javascript
{
  // Other webpack config ...
  module: {
    rules: [
      {
        test: /\.md$/,
        use: ['catalog/loader', 'raw-loader']
      }
    ]
  }
};
```

## Babel preset

Catalog's Babel preset ensures that JSX source code of [ReactSpecimens](/specimens/react) is preserved.

Add `catalog/babel` to your presets in `.babelrc`

```code|lang-javascript
{
  "presets": ["catalog/babel"]
}
```
