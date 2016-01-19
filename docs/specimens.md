> Specimens are the core of Catalog: they help you present your content.

### Using Specimens

Specimens are defined as Markdown code blocks with an option string.

```code
'''html|dark
Content goes here...
'''
```

The format of the code block option string is as follows: `specimen-type|option1,option2`. 
_Note that no spaces are allowed._

### Specimen Type

The first part – the one before the `|`-character – is the specimen __type__. The available types are described below.

For example:

```code
'''image
...
'''
```

### Specimen Options

The second part after the `|` is a list of comma-separated __options__ for the specimen. This second part is optional, so both of the following are valid option strings: `html` and `html|dark`.

For example:

```code
'''code|lang-jsx,span-3
...
'''
```

### Specimen Content

The content is what is written between the opening and closing triple-backticks ` ``` `. There are two types of content:

#### Strings

The [HTML](#/html), [Code](#/code), and [Hint](#/hint) specimens take a simple string as content which will be rendered according to the specimen type.

For example:

```code
'''html
<p>Some HTML</p>
'''
```

#### Properties

Other specimens (like [Color](#/color)) take structured content as input which is defined by __properties__. This content can be written in YAML or JSON syntax.

For example:

```code
'''color
name: Red
value: #f00
'''
```

#### Documentation conventions

The documentation displays options in a list, using the following pattern:

- __`option: type`__ Option is the name, and type defines the expected type.
- __`src: string`__ Bold options/properties indicate that they are required to be defined
- `loop: boolean` while regular ones are always optional.



## Specimen Types


### HTML

The HTML specimen can be used to render HTML snippets. For an overview of all available options, see the [HTML specimen documentation page](#/html).

```html|no-source
hello world
```


### Code

The code specimen is intended to display source code, either as block or collapsed drawer.
See the [documentation](#/code) to learn about the options.

```code
'''code
let {foo, bar} = baz;
'''
```


### Color

The color specimen can be used to document colors ranging from a single swatch to more complex palettes and palette columns. All options are described [here](#/color).

```color-palette|horizontal
colors: [
    {"value": "#e3f1fc"},
    {"value": "#c2d8ea"},
    {"value": "#a1c0d8"},
    {"value": "#80a8c6"}
]
```

### Hint

```hint
This specimen can be used to highlight important aspects.
```

More options are documented [here](#/hint).


### Type

The type specimen can be used to document various typographic characteristics. 
Please see the specimen [documentation](#/type) for an overview of all options.

```type|span-4,kern,smoothen,shorter
{
    "headings": [98,28,21,16,14,12],
    "color": "#333",
    "background": "#fff",
    "font": "sans-serif",
    "weight": 600,
    "tracking": "-0.05em"
}
```

```type|span-2,kern,smoothen,kafka
{
    "paragraphs": ["16/21"],
    "background": "#fff",
    "color": "#333",
    "font": "serif"
}
```



### Media

#### Image

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


#### Video

Allows embedding video files. See the available [options](#/video).


#### Audio

A simple Audio player. See the available [options](#/audio).



### Download

Download one or more assets with the [download](#/download) specimen.
