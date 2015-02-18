# Usage

## Initialization

To start Catalog, run the following code on an empty HTML page.

```code
&lt;script src="catalog.js"&gt;&lt;/script&gt;
&lt;script&gt;
  Catalog.start('body', {
    title: "Catalog",
    styles: ["path/to/global-styles.css"],  // Global styles (optional)
    scripts: ["path/to/global-scripts.js"], // Global scripts (optional)
    pages: [
      {
        name: 'intro',                              // A unique identifier for this page
        path: '/',                                  // This page's path (optional)
        title: "Introduction",
        src: "docs/intro.md",                       // Path to the Markdown sourcefile
        styles: ["path/to/intro-only-styles.css"],  // Page-specific styles (optional)
        scripts: ["path/to/intro-only-scripts.css"] // Page-specific scripts (optional)
      },
      {name: 'usage', title: "Usage", src: "docs/usage.md"},
      {name: 'example', title: "Example", src: "docs/example.md"}
    ]
  });
&lt;/script&gt;
```

## Write documentation

Catalog lets you write documentation in [Markdown](http://daringfireball.net/projects/markdown/syntax), which “is intended to be as easy-to-read and easy-to-write as is feasible.” Have a look at the [source of this page](docs/usage.md) to see how such a document is typically structured.

To make sure that Catalog displays what you want, you need to follow some simple conventions that are shown in the following example document. Catalog uses _Card_ as the metaphor for document sections and _Specimen_ to describe different kinds of examples.

```code
# Page title (an &lt;h1&gt;)

> Some lead text (a blockquote, optional)

Introductory text (optional)

## A Card (an &lt;h2&gt;)

A new Card is started as soon as an &lt;h2&gt; is encountered.

&#96;&#96;&#96;code
function identity(x) {
  return x;
}
&#96;&#96;&#96;

## Another Card

Some text within this Card, followed by a horizontal ruler.

---

And some more text.

```

## Specimens

Catalog provides a wide variety of specimens. See the [Specimen documentation](#/specimens) for more
