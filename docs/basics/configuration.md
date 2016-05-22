To get Catalog running, you need to pass a configuration to `Catalog.render()` with a `title` and some `pages`.

```code
lang: js
---
Catalog.render({
  title: 'My Catalog',
  pages: [
    // An array of page configuration objects
  ]
}, element);
```

## Pages

Catalog pages need at least three properties:


#### Page Properties

- `path : String`: The path where the page is accessible
- `title : String`: The title of the page (also shows up in the navigation)
- `src : String`: The path of the source Markdown document

```hint|directive
You should at least have a page with path `'/'` (which is the first page shown)
```

#### Page Example

```
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

### React Component Pages

When integrating Catalog in a React project, you can directly use components as page content. This leads to better performance (the content doesn't have to be loaded and transformed first) and better integration with your development setup. For example, if you have configured hot reloading with webpack, you can edit your documentation and see changes immediately without having to reload your browser.

#### Component Page Properties

- `path : String`: The path where the page is accessible
- `title : String`: The title of the page (also shows up in the navigation)
- `component : Component`: A valid React component

#### Component Page Example

```
{
  title: 'My Catalog',
  pages: [
    {
      path: '/',
      title: 'Introduction',
      component: require('Intro') // `Intro` is a module which exports a React component
    },
    // Other pages …
  ]
}
```

#### Component Page Example (with Webpack Loader)

```hint|directive
Catalog includes a **webpack loader** which transforms Markdown files into hot-reloadable page components.
```

```
{
  title: 'My Catalog',
  pages: [
    {
      path: '/',
      title: 'Introduction',
      component: require('catalog/lib/loader!raw!intro.md') // `intro.md` is a regular Markdown file
    },
    // Other pages …
  ]
}
```

## Page Groups

To create a page group, specify an object with a `title` and a `pages` property. The pages added to the group are grouped in the navigation.

#### Page Group Properties

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

## Styles, Scripts, Imports

```hint|neutral
TK: Importing styles, scripts and code on pages
```