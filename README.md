# Catalog

Catalog lets you create beautiful living style guides quickly and easily. Content is written in Markdown so you can focus on documenting your components. It is completely dependency free, making it trivial to integrate Catalog into your application.

Refer to the [documentation](http://interactivethings.github.io/catalog/) (built with Catalog itself!) to find out more.

## Installation

```
npm install catalog --save
```

## Development

- `make` installs npm dependencies and starts the development server.
- `make watch-lib` builds the files from `src/` into `lib/` continuously. Useful with `npm link` when you want to test integration with another app.
- `make build` builds `catalog.js`, `catalog.min.js`, and `lib/`
- `make test` runs tests

## Releasing

- `make dist` prompts for a new version number and publishes to npm. _Don't edit `package.json` manually._
- `make publish-docs` builds and publishes Catalog's documentation to GitHub Pages

