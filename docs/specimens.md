> Specimens are the core of Catalog: they help you present your content.

## Overview

Specimens are defined as Markdown code blocks with an argument string. Here is an example, with the argument string highlighted in **bold**.

```code
&#96;&#96;&#96;<strong>html|dark,run-script</strong>
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

The format of the code block argument string is as follows: `specimen-type|option1,option2`. Note that no spaces are allowed.

The first part – the one before the `|`-character – is the specimen type. The available types are described below. The second part after the `|` is a list of comma-separated options for the specimen. This second part is optional, so both of the following are valid argument strings: `html` and `html|dark`.

## HTML

The default specimen if no argument string is specified.

### Options

* `light` – a light checkered background (default)
* `dark` – a dark checkered background
* `plain` – a transparent background without any padding. If combined with `light` or `dark`, the checker pattern is removed
* `no-source` – Removes the source code toggle button
* `run-script` – will run any scripts within the source

### Examples

#### `html|light`

```html|no-source
html
```

#### `html|dark`

```html|dark,no-source
<span style="color:white">html|dark</span>
```

#### `html|plain`

```html|plain,no-source
html|plain
```

#### `html|plain,light`

```html|plain,light,no-source
html|plain,light
```

#### `html|plain,dark`

```html|plain,dark,no-source
<span style="color:white">html|plain,dark</span>
```

#### `html|plain,run-script`

This is a running code example:

```html|plain,run-script
<div id="example-target">FAILED: Javascript was not run</div>
<script>
    var target = document.getElementById('example-target')
    target.innerHTML = window.exampleValue + ' inserted by Javascript';
</script>
```

## Code

To show code snippets.

### Options

None.

### Examples

#### `code`

```code
function() {
    return 'code';
}
```

## Color

### Configuration

This specimen is configured with a JSON array as the content.

```code
&#96;&#96;&#96;color
[
    {"name": "light-blue", "value": "#b0f6ff"},
    {"name": "dark-blue",  "value": "#2666a4"}
]
&#96;&#96;&#96;
```

### Options

None.

### Examples

#### `color`

```color
[
    {"name": "light-blue", "value": "#b0f6ff"},
    {"name": "dark-blue",  "value": "#2666a4"}
]
```

## Icon

### Configuration

This specimen is configured with a JSON object or array as the content. In the most simple form, it looks like this:

```code
&#96;&#96;&#96;icon
{"image": "docs/assets/icons/brush-4x.png"}
&#96;&#96;&#96;
```

The following JSON configuration options are available. Only `image` is required.

* `image` – the path to a raster or SVG image (required)
* `size` – an object with `height` and `width` values that the image should be displayed in
* `title` – the image's title
* `attributes` – An array of strings that will be displayed as lines
* `link[s]` – a string or array of links
* `background` – The background of the icon. Can be a string ("plain", "light", "dark") or an array ["plain", "light"].

```code
&#96;&#96;&#96;icon
[
    {
        "image": "docs/assets/icons/brush-4x.png",
        "size": {"height": 32, "width": 32},
        "title": "Brush icon",
        "attributes": [
            "Descriptive text 1",
            "Descriptive text 2"
        ],
        "link": "http://example.com",
        "background": "dark"
    }
]
&#96;&#96;&#96;
```

### Examples

#### `icon` without any details

```icon
{"image": "docs/assets/icons/brush-4x.png"}
```

#### `icon`s with options

It's recommended to not mix too many icon sizes, as this will lead to a nervous grid, but it is possible. Note that when an image doesn't have any additional information like title or attributes, no text-box is created.

```icon
[
    {
        "image": "docs/assets/icons/brush-4x.png",
        "size": {"height": 32, "width": 32},
        "title": "Default"
    },
    {
        "image": "docs/assets/icons/brush.svg",
        "size": {"height": 32, "width": 32},
        "background": "plain",
        "title": "Plain background",
        "attributes": [
            "No padding is added on the sides"
        ]
    },
    {
        "image": "docs/assets/icons/brush-4x.png",
        "size": {"height": 32, "width": 32},
        "background": ["plain", "dark"],
        "title": "Plain dark background"
    },
    {
        "image": "docs/assets/icons/brush-8x.png",
        "size": {"height": 64, "width": 64},
        "title": "Brush icon (large)",
        "attributes": [
            "Dark checkerboard background and large icon",
            "An additional line of text"
        ],
        "link": "http://example.com",
        "background": "dark"
    },
    {
        "image": "docs/assets/icons/brush-4x.png",
        "size": {"height": 32, "width": 180},
        "title": "Brush icon (stretched)",
        "align": "vertical"
    },
    {
        "image": "docs/assets/icons/brush.svg",
        "size": {"height": 32, "width": 32},
        "title": "Brush icon (SVG)",
        "align": "vertical"
    },
    {
        "image": "docs/assets/icons/brush-8x.png",
        "size": {"height": 64, "width": 64}
    },
    {
        "image": "docs/assets/icons/brush-8x.png",
        "size": {"height": 64, "width": 64}
    }
]
```


## Project

See the [example](#/html-project) until more documentation is available

## Type

Not implemented yet.

### Examples

#### `type`

```type
type (TODO)
```

## UISpec

Describe UI specifications with images and metadata.

### Examples

#### `uispec`

```uispec
[
    {
        "title": "Active Filter Press State",
        "image": "docs/html-project-example/dynabook.png",
        "attributes": [
            "Fill Color: #FFFFFF, rounded corners 4px",
            "Divider Line: 1px, #DFDFDF"
        ],
        "link": "http://example.com"
    },
    {
        "image": "docs/html-project-example/dynabook.png",
        "attributes": [],
        "link": "http://example.com"
    },
    {
        "title": "Active Filter Press State",
        "attributes": [
            "Fill Color: #FFFFFF, rounded corners 4px"
        ],
        "link": "http://example.com"
    },
    {
        "title": "Active Filter Press State",
        "image": "docs/html-project-example/dynabook.png",
        "span": 2
    },
    {
        "title": "Active Filter Press State",
        "image": "docs/html-project-example/dynabook.png",
        "overlay": "docs/html-project-example/dynabook-overlay.png",
        "attributes": [
            "Fill Color: #FFFFFF, rounded corners 4px",
            "Divider Line: 1px, #DFDFDF",
            "Divider Line: 1px, #DFDFDF",
            "Divider Line: 1px, #DFDFDF",
            "Divider Line: 1px, #DFDFDF"
        ],
        "links": ["http://example.com", "http://example.com/bla"]
    }
]
```

