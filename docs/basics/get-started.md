To get started with Catalog, you can either use the **standalone version** or the **npm module**.

## Standalone

> The standalone version of Catalog is completely free from dependencies. All you need to get started is a single HTML document.

```code
lang: html
---
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>My Catalog</title>
</head>
<body>
  <div id="catalog" />
  <script src="https://interactivethings.github.io/catalog/catalog.min.js"></script>
  <script>
    Catalog.render({
      title: 'My Catalog',
      pages: [
        {
          path: '/',             // The path where the page can be accessed
          title: 'Introduction', // The page title
          src: 'docs/intro.md'   // Path to the Markdown document
        },
        // Other pages …
      ]
    }, document.getElementById('catalog'));
  </script>
</body>
</html>
```

### Running Catalog on your local machine

Catalog doesn't need anything besides a single Javascript file. However, to run Catalog on your local machine, you will have to use some kind of server due to browser security restrictions (the browser won't be able to load the Markdown files from your local file system).

If you don't have an existing server for your project, use something simple like this Python server (on OS X).

```code
python -m SimpleHTTPServer
```

## npm

> The npm module of Catalog can be integrated into your React application, so you can develop your components directly in your styleguide.

### Installation

```
npm install catalog react react-dom --save
```

### Usage

```code|lang-jsx
import {render} from 'catalog';

render({
  title: 'My Catalog',
  pages: [
    {
      path: '/',                               // The path where the page can be accessed
      title: 'Introduction',                   // The page title
      component: require('docs/intro.md')   // Path to the Markdown document
    },
    // Other pages …
  ]
}, document.getElementById('app'));
```

### Webpack Loader

Catalog provides a loader which allows you to import hot-reloadable Markdown files.

```code|lang-javascript
{
  // Other webpack config ...
  module: {
    loaders: [
      {
        test: /\.md$/,
        loaders: ['catalog/lib/loader', 'raw']
      }
    ]
  }
};

```
