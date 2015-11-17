## Color

This specimen is configured with a JSON array as the content. 

Name is optional.

### Keys

- __`value: string`__ defines the color
- `name: string` defines the color name

### Arguments

- `palette` generates a list of the colors.
- `palette-horizontal` generates a horizontal list
- `span-[1-6]` defines the width of the palette


### Examples

#### Color swatch

The color swatches are useful to document single or important colors like the main brand scheme.

```color
[
    {"name": "light-blue", "value": "#b0f6ff"},
    {"name": "dark-blue",  "value": "#2666a4"},
    {"name": "bright-red",  "value": "#ff5555"}
]
```

```code
'''color
[
    {"name": "light-blue", "value": "#b0f6ff"},
    {"name": "dark-blue",  "value": "#2666a4"},
    {"name": "bright-red",  "value": "#ff5555"}
]
'''
```




#### Color palette

Color palettes can be used for sets that contain more colors. For example to document gradient steps or  color schemes.

```color|palette
[   
    {"value": "#e3f1fc"},
    {"value": "#c2d8ea"},
    {"value": "#a1c0d8"},
    {"value": "#80a8c6"}
]
```

```code
'''color|palette
[
    {"value": "#e3f1fc"},
    {"value": "#c2d8ea"},
    {"value": "#a1c0d8"},
    {"value": "#80a8c6"}
]
'''
```

#### Horizontal color palette

displaying a diverging color scale


```color|palette-horizontal
[   
    {"value":"#543005"},
    {"value":"#8c510a"},
    {"value":"#bf812d"},
    {"value":"#dfc27d"},
    {"value":"#f6e8c3"},
    {"value":"#c7eae5"},
    {"value":"#80cdc1"},
    {"value":"#35978f"},
    {"value":"#01665e"},
    {"value":"#003c30"}
]
```

```code
'''color|palette-horizontal
[
    {"value":"#543005"},
    {"value":"#8c510a"},
    {"value":"#bf812d"},
    {"value":"#dfc27d"},
    {"value":"#f6e8c3"},
    {"value":"#c7eae5"},
    {"value":"#80cdc1"},
    {"value":"#35978f"},
    {"value":"#01665e"},
    {"value":"#003c30"}
]
'''
```


#### Multiple columns


```color|span-2,palette
[   
    {"value": "#ffff00"},
    {"value": "#ffff22"},
    {"value": "#ffff44"},
    {"value": "#ffff66"},
    {"value": "#ffff88"},
    {"value": "#ffffaa"},
    {"value": "#ffffcc"},
    {"value": "#ffffee"}
]
```
```color|span-2,palette
[   
    {"value": "#ff00ff"},
    {"value": "#ff22ff"},
    {"value": "#ff44ff"},
    {"value": "#ff66ff"},
    {"value": "#ff88ff"},
    {"value": "#ffaaff"},
    {"value": "#ffccff"},
    {"value": "#ffeeff"}
]
```
```color|span-2,palette
[   
    {"value": "#00ffff"},
    {"value": "#22ffff"},
    {"value": "#44ffff"},
    {"value": "#66ffff"},
    {"value": "#88ffff"},
    {"value": "#aaffff"},
    {"value": "#ccffff"},
    {"value": "#eeffff"}
]
```

```code|collapsed
'''color|span-2,palette
[
    {"value": "#ffff00"},
    {"value": "#ffff22"},
    {"value": "#ffff44"},
    {"value": "#ffff66"},
    {"value": "#ffff88"},
    {"value": "#ffffaa"},
    {"value": "#ffffcc"},
    {"value": "#ffffee"}
]
'''
'''color|span-2,palette
[
    {"value": "#ff00ff"},
    {"value": "#ff22ff"},
    {"value": "#ff44ff"},
    {"value": "#ff66ff"},
    {"value": "#ff88ff"},
    {"value": "#ffaaff"},
    {"value": "#ffccff"},
    {"value": "#ffeeff"}
]
'''
'''color|span-2,palette
[
    {"value": "#00ffff"},
    {"value": "#22ffff"},
    {"value": "#44ffff"},
    {"value": "#66ffff"},
    {"value": "#88ffff"},
    {"value": "#aaffff"},
    {"value": "#ccffff"},
    {"value": "#eeffff"}
]
'''
```
