# Usage

## Initialization

To start Catalog, run the following code on an empty HTML page.

```specimen-code
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

```specimen-code
# Page title (an &lt;h1&gt;)

> Some lead text (a blockquote, optional)

Introductory text (optional)

## A Card (an &lt;h2&gt;)

A new Card is started as soon as an &lt;h2&gt; is encountered.

&#96;&#96;&#96;specimen-code
function identity(x) {
  return x;
}
&#96;&#96;&#96;

## Another Card

Some more text within this Card.

```

## Example Specimens

Choose either a background style or a render style (but not both), add options as needed. An example:

```specimen-code
&#96;&#96;&#96;bg-dark-pattern|run-script,fullbleed
&lt;a id="dark-button" class="button button--dark"&gt;Dark button&lt;/a&gt;
&lt;script&gt;
    var button = document.getElementById('dark-button');
    button.addEventListener('click', function(evt){
        evt.preventDefault();
        alert('Button clicked!');
    });
&lt;/script&gt;
&#96;&#96;&#96;
```

### Background styles

Use one of these styles to render a background that works with your component.

#### `bg-light-pattern` (default)

```bg-light-pattern
bg-light-pattern
```

#### `bg-dark-pattern`

```bg-dark-pattern
<span style="color:white">bg-dark-pattern</span>
```

#### `bg-plain`

```bg-plain
bg-plain
```

#### `bg-light`

```bg-light
bg-light
```

#### `bg-dark`

```bg-dark
<span style="color:white">bg-dark</span>
```

### Specimen styles

These styles are optimized for specific usecases.

#### `specimen-generic`

The default specimen.

#### `specimen-code`

```specimen-code
function() {
    return 'specimen-code';
}
```

#### `specimen-color`

```specimen-color
[
    {"name": "light-blue", "value": "#b0f6ff"},
    {"name": "dark-blue",  "value": "#2666a4"}
]
```

#### `specimen-icon`

```specimen-icon
specimen-icon (TODO)
```

#### `specimen-project`

See the [example](#/html-project) until more documentation is available

#### `specimen-type`

```specimen-type
specimen-type (TODO)
```

### Options

Any number of options can be passed to a background or specimen style after the pipe character:

`style|option1,option2,...`

* `run-script` – will run any scripts within the source
* `fullbleed` – removes any horizontal padding and uses the whole width available (TODO)
