> The standalone version of Catalog doesn't need any installation and can be used directly in the browser.

If using [Create Catalog](/installation/create-catalog) is not an option (maybe because you don't have/want Node.js on your computer), you can also embed Catalog with a `<script>` tag. Be aware that you still need a [web server](#running-catalog-standalone-on-your-local-machine) for local development.

## Installation

Catalog Standalone is distributed on [unpkg](https://unpkg.com/catalog/) and [jsdelivr](https://www.jsdelivr.com/package/npm/catalog). Embed or download Catalog from here:

**unpkg**

* [Development version](https://unpkg.com/catalog@3/dist/catalog-standalone.development.js)
* [Optimized production version](https://unpkg.com/catalog@3/dist/catalog-standalone.min.js)

**jsdelivr**

* [Development version](https://cdn.jsdelivr.net/npm/catalog@3/dist/catalog-standalone.development.js)
* [Optimized production version](https://cdn.jsdelivr.net/npm/catalog@3/dist/catalog-standalone.min.js)

## Usage

Example HTML page which embeds Catalog from unpkg.

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

  <!-- To use the React Specimen you need Babel Standalone -->
  <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>

  <!-- Use the development version to get helpful errors in your console -->
  <!-- <script src="https://unpkg.com/catalog@3/dist/catalog-standalone.development.js"></script> -->

  <!-- Use the minified production version to get optimal performance -->
  <script src="https://unpkg.com/catalog@3/dist/catalog-standalone.min.js"></script>

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

## Running Catalog Standalone on your local machine

Catalog doesn't need anything besides a single Javascript file. However, to run Catalog on your local machine, you will have to use some kind of web server due to browser security restrictions (the browser won't be able to load the Markdown files from your local file system).

### On macOS

macOS comes preinstalled with python, which conveniently has a web server built-in. Run this in your terminal:

```code
python -m SimpleHTTPServer
```

### On Windows

Use [xampp](https://www.apachefriends.org/de/index.html) or something similar.
