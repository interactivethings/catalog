import DefaultTheme from './DefaultTheme';
import DefaultSpecimens from './DefaultSpecimens';

// Removes potential multiple slashes from concatenating paths
const removeMultiSlashes = (path) => path.replace(/\/+/g, '/');
const stripTrailingSlashes = (path) => path.replace(/\/+$/, '');

const flattenPageTree = (pageTree) => {
  return pageTree
    .reduce((pages, page) => pages.concat(page.pages ? [page, ...page.pages] : [page]), [])
    .filter((page) => page.src || page.component)
    .map((page, index) => ({...page, index}));
};

export default (config) => {
  let pageId = 0;

  const pageReducer = (pages, page) => {
    const configStyles = config.styles || [];
    const pageStyles = page.styles || [];
    const configScripts = config.scripts || [];
    const pageScripts = page.scripts || [];
    const basePath = config.basePath || '/';

    if (process.env.NODE_ENV !== 'production') {
      if (page.name) {
        console.error('Catalog warning: The page configuration property `name` is deprecated; use `path` instead.', page);
      }
    }

    return [
      ...pages,
      {
        ...page,
        id: ++pageId,
        // Currently, catalog can't be nested inside other page routes, it messes up <Link> matching. Use `basePath`
        path: removeMultiSlashes('/' + stripTrailingSlashes([basePath, page.path || page.name].join('/'))),
        pages: page.pages ? page.pages.reduce(pageReducer, []).map((p) => ({...p, superTitle: page.title})) : null,
        styles: Array.from(new Set([...configStyles, ...pageStyles])),
        scripts: Array.from(new Set([...configScripts, ...pageScripts]))
      }
    ];
  };

  const pageTree = config.pages.reduce(pageReducer, []).map((p) => ({...p, superTitle: config.title}));
  const pages = flattenPageTree(pageTree);

  return {
    ...config,
    theme: {...DefaultTheme, ...config.theme},
    specimens: {...DefaultSpecimens, ...config.specimens},
    pages,
    pageTree
  };
};
