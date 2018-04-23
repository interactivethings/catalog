## Pages

### `pages`

`Array<Page|PageGroup>`

Add pages and page groups to your style guide.

#### Page

- `path: string`: The path where the page is accessible
- `title: string`: The title of the page (also shows up in the navigation)
- `content: React.Component`: A Catalog page
- `hideFromMenu: boolean`: Hide the page in the navigation (optional)
- `imports?: Imports`: page [imports](/configuration/imports#imports) (optional)
- `styles?: Styles`: page [styles](/configuration/imports#styles) (optional)
- `scripts?: Scripts`: page [scripts](/configuration/imports#scripts) (optional)

```hint|directive
You should at least have a page with path `'/'` (which is the first page shown)
```

##### A note on the `content` property

A page's `content` property expects a valid React component.

Either import page components statically or use Catalog's `pageLoader` function to create components that lazy-load pages from different sources.

These are all valid examples for `content`:

```code
lang: js
---
// Statically import a page
import Intro from './Intro';
{ content: Intro }

// Statically `require` a page
{ content: require('./Intro') }

// Lazy-load a static Markdown page in the browser
{ content: Catalog.pageLoader('intro.md') }

// Lazy-load a page component
{ content: Catalog.pageLoader(() => import('./Intro'))) }
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
      content: Catalog.pageLoader('intro.md') // Load page from a static Markdown file
    },
    // Other pages …
  ]
}
```

#### Page Group

To create a page group, specify an object with a `title` and a `pages` property. The pages added to the group are grouped in the navigation.

- `title: string`: The title of the page group
- `pages: Array<Page>`: An array of pages

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
      content: Catalog.pageLoader('intro.md')
    },
    {
      title: 'Basics',
      pages: [
        {
          path: '/get-started',
          title: 'Get Started',
          content: Catalog.pageLoader('get-started.md')
        },
        // Other subpages of 'Basics'
      ]
    },

  ]
}
```
