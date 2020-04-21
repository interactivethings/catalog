> Catalog offers a few ways to customize the appearance to match your project. All of the customization options below can be made by changing the attributes of the `Catalog` component in `index.js`.

## Logo
You can add a plain text title or logo image to the header section of the sidebar. To use text, change the `title` attribute and if you’d like to use an image, add the URL of the image to the `logoSrc`.

- `title` (`string`)
- `logoSrc` (`string`)


## Theme
The visual design of the user interface of Catalog is customizable. Simply add a `theme` attribute to the `Catalog` component in `index.js` and override the default values below with your custom CSS definitions.

- `theme` (`object`)

### Base Typography
```table
rows:
  - Attribute: '`baseFontSize`'
    Default: '`16`'
    Application: Base font size.
  - Attribute: '`msRatio`'
    Default: '`1.2`'
    Application: Modular scale ratio for font sizes.
  - Attribute: '`fontFamily`'
    Default: '`Roboto, sans-serif`'
    Application: Font family of the body text.
  - Attribute: '`fontHeading`'
    Default: '`Roboto, sans-serif`'
    Application: Font family of the headings.
  - Attribute: '`fontMono`'
    Default: '`Source Code Pro, monospace`'
    Application: Font family of the code text.
```

### Base Colors
```table
rows:
  - Attribute: '`brandColor`'
    Default: '`#003B5C`'
    Application: Accent color used for headings
  - Attribute: '`textColor`'
    Default: '`#333333`'
    Application: Font color of the text in the main column.
  - Attribute: '`codeColor`'
    Default: '`#00263E`'
    Application: Font color of the code in the main column.
  - Attribute: '`linkColor`'
    Default: '`#FF5555`'
    Application: Font color of links in the main column.
  - Attribute: '`lightColor`'
    Default: '`#D6D6D6`'
    Application: Border color used for blockquotes in main column.
```

### Page Header
```table
rows:
  - Attribute: '`pageHeadingBackground`'
    Default: '`#003B5C`'
    Application: Background color of the header in the main column.
  - Attribute: '`pageHeadingTextColor`'
    Default: '`#FFFFFF`'
    Application: Font color of the header in the main column.
  - Attribute: '`pageHeadingHeight`'
    Default: '`200`'
    Application: Height of the header in the main column and sidebar.
```

### Main Column

```table
rows:
  - Attribute: '`background`'
    Default: '`#F9F9F9`'
    Application: Background color of the body in main column.
  - Attribute: '`bgLight`'
    Default: '`#F2F2F2`'
    Application: Background color of light specimens.
  - Attribute: '`bgDark`'
    Default: '`#333333`'
    Application: Background color of dark specimens.
```

### Sidebar
```table
rows:
  - Attribute: '`sidebarColor`'
    Default: '`#FFFFFF`'
    Application: Background color of the body in sidebar column.
  - Attribute: '`sidebarColorLine`'
    Default: '`#EBEBEB`'
    Application: Border color of the links in sidebar column.
  - Attribute: '`sidebarColorHeading`'
    Default: '`#003B5C`'
    Application: Font color of the header in the sidebar column.
  - Attribute: '`sidebarColorText`'
    Default: '`#003B5C`'
    Application: Font color of the list items in the sidebar column.
  - Attribute: '`sidebarColorTextActive`'
    Default: '`#FF5555`'
    Application: Font color of the active list item in the sidebar column.
```

### Navigation Bar
```table
rows:
  - Attribute: '`navBarBackground`'
    Default: '`#F2F2F2`'
    Application: Background color of the navigation bar at the bottom of the main column.
  - Attribute: '`navBarTextColor`'
    Default: '`#003B5C`'
    Application: Font color of the navigation bar at the bottom of the main column.
```

### Code Syntax Styles
The code syntax highlighting is based on based on [PrismJS](http://prismjs.com/) and can be adjusted with `codeStyles`.

- `codeStyles` (`object`)

Example:
```code
codeStyles: {
  tag: {color: '#FF5555', fontWeight: 'bold'}
}
```
