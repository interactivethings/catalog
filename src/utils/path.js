const removeMultiSlashes = (path) => path.replace(/\/+/g, '/');
const stripTrailingSlashes = (path) => path.replace(/\/+$/, '');
const addLeadingSlash = (path) => path.charAt(0) === '/' ? path : '/' + path;
const stripBasePath = (path, basePath) => basePath !== '/' && path.indexOf(basePath) === 0 ? path.substr(basePath.length) : path;

export const parsePath = (path, options) => {
  let pathname = stripBasePath(path, options.basePath);
  let hash = '';
  let anchor = null;

  const hashIndex = pathname.indexOf('#');
  if (hashIndex !== -1) {
    hash = pathname.substr(hashIndex);
    anchor = pathname.substr(hashIndex + 1);
    pathname = pathname.substr(0, hashIndex);
  }

  if (pathname === '' && options.page) {
    // fall back to current page path (already contains basePath)
    pathname = stripBasePath(options.page.path, options.basePath);
  }

  // join basePath
  pathname = addLeadingSlash(stripTrailingSlashes(removeMultiSlashes(options.basePath + '/' + pathname)));

  return options.useBrowserHistory
    ? {pathname, hash: hash === '#' ? '' : hash}
    : {pathname, query: anchor ? {a: anchor} : {}};
};

export const isInternalPath = (path, options) => {
  const {pathname} = parsePath(path, options);
  return options.pagePaths.has(pathname);
};
