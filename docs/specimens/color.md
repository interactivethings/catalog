## Color

This specimen is configured with a JSON array as the content. 
Color codes can be copied to the clipboard by selecting the text.

### Examples

#### Color swatch

The color swatches are useful to document single or important colors like the main brand scheme.

```color
[
    {"name": "light-blue", "value": "#b0f6ff"}
]
```

```code|span-3,collapsed
&#96;&#96;&#96;color
[
    {"name": "light-blue", "value": "#b0f6ff"}
]
&#96;&#96;&#96;
```

```color
[
    {"name": "light-blue", "value": "#b0f6ff"},
    {"name": "dark-blue",  "value": "#2666a4"},
    {"name": "bright-red",  "value": "#ff5555"}
]
```

```code|span-3,collapsed
&#96;&#96;&#96;color
[
    {"name": "light-blue", "value": "#b0f6ff"},
    {"name": "dark-blue",  "value": "#2666a4"},
    {"name": "bright-red",  "value": "#ff5555"}
]
&#96;&#96;&#96;
```




#### Color palette

Color palettes can be used for sets that contain more colors. For example to document gradient steps or different color schemes.

```color|palette
[   
    {"name": "50", "value": "#e3f1fc"},
    {"name": "100", "value": "#c2d8ea"},
    {"name": "200", "value": "#a1c0d8"},
    {"name": "300", "value": "#80a8c6"}
]
```

```code|collapsed
&#96;&#96;&#96;color|palette
[
    {"name": "50", "value": "#e3f1fc"},
    {"name": "100", "value": "#c2d8ea"},
    {"name": "200", "value": "#a1c0d8"},
    {"name": "300", "value": "#80a8c6"}
]
&#96;&#96;&#96;
```

```color|palette-horizontal
[   
    {"name": "50", "value": "#e3f1fc"},
    {"name": "100", "value": "#c2d8ea"},
    {"name": "200", "value": "#a1c0d8"},
    {"name": "300", "value": "#80a8c6"}
]
```

```code|collapsed
&#96;&#96;&#96;color|palette-horizontal
[
    {"name": "50", "value": "#e3f1fc"},
    {"name": "100", "value": "#c2d8ea"},
    {"name": "200", "value": "#a1c0d8"},
    {"name": "300", "value": "#80a8c6"}
]
&#96;&#96;&#96;
```



### Options

- `palette` generates a list of the colors.
- `palette-horizontal` generates a horizontal list
- `span-[1-6]` defines the width of the palette
