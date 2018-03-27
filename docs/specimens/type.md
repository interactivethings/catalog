> The type specimen can be used to reflect various elements concerning typography. The values can be assigned with mixed units — if none is specified, `px` is used.

### Props

- `headings: array` takes an array and generates a list headings
- `paragraph: array` builds a paragraph and takes [font size, line height]
- `background: string` defines the background color, takes hex code or color name
- `image: string` defines the background image
- `color: string` defines the font color, takes hex code or color name
- `tracking: integer` defines tracking respectively letter-spacing
- `style: string` can be italic or oblique, default is "normal" 
- `weight: integer` defines the font weight
- `kern: boolean` activates browser kerning and ligature use
- `smoothing: boolean` applies browser text antialising
- `kafka: boolean` Mighty morphin' Samsa fill text
- `single: boolean` Uses a single word for headline
- `span: number[1–6]` width of the specimen


### Examples

#### Headings only

The most obvious use case is to represent the ratio and hierarchy of headings.

```type
{
  "headings": [98,28,21,16,14,12],
  "font": "sans-serif",
  "color": "#00263e"
}
```

````code|lang-javascript
```type
{
  "headings": [98,28,21,16,14,12],
  "font": "sans-serif",
  "color": "#00263e"
}
```
````

#### Paragraph only

Another use case is to document the ratio between the font size and the line height for text bodies. 

```type
{
  "paragraphs": ["18/28", "12/21"],
  "font": "sans-serif",
  "color": "#00263e"
}
```


````code|lang-javascript
```type
{
  "paragraphs": ["18/28"],
  "font": "sans-serif",
  "color": "#00263e"
}
```
````


#### Combining different styles

```type|span-3,kern,smoothen,single
{
    "headings": [42],
    "background": "#ff5555",
    "color": "#fff",
    "font": "sans-serif",
    "weight": 600,
    "tracking": -3
}
```

````code|lang-javascript,span-3
```type|span-3,kern,smoothen,single
{
    "headings": [42],
    "background": "#ff5555",
    "color": "#fff",
    "font": "sans-serif",
    "weight": 600,
    "tracking": -3
}
```
````

```type|span-3,kern,smoothen,single
{
    "paragraphs": ["14/24"],
    "image": "/assets/gradient.png",
    "color": "#fff",
    "font": "sans-serif"
}
```

````code|lang-javascript,span-3
```type|span-3,kern,smoothen,single
{
    "paragraphs": ["14/24"],
    "image": "/assets/gradient.png",
    "color": "#fff",
    "font": "sans-serif"
}
```
````

```type|span-3,kern,smoothen,single
{
    "headings": [42],
    "background": "#00263e",
    "color": "#a1c0d8",
    "font": "sans-serif",
    "tracking": 10,
    "weight": 100
}
```

````code|lang-javascript,span-3
```type|span-3,kern,smoothen,single
{
    "headings": [42],
    "background": "#00263e",
    "color": "#a1c0d8",
    "font": "sans-serif",
    "tracking": 10,
    "weight": 100
}
```
````

#### Customize labels

```type
{  
  "span": 3,
  "color": "#00263e",
  "font": "sans-serif",
  "headings": [
    { "label": "Headline 1", "value": 49 },
	{ "label": "Headline 2", "value": 38 }
  ],
  "paragraphs": [
  	{ "label": "Body Copy", "value": "15/22.5" }
  ]
}
```

````code|lang-javascript,span-3
```type
{
  "color": "#00263e",
  "font": "sans-serif",
  "headings": [
    { "label": "Headline 1", "value": 49 },
	{ "label": "Headline 2", "value": 38 }
  ],
  "paragraphs": [
    { "label": "Body Copy", "value": "15/22.5" }
  ]
}
```
````

#### Specifying contrasts

with the help of the [hint specimen](/#/hint).


```type|span-4,kern,smoothen
{
    "headings": [42],
    "background": "#f5f5f5",
    "color": "#efefef",
    "font": "sans-serif"
}
```

```hint|span-2,warning
Does not pass any tests.
```

```type|span-4,kern,smoothen

{
    "headings": [42],
    "background": "#f5f5f5",
    "color": "#888",
    "font": "sans-serif"
}

```

```hint|span-2,directive
Passes Level **AA** for large text
```


```type|span-4,kern,smoothen,shorter
{
    "headings": [42],
    "paragraphs": ["14/24"],
    "background": "#f5f5f5",
    "color": "#333",
    "font": "sans-serif"
}
```

```hint|span-2,directive
Passes Level **AAA** even for small text
```


````code|lang-javascript,collapsed
```type|span-4,kern,smoothen
[
    {
        "headings": [42],
        "background": "#f5f5f5",
        "color": "#efefef",
        "font": "sans-serif"
    }
]
```

```hint|span-2,warning
Does not pass any tests.
```

```type|span-4,kern,smoothen
[
    {
        "headings": [42],
        "background": "#f5f5f5",
        "color": "#888",
        "font": "sans-serif"
    }
]
```

```hint|span-2,directive
Passes Level **AA** for large text
```


```type|span-4,kern,smoothen,shorter
[
    {
        "headings": [42],
        "paragraphs": ["14/24"],
        "background": "#f5f5f5",
        "color": "#333",
        "font": "sans-serif"
    }
]
```

```hint|span-2,directive
Passes Level **AAA** even for small text
```
````
