To get Catalog running, you need to configure it with a `title` and some `pages`.

Either provide the configuration to `Catalog.render()` or to the `Catalog` React component.

```code
span: 3
lang: js
---
// In any script:

Catalog.render(
  {
    title: 'My Style Guide',
    pages: [
      // …
    ]
  },
  element
);
```

```code
span: 3
lang: jsx
---
// With React:

ReactDOM.render(
  <Catalog
    title='My Style Guide',
    pages={[
      // …
    ]}
  />,
  element
);
```

## Essentials

### `title`

The title of your Catalog

### `pages`

Catalog pages need at least three properties:


##### Page Properties

- `path : String`: The path where the page is accessible
- `title : String`: The title of the page (also shows up in the navigation)
- `src : String`: The path of the source Markdown document

```hint|directive
You should at least have a page with path `'/'` (which is the first page shown)
```

##### Page Example

```code
lang: js
---
{
  title: 'My Catalog',
  pages: [
    {
      path: '/',
      title: 'Introduction',
      src: 'intro.md'
    },
    // Other pages …
  ]
}
```

### Page Groups

To create a page group, specify an object with a `title` and a `pages` property. The pages added to the group are grouped in the navigation.

##### Page Group Properties

- `title : String`: The title of the page group
- `pages : Array<Page>`: An array of sub-pages

```hint
Page groups can only contain pages but not other page groups.
```

```
{
  title: 'My Catalog',
  pages: [
    {
      path: '/',
      title: 'Introduction',
      src: 'intro.md'
    },
    {
      title: 'Basics',
      pages: [
        {
          path: '/get-started',
          title: 'Get Started',
          src: 'get-started.md'
        },
        // Other subpages of 'Basics'
      ]
    },

  ]
}
```

### React Component Pages

When [integrating Catalog in a React project](/react-integration), you can directly use components as page content. This leads to better performance (the content doesn't have to be loaded and transformed first) and better integration with your development setup. For example, if you have configured hot reloading with webpack, you can edit your documentation and see changes immediately without having to reload your browser.

##### Component Page Properties

- `path : String`: The path where the page is accessible
- `title : String`: The title of the page (also shows up in the navigation)
- `component : Component`: A valid React component

##### Component Page Example

```code
lang: js
---
{
  title: 'My Catalog',
  pages: [
    {
      path: '/',
      title: 'Introduction',
      component: Introduction // `Introduction` is a module which exports a React component
    },
    // Other pages …
  ]
}
```

##### `markdown`

To make it easier to write the bulk of the documentation with Markdown but intersperse with your own React components, you can use the `Catalog.markdown` function.

```code
lang: js
---
export default Catalog.markdown`
# This is a heading

${<MyComponent />}
`
```

## Routes

### `useBrowserHistory`

To maximize compatibility, Catalog uses hash-based routing (e.g. `my-styleguide.com/#/about`) by default. If your web server is [configured properly](http://readystate4.com/2012/05/17/nginx-and-apache-rewrite-to-support-html5-pushstate/), it can also use HTML5 pushstate-based routing, so you get "real" URLs (e.g. `my-styleguide.com/about`). Set `useBrowserHistory` to `true` to enable this.

### `basePath`

If you want Catalog to run under a certain base path, e.g. `my-styleguide.com/catalog/about`, set the `basePath` configuration option. The base path will be prefixed to all page paths.

This works best together with `useBrowserHistory`. Otherwise the `basePath` defines the path prefix _after_ the URL hash, e.g. `#/catalog/about`.

##### Route Settings Example

```code
lang: js
---
{
  title: 'My Catalog',
  basePath: '/catalog',
  useBrowserHistory: true,
  pages: [
    {
      path: '/',        // Page will be accessible at `/catalog/`
      title: 'Introduction',
      // …
    },
    {
      path: '/about',   // Page will be accessible at `/catalog/about/`
      title: 'About',
      // …
    },
    // Other pages …
  ]
}
```

## Including Code From Your Application

To document your application properly, you need to include its styles and scripts. You have three options for doing that:

```hint|directive
You can either set these at the top level, or on each page. Styles, scripts, and imports defined at the top level will be available on each page.
```

### `styles`

Catalog will include CSS files referenced in the `styles` option.

##### Styles Example

```code
lang: js
---
{
  styles: ['/foo.css', '/bar.css']
  // Other options …
  pages: [
    {
      styles: ['/foobar.css'],
      // On this page, 'foo.css', 'bar.css', and 'foobar.css' will be included
      // Other page options …
    }
  ]
}
```

### `scripts`

Catalog will inject JavaScript files referenced in the `scripts` option.

##### Scripts Example

```code
lang: js
---
{
  scripts: ['/foo.js', '/bar.js']
  // Other options …
  pages: [
    {
      scripts: ['/foobar.js'],
      // On this page, 'foo.js', 'bar.js', and 'foobar.js' will be injected
      // Other page options …
    }
  ]
}
```

### `imports`

To make components and other code available to your [Specimens](/specimens), use the `imports` option.

##### Imports Example

```code
lang: js
---
{
  imports: {Foo: require('Foo'), Bar: require('Bar')}
  // Other options …
  pages: [
    {
      imports: {FooBar: require('FooBar')},
      // On this page, 'Foo', 'Bar', and 'FooBar' will be available to use in React Specimens
      // Other page options …
    }
  ]
}
```

## Responsive Specimens

### `responsiveSizes`

To test or document responsive behavior of [React](/specimens/react#responsive-display) and [HTML](/specimens/html#responsive-display) components, Catalog provides some basic default screen sizes (`small, medium, large` and `xlarge`). Given that each project has different requirements, you can easily define new sizes.

Let's assume you want to work with a smart watch, a tablet and Desktop, the Catalog configuration could look like this:

```code
...
title: 'Catalog',
responsiveSizes: [
  {name: 'watch', width: 272, height: 340}
  {name: 'tablet', width: 1024, height: 768},
  {name: 'desktop', width: 1920, height: 1080},
],
pages : [
...

```


## Theming Catalog

### `logoSrc`

Path to a logo image file which will be placed in the top-left corner.

### `theme`

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

NavigationBar background color, but also sometimes used as a foreground
or border color.

##### `pageHeading{Background,TextColor,Height}`

Used in PageHeader. `pageHeadingHeight` is not a color but the height of the
whole PageHeader component.

##### `brandColor`

NavigationBar (links), ResponsiveTabs (tab text), Download specimen (title text).
Typography: headings.

##### `sidebarColor{,Active,Text,TextActive,Line,Heading}`

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
