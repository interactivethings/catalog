## Theming Catalog

### `logoSrc`

`string`

Path to a logo image file which will be placed in the top-left corner.

### `theme`

`Object`

Object which describes which colors, fonts and font sizes to use.

```code
…
title: 'Catalog',
theme: {
  <theme configuration here…>
}
…
```

#### `fontFamily` / `fontHeading` / `fontMono`

The name (including any fallback fonts) of the font for copy text, headings and pre/code blocks.

#### `baseFontSize` / `msRatio`

The font size is derived from these two values. Default is 16px / 1.2. See [modularscale](http://www.modularscale.com/?16&px&1.2&web&text).

#### Colors

The [src/DefaultTheme.js](https://github.com/interactivethings/catalog/blob/master/src/DefaultTheme.js) file contains all colors which you can set.

##### `background`, `textColor`, `codeColor`, `linkColor`

The primary foreground and background colors.

##### `lightColor`

Used as a foreground or border color.

##### `pageHeading{Background,TextColor,Height}`

Used in PageHeader. `pageHeadingHeight` is not a color but the height of the
whole PageHeader component.

##### `navBar{Background,TextColor}`

Used in the navigation bar.

##### `brandColor`

ResponsiveTabs (tab text), Download specimen (title text).
Typography: headings.

##### `sidebarColor{,Text,TextActive,Line,Heading}`

Used in the sidebar.

##### `bg{Light,Dark}`, `checkerboardPattern{Light,Dark}`

Background colors and patterns for html, react, and image specimens.

##### `codeStyles`

Map from [PrismJS](http://prismjs.com/) token type to style object. Example:

```code
codeStyles: {
  tag: {color: '#FF5555', fontWeight: 'bold'}
}
```
