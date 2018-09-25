> Configure Catalog to add style guide pages, import code from your application, and theme it to match your brand

To get Catalog running, you need to configure it with a `title` and some `pages`.

Either provide a configuration object to `Catalog.render()` or props to the `Catalog` React component.

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

## Basic Configuration Options

### `title`

`string`

The title of your Catalog
