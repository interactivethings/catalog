
## Including Code From Your Application

To document your application properly, you need to include its styles and scripts. You have three options for doing that:

```hint|directive
You can either set these at the top level, or on each page. Styles, scripts, and imports defined at the top level will be available on each page.
```

### `styles`

`Array<string>`

Catalog will include CSS files referenced in the `styles` option.

#### Styles Example

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

`Array<string>`

Catalog will inject JavaScript files referenced in the `scripts` option.

#### Scripts Example

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

`{[key: string]: any}`

To make components and other code available to your [Specimens](/specimens), use the `imports` option.

#### Imports Example

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