// TODO bring back page styles and scripts

const pageReducer = (pages, page) => {
  return [
    ...pages,
    {
      ...page,
      path: page.path || `/${page.name}`,
      pages: page.pages ? page.pages.reduce(pageReducer, []) : null
    }
  ];
};

const flattenPages = (pages) => {
  return pages.reduce((flattened, page) => {
    return flattened.concat(page).concat(page.pages ? page.pages : []);
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
