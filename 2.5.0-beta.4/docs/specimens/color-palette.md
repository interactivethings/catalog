> A Color Palette groups a sequence of colors into a block. Ideal for color scales.

### Props

- __`colors: array`__ colors of the palette
    - __`value: string`__ defines the color value
    - `name: string` defines the color name
- `horizontal: boolean` generates a horizontal list
- `span: number[1–6]` width of the specimen

### Examples

#### Regular color palette

Color palettes can be used for sets that contain more colors. For example to document gradient steps or  color schemes.

```color-palette
colors:
  - {name: "100", value: "#e3f1fc"}
  - {name: "200", value: "#c2d8ea"}
  - {name: "300", value: "#a1c0d8"}
  - {name: "400", value: "#80a8c6"}
```

````code|lang-javascript
```color-palette
colors:
  - {name: "100", value: "#e3f1fc"}
  - {name: "200", value: "#c2d8ea"}
  - {name: "300", value: "#a1c0d8"}
  - {name: "400", value: "#80a8c6"}
```
````

#### Horizontal color palette

displaying a diverging color scale


```color-palette|horizontal
colors:
   - {value: "#543005"}
   - {value: "#8c510a"}
   - {value: "#bf812d"}
   - {value: "#dfc27d"}
   - {value: "#f6e8c3"}
   - {value: "#c7eae5"}
   - {value: "#80cdc1"}
   - {value: "#35978f"}
   - {value: "#01665e"}
   - {value: "#003c30"}
```

````code|lang-javascript
```color-palette|horizontal
colors:
   - {value: "#543005"}
   - {value: "#8c510a"}
   - {value: "#bf812d"}
   - {value: "#dfc27d"}
   - {value: "#f6e8c3"}
   - {value: "#c7eae5"}
   - {value: "#80cdc1"}
   - {value: "#35978f"}
   - {value: "#01665e"}
   - {value: "#003c30"}
```
````


#### Multiple columns


```color-palette|span-2
colors:   
  - {value: "#ffff00"}
  - {value: "#ffff22"}
  - {value: "#ffff44"}
  - {value: "#ffff66"}
  - {value: "#ffff88"}
  - {value: "#ffffaa"}
  - {value: "#ffffcc"}
  - {value: "#ffffee"}
```
```color-palette|span-2
colors:   
  - {value: "#ff00ff"}
  - {value: "#ff22ff"}
  - {value: "#ff44ff"}
  - {value: "#ff66ff"}
  - {value: "#ff88ff"}
  - {value: "#ffaaff"}
  - {value: "#ffccff"}
  - {value: "#ffeeff"}
```
```color-palette|span-2
colors:   
  - {value: "#00ffff"}
  - {value: "#22ffff"}
  - {value: "#44ffff"}
  - {value: "#66ffff"}
  - {value: "#88ffff"}
  - {value: "#aaffff"}
  - {value: "#ccffff"}
  - {value: "#eeffff"}
```

````code|collapsed,lang-javascript
```color-palette|span-2
colors:
  - {value: "#ffff00"}
  - {value: "#ffff22"}
  - {value: "#ffff44"}
  - {value: "#ffff66"}
  - {value: "#ffff88"}
  - {value: "#ffffaa"}
  - {value: "#ffffcc"}
  - {value: "#ffffee"}
```
```color-palette|span-2
colors:
  - {value: "#ff00ff"}
  - {value: "#ff22ff"}
  - {value: "#ff44ff"}
  - {value: "#ff66ff"}
  - {value: "#ff88ff"}
  - {value: "#ffaaff"}
  - {value: "#ffccff"}
  - {value: "#ffeeff"}
```
```color-palette|span-2
colors:
  - {value: "#00ffff"}
  - {value: "#22ffff"}
  - {value: "#44ffff"}
  - {value: "#66ffff"}
  - {value: "#88ffff"}
  - {value: "#aaffff"}
  - {value: "#ccffff"}
  - {value: "#eeffff"}
```
````
