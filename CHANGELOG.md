# Change Log

## 2.2.1

- Link menu title/logo to `basePath` instead of `/`
- Add a "not found" page
- Minor style fixes (no more flash of mobile layout on large viewports)
- Fixes a React warning
- Documentation updates

## 2.2.0

- Include React Specimen in standalone version too (make sure to include `babel-standalone` on the page if you want to use it)
- Fix specimen body parsing ([#96](https://github.com/interactivethings/catalog/pull/96))
- Internal refactoring of `context` use ([#97](https://github.com/interactivethings/catalog/pull/97))

## 2.1.1

- Make Catalog webpack loader cacheable
- Bump rollup

## 2.1.0

- Add `ReactSpecimen` to Markdown pages (only when Catalog is used as node module)
- Add webpack loader which transforms Catalog-style documents into hot-reloadable Catalog pages
- The `Page` component now also renders Catalog-style Markdown strings, so you can mix and match Markdown and other React elements on a page [1bac253](https://github.com/interactivethings/catalog/commit/1bac2537907adc440caed3e7e1edcb5fee19a33b)
- Upgrade to react-router v2. _Make sure you update your app too_, it should work fine because v1 API is still supported
- Upgrade to react v15. Should still work with v0.14 though.
- More helpful warnings when configuration is incorrect
- Miscellaneous fixes and style tweaks
- Publishing builds to gh-pages again
- CI with Codeship

## 2.0.3

- Make specimen plugins work

## 2.0.1

- Fixed `frame` mode for components which use webpack's style-loader

## 2.0.0

The great update to Catalog! 2.0.0 features a new visual appearance (and a logo!) and a major rewrite under the hood. There are many breaking changes, so you need to spend some time updating your documentation when migrating from 1.x.

:rocket: The biggest new thing is that **Catalog is now available as a npm module and can be integrated directly into a React application** to document components and styles. :rocket:

The standalone version still works the same way (with some small changes to the API and the configuration).

### Notable Changes

- The standalone version now is called with `Catalog.render(config, element)`
- All specimens now share a common configuration option `span-[1-6]` which allows them to be laid out in a grid
- React app integration
- Streamlined page configuration with helpful warnings in development mode
- Themable (experimental, API subject to change)

### New Specimens

- ColorPalette
- Image
- Video
- Audio
- Type
- Hint
- Download
- ReactSpecimen

### Removed Specimens

- HTML Project (no replacment yet)
- UISpec (replaced by Image, Video, Audio)
- Icon (replaced by Image)


## 1.1.11 - 2015-03-23

- Added initial draft of UISpec speciment

## 1.1.3 - 1.1.9 - 2014-11-27

- Project specimen downloads now include template file. Improved output.
- Added `scrolling` option to project specimens.
- Fixed the 'double-index' bug (couldn't include two simple-style project specimens).
- Fixed download of binary files like images.
- Fixed HTTP accept headers to work on all webservers
- Changed display of tabbed source previews to always show full, not templated, file
- Fix accidental use of native Promise.

## 1.1.2 - 2014-10-31
Nested menu navigation.

## 1.1.1 - 2014-10-30
Project specimen: allow files to be exposed for download.

## 1.1.0 - 2014-10-30
Renamed `make watch` to `make server` to better describe its purpose.
Greatly enhanced the functionality of the project specimen. The previous API still works, but to take advantage of the new functionality, update existing specimens.

## 1.0.2 - 2014-10-13
Fix loading of multiple external scripts.

## 1.0.1 - 2014-09-14
Complete overhaul of typography to be more solid and calm.

## 1.0.0 - 2014-09-10
Initial release.
