# Usage

## Initialization

To start Catalog, run the following code on an empty HTML page.

```specimen-code
&lt;script src="catalog.js"&gt;&lt;/script&gt;
&lt;script&gt;
  Catalog({
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
    ],
    iframe: false // Experimental
  });
&lt;/script&gt;
```

## Markdown

Catalog uses Markdown together with some conventions to parse and display the documentation. Currently, it's easiest to look at the source Markdown files to understand how to structure your documents.

The most important conventions is that `h2`s will start new cards.

## Example blocks

Choose either a background style or a render style (but not both), add options as if needed. An example:

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
