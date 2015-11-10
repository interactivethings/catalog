
## Type specimen examples


The type specimen can be used to reflect various elements concerning typography. The most obvious use case is to represent the ratio and hierarchy of headings.



### Headings only

```type
[
    {
        "headings": [98,28,21,16,14,12],
        "font": "sans-serif",
        "color": "#00263e"
    }
]
```

```code|collapsed
&#96;&#96;&#96;type
[
    {
        "headings": [98,28,21,16,14,12],
        "font": "sans-serif",
        "color": "#00263e"
    }
]
&#96;&#96;&#96;
```

### Paragraph only

Another use case is to document the ratio between the font size and the line height for text bodies. 

```type
[
    {
        "paragraphs": ["18/28", "12/21"],
        "font": "sans-serif",
        "color": "#00263e"
    }
]
```


```code|collapsed
&#96;&#96;&#96;type
[
    {
        "paragraphs": ["18/28"],
        "font": "sans-serif",
        "color": "#00263e"
    }
]
&#96;&#96;&#96;
```

### Options

#### Arguments

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
- `weight: integer` defines the font weight


