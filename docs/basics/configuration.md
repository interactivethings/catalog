To get Catalog running, you need to configure a `title` and some `pages`.

```
{
  title: 'My Catalog',
  pages: [
    // An array of page configuration objects
  ]
}
```

## Pages

Catalog pages need at least three properties:

- `path`: The path where the page is accessible
- `title`: The title of the page (also shows up in the navigation)
- `src`: The path of the source Markdown document

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

```hint|directive
You should at least have a page with path `'/'` (which is the first page shown)
```

## Page Groups

To create a page group, specify an object with a `title` and a `pages` property. The pages added to the group are grouped in the navigation.

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

```hint|neutral
Page groups don't have a `src` and `path` property
```

```hint
Currently, only one level of grouping is supported.
```


## Styles, Scripts, Imports
