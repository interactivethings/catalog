import DefaultTheme from 'DefaultTheme';

const flattenPageTree = (pageTree) => {
  return pageTree
    .reduce((pages, page) => pages.concat(page.pages ? [page, ...page.pages] : [page]), [])
    .filter((page) => page.src);
};

export default (config) => {
  let pageIndex = 0;

  const pageReducer = (pages, page) => {
    const configStyles = config.styles || [];
    const pageStyles = page.styles || [];
    const configScripts = config.scripts || [];
    const pageScripts = page.scripts || [];

    return [
      ...pages,
      {
        ...page,
        path: page.path || `/${page.name}`,
        index: ++pageIndex,
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
    pages,
    pageTree
  };
};
