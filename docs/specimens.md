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
* `span-[1-6]` – defines the width

### Examples

#### `html|no-source,light`

```html|no-source,light
html|no-source,light
```

#### `html|no-source,dark`

```html|no-source,dark
<span style="color:white">html|no-source,dark</span>
```

#### `html|no-source,plain`

```html|no-source,plain
html|no-source,plain
```

#### `html|no-source,plain,light`

```html|no-source,plain,light
html|no-source,plain,light
```

#### `html|no-source,plain,dark`

```html|no-source,plain,dark
<span style="color:white">html|no-source,plain,dark</span>
```

#### `html|no-source,span-{number}`

```html|no-source,span-1

```
```html|no-source,span-2

```
```html|no-source,span-3

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

- `span-[1-6]` defines the width

### Examples

#### `code|span-3`

```code|span-3
handleClick() {
	console.log('clicked');
}
```

```code|span-3
.Button {
	background: $primary;
}
```

## Color

### Configuration

This specimen is configured with a JSON array as the content. 
The color codes in the palette can be copied to the clipboard by selecting the text.

```code
&#96;&#96;&#96;color
[
    {"name": "light-blue", "value": "#b0f6ff"},
    {"name": "dark-blue",  "value": "#2666a4"}
]
&#96;&#96;&#96;
```

### Options

- `palette` generates a list of the colors.
- `palette-horizontal` generates a horizontal list
- `span-[1-6]` defines the width of the palette

### Examples

#### `color`

```color
[
    {"name": "light-blue", "value": "#b0f6ff"},
    {"name": "dark-blue",  "value": "#2666a4"},
    {"name": "bright-red",  "value": "#ff5555"}
]
```

#### `color|palette,span-3`

```color|palette,span-3
[	
	{"name": "50", "value": "#e3f1fc"},
	{"name": "100", "value": "#c2d8ea"},
	{"name": "200", "value": "#a1c0d8"},
	{"name": "300", "value": "#80a8c6"}
]
```

```color|palette,span-3
[	
	{"name": "White", "value": "#ffffff"},
	{"name": "Snow White", "value": "#f9f9f9"},
	{"name": "Bright White", "value": "#f2f2f2"},
	{"name": "Smoke White", "value": "#ebebeb"}
]
```




## Project

Take a look at the [example](#/html-project) until more documentation is available.


## Hint

Can be used to highlight important aspects.

### Options
#### Arguments

- `directive` good for _dos_
- `warning` good for _don'ts_

### Example

```hint
Make sure to use <pre>text-rendering: optimizeLegibility;</pre>on fonts over 36px, as well as <pre>-webkit-font-smoothing: antialiased;</pre> and <pre>-moz-osx-font-smoothing: grayscale;</pre> on dark backgrounds.
```

```code
&#96;&#96;&#96;hint
Make sure to use <pre>text-rendering: optimizeLegibility;</pre>on fonts over 36px, as well as <pre>-webkit-font-smoothing: antialiased;</pre> and <pre>-moz-osx-font-smoothing: grayscale;</pre> on dark backgrounds.
&#96;&#96;&#96;
```

```hint|directive
Make it so!
```

```code
&#96;&#96;&#96;hint|directive
Make it so!
&#96;&#96;&#96;
```

```hint|warning
No <strong>stairway</strong>
```

```code
&#96;&#96;&#96;hint|warning
No <strong>stairway</strong>;
&#96;&#96;&#96;
```


## Type

```code|span-3
&#96;&#96;&#96;type
[
	{
		"headings": [98,28,21,16,14,12],
		"paragraph": {"size": 18, "line": 28}
	}
]
&#96;&#96;&#96;
```


```code|span-3
&#96;&#96;&#96;type|<strong>em</strong>
[
	{
		"headings": [3.052, 2.441, 1.953, 1.563, 1.25, 1],
		"paragraph": {"size": 1, "line": 1.25}
	}
]
&#96;&#96;&#96;
```

### Options

#### Arguments

- `em` sets the font size and line height using em. Otherwise px is used
- `kern` activates browser kerning and ligature use
- `smoothing` applies browser text antialising
- `kafka` Mighty morphin' Samsa fill text
- `single` Uses single word for headline

#### Keys

- `headings: array` takes an array and generates a list headings
- `paragraph: array` builds a paragraph and takes [font size, line height]
- `background: string` defines the background color, takes hex code or color name
- `image: string` defines the background image
- `color: string` defines the font color, takes hex code or color name
- `tracking: integer` defines tracking respectively letter-spacing
- `italic: boolean` defines if italic cut is used
- `weight: integer` defines the font weight


### Examples

#### `type|kern,smoothen,kafka`  and on the right  `type|span-2,kern,smoothen,shorter,single`


```type|kern,smoothen,kafka,span-4
[
	{
		"headings": [56,38,28,21,16,14],
		"paragraphs": ["18/28"],
		"font": "sans-serif",
		"color": "#00263e"
	}
]
```

```type|span-2,kern,smoothen,shorter,single
[
	{
		"paragraphs": ["14/24"],
		"background": "#ff5555",
		"color": "#801a1a",
		"font": "sans-serif"
	},
	{
		"headings": [42],
		"image": "docs/html-project-example/gradient.png",
		"color": "#fff",
		"font": "sans-serif",
		"weight": 600,
		"tracking": -3
	},
	{
		"paragraphs": ["14/18"],
		"background": "#00263e",
		"color": "#a1c0d8",
		"font": "sans-serif"
	},
	{
		"paragraphs": ["12/18"],
		"background": "#111",
		"color": "#aaa",
		"font": "sans-serif",
		"weight": 600
	}
]
```



## Image

A flexible image specimen

#### Arguments

- `span` Defines the width, default value is `span-2`

#### Keys

- `title: string` the title 
- `src: string` image to display (gets scaled if it extends the container) 
- `overlay: string` image for mouseover, useful to describe proportions
- `attributes: array` text description; each entry is a new line 
- `link: string` a link 
- `span: integer` can be used for nesting

```image
[
    {
        "title": "Simple image",
        "src": "docs/html-project-example/catalog_logo.png"
    },
    {   
        "title": "Image with overlay",
        "src": "docs/html-project-example/catalog_logo.png",
        "overlay": "docs/html-project-example/catalog_logo-overlay.png",
        "attributes": [
            "and a description"
        ]
    },
    {
        "title": "Image with overlay",
        "src": "docs/html-project-example/catalog_logo.png",
        "overlay": "docs/html-project-example/catalog_logo-overlay.png",
        "attributes": [
            "a description,",
            "and a link:"
        ],
        "link": "http://interactivethings.github.io/catalog/"
    }
]
```


```image
[   
    {
        "background": ["light"],
        "src": "docs/html-project-example/catalog_logo.png",
        "attributes": ["light"]
    },
    {
        "background": ["plain","dark"],
        "src": "docs/html-project-example/catalog_logo--white.png",
        "attributes": ["plain dark"]
    },
    {
        "background": ["dark"],
        "src": "docs/html-project-example/catalog_logo--white.png",
        "attributes": ["dark"]
    }
]
```


## Audio

- `autoplay: boolean` ... 
- `loop: boolean ` ...
- `span: number ` ...
- `src: string ` ...


```audio
[   
    {
        "src": "docs/html-project-example/sound.mp3"
    }
]
```

## Button 

```button|span-1
{
    "title": "Sad trombone",
    "url": "docs/html-project-example/sound.mp3"
}
```




## Video

A video element

#### Keys

- `autoplay: boolean` ... 
- `loop: boolean ` ...
- `muted: boolean ` ...
- `span: number ` ...
- `src: string ` ...



```video
[   
    {
        "src": "http://www.w3schools.com/html/mov_bbb.mp4",
        "span": "3"
    }
]
```



## Download

### Examples

#### `download|span-2`

```download|span-2
{
    "title": "Catalog Logo (.svg)",
    "filename": "catalog-logo",
    "subtitle": "8 KB",
    "url": "docs/assets/catalog_logo.svg"
}
```
