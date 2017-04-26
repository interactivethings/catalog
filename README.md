![Catalog Logo](https://interactivethings.github.io/catalog/docs/assets/catalog_logo.svg)

[![Travis](https://img.shields.io/travis/interactivethings/catalog.svg)]() [![Downloads](https://img.shields.io/npm/dm/catalog.svg)]() [![Version](https://img.shields.io/npm/v/catalog.svg)]() [![License](https://img.shields.io/npm/l/catalog.svg)]()

# Catalog

Catalog lets you create beautiful living and fully interactive style guides using Markdown and React components.

Please read the [Catalog documentation](https://interactivethings.github.io/catalog/) (built with Catalog!) for detailed installation and usage instructions.

## Installation

### yarn

```
yarn add catalog react react-dom
```

### npm

```
npm install catalog react react-dom --save
```


## Development

> Please make sure that you have Node >= 6 and [yarn](https://yarnpkg.com/) installed.

### Build process

Start the build process in watch mode:

``` 
make
````

### Linking

When developing Catalog you want to link it locally:

```
yarn link
```

You can then link to this version in your project (or one of the examples):

```
yarn link catalog
```

### Tests

To run [Jest](https://facebook.github.io/jest/) tests in watch mode:

```
make test-watch
```

## Creating a Release

Bump Catalog's version:

```
make version
```

Then push including tags:

```
git push && git push --tags
```

The CI server will automatically run tests, build and publish the new version to npm

## CI commands

> These usually run automatically on the CI server

### Create a build

```
make build
```

### Publish to npm

```
make publish
```

## Credits

Catalog is developed by [many people](https://github.com/interactivethings/catalog/blob/master/AUTHORS) at [Interactive Things](https://www.interactivethings.com/), a User Experience and Data Visualization Studio based in Zürich.
