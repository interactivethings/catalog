## URLs

There are different kinds of [URLs](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_URL) in a Catalog document:

1.  A path to a Catalog page, e.g. `/components/buttons`
2.  A path to a Catalog asset, e.g. `/introduction/header.jpg`
3.  A path to another page on the same web server that is not handled by Catalog, e.g. `/about`
4.  A fully expanded URL, e.g. `http://example.com/data.csv`

The above URLs all look like absolute URLs, but the first two are actually relative URLs: relative to Catalog's `index.html` document, which lives, say, at `/my/documentation/index.html`. If we would write them all as fully expanded URLs, they would look like this:

1.  `example.com/my/documentation/components/buttons`
2.  `example.com/my/documentation/introduction/header.jpg`
3.  `example.com/about`
4.  `example.com/data.csv`

As an additional challenge URLs can also be relative. An example: when visiting the page `/components/buttons` a relative link leading away from that page could point to `./lists` to refer to `/components/lists` or, to use the fully expanded URL, `example.com/my/documentation/components/lists`.

As you can see, URLs can pose some challenges; this page will help you understand how to use these different kinds of URLs within Catalog.

## Routing

### `useBrowserHistory`

`boolean`

To maximize compatibility, Catalog uses hash-based routing by default (e.g. `example.com/#/components/button`). It can also use HTML5 pushstate-based routing, so you get "real" URLs (e.g. `example.com/components/button`). Set `useBrowserHistory` to `true` to enable this.

If you use hash-based routing, you will not run into problems when linking between pages if your Catalog is hosted at a sub-path of the web server. But you might encounter broken asset links in which case you will need to also set the `publicUrl` as explained further down.

```hint
GitHub Pages doesn't support this style of routing without [hacks](https://github.com/rafrex/spa-github-pages). Instead, you can use:

- [Netlify](https://www.netlify.com/)
- [Surge](http://surge.sh/)
- [now](https://zeit.co/docs/examples/create-react-app)
- [Any nginx or Apache server that you can configure](http://readystate4.com/2012/05/17/nginx-and-apache-rewrite-to-support-html5-pushstate/)
```

### `publicUrl`

Catalog assumes that it is hosted at the root of a website by default, i.e. it expects the index document to live at `example.com/index.html`. If you host Catalog at a sub-path of the website, you will need to tell it where it's index document lives so that it can correctly rewrite internal URLs to assets and other paths of the website.

You can set the public URL through your shell's environment (e.g. `PUBLIC_URL=http://example.com/my/catalog/ catalog start`) or by setting `publicUrl` as a configuration parameter (see example further down).

### `basePath` (deprecated)

`string`

```warn
Deprecated: use `publicUrl` instead.
```

### Route Settings Example

```code
lang: js
---
{
  title: 'My Catalog',
  publicUrl: 'http://example.com/my/catalog',
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

## How do I …?

### Catalog is hosted at `/foo/docs/index.html`, but you want to access an asset at `/foo/assets/img.jpg`.

### Link to another Catalog page

### Link to an asset

### Link to an external URL
