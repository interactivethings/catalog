
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