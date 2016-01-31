import warning from './utils/warning';
import DefaultTheme from './DefaultTheme';

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

    warning(
      !page.name,
      'The page configuration property `name` is deprecated; use `path` instead.',
      page
    );

    warning(
      page.title,
      'The page configuration property `title` is missing.',
      page
    );

    warning(
      (page.src && !page.component && !page.pages) || (!page.src && page.component && !page.pages) || (!page.src && !page.component && page.pages),
      'The page configuration should (only) have one of these properties: `src`, `component` or `pages`.',
      page
    );


    return [
      ...pages,
      {
        ...page,
        id: ++pageId,
        // Currently, catalog can't be nested inside other page routes, it messes up <Link> matching. Use `basePath`
        path: removeMultiSlashes('/' + stripTrailingSlashes([basePath, page.path || page.name].join('/'))),
        pages: page.pages ? page.pages.reduce(pageReducer, []).map((p) => ({...p, superTitle: page.title})) : null,
        styles: Array.from(new Set([...configStyles, ...pageStyles])),
        scripts: Array.from(new Set([...configScripts, ...pageScripts])),
        imports: {...config.imports, ...page.imports}
      }
    ];
  };

  const pageTree = config.pages.reduce(pageReducer, []).map((p) => ({...p, superTitle: config.title}));
  const pages = flattenPageTree(pageTree);

  return {
    ...config,
    // Used to check in configureRoutes() if input is already configured
    __catalogConfig: true,
    theme: {...DefaultTheme, ...config.theme},
    specimens: {...config.specimens},
    pages,
    pageTree
  };
};
