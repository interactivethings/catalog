const flattenPages = (pages) => {
  return pages
    .reduce((flattened, page) => flattened.concat(page.pages ? [page, ...page.pages] : [page]), [])
    .filter((page) => page.src);
};

const indexPages = (flattenedPages) => {
  return flattenedPages.reduce((index, page) => {
    return {
      ...index,
      [page.path]: page
    };
  }, {});
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

  const pages = configuration.pages.reduce(pageReducer, []).map((p) => ({...p, superTitle: configuration.title}));
  const pageList = flattenPages(pages);
  const pageIndex = indexPages(pageList);

  return {
    pages,
    pageList,
    pageIndex
  };
};
