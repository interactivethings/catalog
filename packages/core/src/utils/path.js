const removeMultiSlashes = path => path.replace(/\/+/g, "/");
export const stripTrailingSlashes = path => path.replace(/\/+$/, "");
export const addLeadingSlash = path =>
  path.charAt(0) === "/" ? path : "/" + path;
const stripBasePath = (path, basePath) =>
  basePath !== "/" && path.indexOf(basePath) === 0
    ? path.substr(basePath.length)
    : path;
const absoluteUrlRe = /^[a-z][a-z0-9+.-]*:/;

export const parsePath = (path, options) => {
  let pathname = path;
  let hash = "";
  let anchor = null;

  if (!absoluteUrlRe.test(pathname)) {
    const hashIndex = pathname.indexOf("#");
    if (hashIndex !== -1) {
      hash = pathname.substr(hashIndex);
      anchor = pathname.substr(hashIndex + 1);
      pathname = pathname.substr(0, hashIndex);
    }

    if (pathname === "" && options.page) {
      // fall back to current page path (already contains basePath)
      pathname = stripBasePath(options.page.path, options.basePath);
    }

    // join basePath
    pathname = addLeadingSlash(
      stripTrailingSlashes(
        removeMultiSlashes(
          options.basePath + "/" + stripBasePath(pathname, options.basePath)
        )
      )
    );
  }

  return options.useBrowserHistory
    ? { pathname, hash: hash === "#" ? "" : hash }
    : { pathname, query: anchor ? { a: anchor } : {} };
};

export const getPublicPath = (path, options) => {
  return absoluteUrlRe.test(path)
    ? path
    : options.publicUrl +
        addLeadingSlash(stripBasePath(path, options.basePath));
};

export const isInternalPath = (parsedPath, options) => {
  return options.pagePaths.has(parsedPath.pathname);
};
