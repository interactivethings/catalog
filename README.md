![Catalog Logo](https://interactivethings.github.io/catalog/docs/assets/catalog_logo.svg)

[ ![Codeship Status for interactivethings/catalog](https://codeship.com/projects/b9c8e9b0-ed46-0133-8707-0260d23e53ee/status?branch=master)](https://codeship.com/projects/148435)

# Catalog

Catalog lets you create beautiful living style guides quickly and easily.

Content is written in Markdown so you can focus on documenting your components.

The [standalone version](http://interactivethings.github.io/catalog/#/usage) is completely dependency free, making it trivial to integrate Catalog into your application.

Catalog can also be [directly integrated into a React app](https://interactivethings.github.io/catalog/#/react) to document components directly.

[Read Catalog's documentation](https://interactivethings.github.io/catalog/) (built with Catalog!) to find out more.

## Installation

#### Standalone Builds

- Production: https://interactivethings.github.io/catalog/catalog.min.js
- Development (with helpful warnings): https://interactivethings.github.io/catalog/catalog.js

#### Prerelease Builds

- Production: https://interactivethings.github.io/catalog/next/catalog.min.js
- Development: https://interactivethings.github.io/catalog/next/catalog.js

#### npm

```
npm install catalog --save
```

The `react`, `react-dom`, `react-router`, and `history` modules are peerDependencies, so you need to install them separately.

## Development

```
make
```

installs npm dependencies and starts the development server.

```
make watch-lib
``` 

builds the files from `src/` into `lib/` continuously. Useful with `npm link` when you want to test integration with another app.

```
make build
```

builds `catalog.js`, `catalog.min.js`, and `lib/`

```
make test
```

runs tests

## Releasing

```
make version
```

prompts for a new version number.

```
make publish
```

publishes to npm and gh-pages if an unpublished version number is detected. Usually will run automatically via CI.

## Credits

Catalog is developed by [many people](https://github.com/interactivethings/catalog/blob/master/AUTHORS) at [Interactive Things](https://www.interactivethings.com/), a User Experience and Data Visualization Studio based in Zürich.
