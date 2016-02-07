> The standalone version of Catalog is completely dependency-free. All you need to get started writing your styleguide is one HTML document.

To use Catalog, all you need is a HTML document which looks like this:

```code
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Catalog</title>
</head>
<body>
  <div id="catalog" />
  <script src="https://npmcdn.com/catalog/catalog.js"></script>
  <script>
    Catalog.render({
      title: 'Catalog',
      pages: [
        {
          path: '/',             // The path where the page can be accessed
          title: 'Introduction', // The page title
          src: 'docs/intro.md'   // Path to the Markdown document
        },
        {path: 'usage', title: 'Usage', src: 'docs/usage.md'},
        {path: 'example', title: 'Example', src: 'docs/example.md'}
      ]
    }, document.getElementById('catalog'));
  </script>
</body>
</html>
```

### Running Catalog on your local machine

Catalog doesn't need anything besides a single Javascript file. However, to run Catalog on your local machine, you will have to use some kind of server due to browser security restrictions (the browser won't be able to load the Markdown files from your local file system). If you don't have an existing server for your project, use something simple like this Python server.

```code
python -m SimpleHTTPServer
```

## Write documentation

Catalog lets you write documentation in [Markdown](http://daringfireball.net/projects/markdown/syntax), which “is intended to be as easy-to-read and easy-to-write as is feasible.” Have a look at the [source of this page](docs/usage.md) to see how such a document is typically structured.

In addition to regular Markdown, Catalog provides [**Specimens**](#/specimens) to embed rich examples like colors, rendered HTML content, typography definitions, videos, etc.

```code|lang-markdown
> Some lead text (a blockquote, optional)

Introductory text (optional)

## A Title

Some description.

### A subtitle

This is a code specimen:

```code
function identity(x) {
  return x;
}
```

## Another Title

And some more text.

```image
src: img/cat.jpg
```

```

