> Specimens are the core of Catalog: they help you present your content.

### Basic usage

Specimens are defined as Markdown code blocks with an argument string.

```code
'''html|dark
Content goes here...
'''
```

The format of the code block argument string is as follows: `specimen-type|option1,option2`. 
_Note that no spaces are allowed._

The first part – the one before the `|`-character – is the specimen __type__. The available types are described below. The second part after the `|` is a list of comma-separated __options__ for the specimen. This second part is optional, so both of the following are valid argument strings: `html` and `html|dark`.

### Documentation conventions

The documentation displays options in a list, using the following pattern:

- __`argument: type`__ Argument is the name, and type defines the expected type.
- __`src: string`__ Bold arguments/keys indicate that they are required to be defined
- `loop: boolean` while regular ones are always optional.



### These specimen are available to use out of the box:


## HTML

The HTML specimen can be used to render HTML snippets. For an overview of all available options, see the [HTML specimen documentation page](#/html).

```html|no-source
hello world
```


## Code

The code specimen is intended to display source code, either as block or collapsed drawer.
See the [documentation](#/code) to learn about the options.

```code
'''code
let {foo, bar} = baz;
'''
```


## Color

The color specimen can be used to document colors ranging from a single swatch to more complex palettes and palette columns. All options are described [here](#/color).

```color|palette-horizontal
[   
    {"value": "#e3f1fc"},
    {"value": "#c2d8ea"},
    {"value": "#a1c0d8"},
    {"value": "#80a8c6"}
]
```


## Project

This specimen allows the documentation of cohering documents and offers the possibility to offer the files in one .zip file.
To learn more, take a look at the [documentation](#/project) which covers different use cases.

If you only need to display a single HTML document or make a file available for download, keep in mind that there are also the [html](#/html) and [download](#/download) specimen which cover these cases with less overhead.


## Hint

```hint
This specimen can be used to highlight important aspects.
```

More options are documented [here](#/hint).



## Type

The type specimen can be used to document various typographic characteristics. 
Please see the specimen [documentation](#/type) for an overview of all options.

```type|span-4,kern,smoothen,shorter
[
    {
        "headings": [98,28,21,16,14,12],
        "color": "#333",
        "background": "#fff",
        "font": "sans-serif",
        "weight": 600,
        "tracking": "-0.05em"
    }
]
```
```type|span-2,kern,smoothen,kafka
[
    {
        "paragraphs": ["16/21"],
        "background": "#fff",
        "color": "#333",
        "font": "serif"
    }
]
```



## Media

### Image

A responsive image specimen.
Take a look at the [documentation](#/image) for more information.

```image
[
    {   
        "src": "docs/assets/catalog_logo.png",
        "overlay": "docs/assets/catalog_logo-overlay.png",
        "background": "plain light",
        "span": 6
    }
]
```


### Video

Allows embedding video files. See the available [options](#/video).


### Audio

A simple Audio player. See the available [options](#/audio).



## Download

Download one or more assets with the [download](#/download) specimen.
