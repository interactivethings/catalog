const flattenPageTree = (pageTree) => {
  return pageTree
    .reduce((pages, page) => pages.concat(page.pages ? [page, ...page.pages] : [page]), [])
    .filter((page) => page.src)
    .map((page, i) => ({...page, index: i}));
};

export default (configuration) => {
  const pageReducer = (pages, page) => {
    const configurationStyles = configuration.styles || [];
    const pageStyles = page.styles || [];
    const configurationScripts = configuration.scripts || [];
    const pageScripts = page.scripts || [];

    return [
      ...pages,
      {
        ...page,
        path: page.path || `/${page.name}`,
        pages: page.pages ? page.pages.reduce(pageReducer, []).map((p) => ({...p, superTitle: page.title})) : null,
        styles: Array.from(new Set([...configurationStyles, ...pageStyles])),
        scripts: Array.from(new Set([...configurationScripts, ...pageScripts]))
      }
    ];
  };

  const pageTree = configuration.pages.reduce(pageReducer, []).map((p) => ({...p, superTitle: configuration.title}));
  const pages = flattenPageTree(pageTree);

  return {
    pages,
    pageTree
  };
};
