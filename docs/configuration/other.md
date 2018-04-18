## Responsive Specimens

### `responsiveSizes`

`Array<{name: string, width: number, height: number}>`

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
pages: [
...
```

## Routing

### `useBrowserHistory`

`boolean`

To maximize compatibility, Catalog uses hash-based routing (e.g. `my-styleguide.com/#/about`) by default. It can also use HTML5 pushstate-based routing, so you get "real" URLs (e.g. `my-styleguide.com/about`). Set `useBrowserHistory` to `true` to enable this.

```hint
GitHub Pages doesn't support this style of routing without [hacks](https://github.com/rafrex/spa-github-pages). Instead, you can use:

- [Netlify](https://www.netlify.com/)
- [Surge](http://surge.sh/)
- [now](https://zeit.co/docs/examples/create-react-app)
- [Any nginx or Apache server that you can configure](http://readystate4.com/2012/05/17/nginx-and-apache-rewrite-to-support-html5-pushstate/)
```

### `basePath`

`string`

If you want Catalog to run under a certain base path, e.g. `my-styleguide.com/catalog/about`, set the `basePath` configuration option. The base path will be prefixed to all page paths.

This works best together with `useBrowserHistory`.

#### Route Settings Example

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
