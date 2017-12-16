# Change Log

For newer release notes please check Catalog's [GitHub Releases](https://github.com/interactivethings/catalog/releases)

## v3.2.0

### New

- Make Type specimen accept arrays for values to customize labels ([#332](https://github.com/interactivethings/catalog/pull/332))
- Allow theming header and navigation bar ([#341](https://github.com/interactivethings/catalog/pull/341))
- Allow to re-order responsive sizes ([#333](https://github.com/interactivethings/catalog/pull/333))

## v3.1.5

### Fixes

- Improve React Specimen code transform ([#329](https://github.com/interactivethings/catalog/pull/329))

## v3.1.4

### Fixes

- Clone stylesheet references from parent page into iframes ([#326](https://github.com/interactivethings/catalog/pull/326))

## v3.1.3

### Fixes

- Clone stylesheet references from parent page into iframes ([#319](https://github.com/interactivethings/catalog/pull/319))
- Fix for potentially undefined ref when resizing the React or HTML Specimen ([fc12f24](https://github.com/interactivethings/catalog/commit/fc12f242c76ddbc273aadbe2a7ed44b7033c5bd1))
- Enable iframe scrolling in responsive mode ([#321](https://github.com/interactivethings/catalog/pull/321))

## v3.1.2

### Fixes

- Fixes botched React default require in bundled module

## v3.1.1

### Fixes

- Fixes webpack-dev-server error by updating its version dependency

## v3.1.0

### New

- Added support for CLI config file ([#312](https://github.com/interactivethings/catalog/pull/312))

### Fixes

- React element stringification fixes ([#306](https://github.com/interactivethings/catalog/pull/306))

## v3.0.0

### New

#### CLI

🚀 Catalog now comes with its own command line tool ([#283](https://github.com/interactivethings/catalog/pull/283))!

This means getting started with Catalog is now as easy as typing `catalog start`.

- Catalog will work _alongside_ existing apps and detect [Create React App](https://github.com/facebookincubator/create-react-app) and [next.js](https://github.com/zeit/next.js) automatically
- Catalog will help you getting started by creating the necessary files when you run `catalog start` for the first time
- No configuration needed!
- Create an optimized build with `catalog build`

#### Mix Markdown and React code

You can now write Catalog pages using the `markdown` tagged template literal ([#277](https://github.com/interactivethings/catalog/pull/277), [#281](https://github.com/interactivethings/catalog/pull/281)). This makes it more convenient to keep written parts of the documentation in Markdown while being able to use real code for specimens and components. Using real code means that you can leverage all your tooling (eslint, flow types) and editor capabilities. For example:

```jsx
import React from 'react';
import { markdown, ReactSpecimen } from 'catalog';
import MyComponent from './MyComponent';

export default () => markdown`
# My Component

Can do cool things:

- this
- and that

${<ReactSpecimen>
  <MyComponent foo="bar" />
</ReactSpecimen>}

Etc.
`
```

#### Dynamic Imports For Pages (a.k.a Code Splitting)

To create a smaller initial bundle for Catalog, you can now split page content into separate bundles with the new `pageLoader`. This leverages webpack 2's code-splitting powers. When you use the `catalog` command line tool, this will work out of the box without any configuration. ✌️

```jsx
import { pageLoader } from 'catalog';

const config = {
  // ...
  pages: [
    {
      path: '/nice-page',
      title: 'A Nice Page',
      content: pageLoader(() => import('./NicePage'))
    },
    {
      path: '/markdown-page',
      title: 'Markdown Page',
      content: pageLoader(() => import('./MarkdownPage.md'))
    }
  ]
}
```

Also note that page configuration now comes with a new `content` property. It actually just is an alias for the `component` property but with a bit less jargon.

#### Other improvements

- New option on the image specimen: `scale`(see [#76](https://github.com/interactivethings/catalog/issues/76))
- Add a Babel plugin which preserves original source text of ReactSpecimen children ([#285](https://github.com/interactivethings/catalog/pull/285))
- Enable imports in all Specimen YAML options ([#154](https://github.com/interactivethings/catalog/pull/154))
- Various visual style fixes and improvements ([#234](https://github.com/interactivethings/catalog/pull/234))

### Breaking Changes

We tried hard not to break any functionality of Catalog itself, so you should be able to use v3 as a drop-in replacement for v2. But we changed a few things around how we publish Catalog.

- Docs won't be hosted on GitHub pages anymore but on their dedicated website
- The standalone version of Catalog will also not be hosted anymore, we recommend to use [unpkg](https://unpkg.com/) for that (or better: the npm version)
- We don't publish the `lib/` directory anymore. Import the Catalog webpack loader from `catalog/loader`

### Fixes

- Fix weird scale behaviour of the thumbnail in download specimen [#260](https://github.com/interactivethings/catalog/issues/260)
- Create a new stacking context for the whole <Page> component [#223](https://github.com/interactivethings/catalog/issues/223)
- Don't re-render page when menu is toggled [#271](https://github.com/interactivethings/catalog/issues/271)
- When clicking a title anchor, page scrolls to top instead of to the anchor [#275](https://github.com/interactivethings/catalog/issues/275)
- Ensure React 15.5 compatibility ([#288](https://github.com/interactivethings/catalog/pull/288))
- Ensure react-scripts@1 compatibility ([#291](https://github.com/interactivethings/catalog/pull/291))

## 2.5.3

- Fix regression in 2.5.0 where the configuration would blow up if the `path` property was missing on page groups. ([#266](https://github.com/interactivethings/catalog/pull/266))

## 2.5.2

- Fix non-responsive specimens not showing any content ([f6dd53d](https://github.com/interactivethings/catalog/commit/f6dd53d3e25cf2aefb4241d365752efee6a445b6))

## 2.5.1

- Responsive mode layout fix ([#264](https://github.com/interactivethings/catalog/pull/264))

## 2.5.0

- Add responsive mode for HTML and React Specimens ([#121](https://github.com/interactivethings/catalog/pull/121))
- Add internal links, and links to page sections ([#165](https://github.com/interactivethings/catalog/pull/165))
- Replaced tape with Jest tests ([#212](https://github.com/interactivethings/catalog/pull/212))
- Make Catalog work in IE11 ([#252](https://github.com/interactivethings/catalog/pull/252))
- Improve styling of the Image Specimen ([#256](https://github.com/interactivethings/catalog/pull/256))
- Add [yarn](https://yarnpkg.com) ([#263](https://github.com/interactivethings/catalog/pull/263))

## 2.4.7

- Updated some dependencies:
  - ramda ([#184](https://github.com/interactivethings/catalog/pull/184))
  - react-router-scroll ([#190](https://github.com/interactivethings/catalog/pull/190))
  - babel-standalone ([#198](https://github.com/interactivethings/catalog/pull/198))
  - rollup-plugin-commonjs ([#201](https://github.com/interactivethings/catalog/pull/201))

## 2.4.6

- Fix Windows escape char bug in the webpack loader ([#187](https://github.com/interactivethings/catalog/pull/187))

## 2.4.5

- Update babel-standalone to v6.12.0 ([#169](https://github.com/interactivethings/catalog/pull/169))

## 2.4.4

- Table layout fixes ([#156](https://github.com/interactivethings/catalog/pull/156))
- Code cleanup ([#158](https://github.com/interactivethings/catalog/pull/158), [#159](https://github.com/interactivethings/catalog/pull/159), [#160](https://github.com/interactivethings/catalog/pull/160), [#161](https://github.com/interactivethings/catalog/pull/161))

## 2.4.3

- Revert fix for radium bug, update radium to 0.18.0

## 2.4.2

- Hot fix for radium displaying "none" when `content: 'none'` is set ([#155](https://github.com/interactivethings/catalog/issues/148))

## 2.4.1

- Don't cut of square/tall logos ([#148](https://github.com/interactivethings/catalog/issues/148))

## 2.4.0

- :tada: Add [Table Specimen](https://interactivethings.github.io/catalog/#/specimens/table) ([#123](https://github.com/interactivethings/catalog/pull/123))

## 2.3.0

- Add `Catalog` React component ([#125](https://github.com/interactivethings/catalog/pull/125))
- Improve JSX transform of React Specimen ([#149](https://github.com/interactivethings/catalog/issues/149))
- Lint all the things!

## 2.2.9

- Dependency updates

## 2.2.8

- Update document title based on active page ([#124](https://github.com/interactivethings/catalog/pull/124))

## 2.2.6 / 2.2.7

- Pass React context to framed specimens ([#122](https://github.com/interactivethings/catalog/pull/122))

## 2.2.5

- Make sure iframe `head` is cleared before adding styles
- Scope fallback route to `basePath`

## 2.2.4

- Set base href inside framed components. Fixes an issue where web fonts didn't get loaded in the iframe.

## 2.2.3

- Better contrast for color palette labels ([#101](https://github.com/interactivethings/catalog/pull/101))
- Allow React elements in Hint Specimen ([#102](https://github.com/interactivethings/catalog/pull/102))

Thanks @bldng!

## 2.2.1 / 2.2.2

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

- HTML Project (no replacement yet)
- UISpec (replaced by Image, Video, Audio)
- Icon (replaced by Image)


## 1.1.11 - 2015-03-23

- Added initial draft of UISpec specimen

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
