// TODO bring back page styles and scripts

const flattenPages = (pages) => {
  return pages.reduce((flattened, page) => {
    return flattened.concat(page.pages ? [page, ...page.pages] : [page]);
  }, []);
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
        pages: page.pages ? page.pages.reduce(pageReducer, []) : null,
        styles: Array.from(new Set([...configurationStyles, ...pageStyles])),
        scripts: Array.from(new Set([...configurationScripts, ...pageScripts]))
      }
    ];
  };

  const pages = configuration.pages.reduce(pageReducer, []);
  const pageList = flattenPages(pages);
  const pageIndex = indexPages(pageList);
  const pageNames = pageList.map((page) => page.name);

  return {
    pages,
    pageList,
    pageIndex,
    pageNames   
  };
};
