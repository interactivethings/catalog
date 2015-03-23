# Specimens

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

Not implemented yet.

### Examples

#### `icon`

```icon
icon (TODO)
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
        "attributes": [
            "Fill Color: #FFFFFF, rounded corners 4px",
            "Divider Line: 1px, #DFDFDF"
        ],
        "link": "http://example.com"
        "span": 2
    },
    {
        "title": "Active Filter Press State",
        "image": "docs/html-project-example/dynabook.png",
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

