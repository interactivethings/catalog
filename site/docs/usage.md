## Getting Started

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
  <script src="catalog.js"></script>
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

To make sure that Catalog displays what you want, you need to follow some simple conventions that are shown in the following example document. Catalog uses **Card** as the metaphor for document sections and **Specimen** to describe different kinds of examples.

```code
> Some lead text (a blockquote, optional)

Introductory text (optional)

## A Card (an <h2>)

A new Card is started as soon as an <h2> is encountered.

This is a code specimen:

'''code
function identity(x) {
  return x;
}
'''

## Another Card

And some more text.

```

## Specimens

Catalog provides a wide variety of specimens. See the [Specimen documentation](#/specimens) for more
