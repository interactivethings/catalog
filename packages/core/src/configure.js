import { parse as urlParse } from "url";
import warning from "./utils/warning";
import { parsePath, addLeadingSlash, stripTrailingSlashes } from "./utils/path";
import DefaultTheme from "./DefaultTheme";
import DefaultResponsiveSizes from "./DefaultResponsiveSizes";
import specimens from "./specimens";
import requireModuleDefault from "./utils/requireModuleDefault";
import NotFound from "./components/Page/NotFound";

const has = key => o => o.hasOwnProperty(key);
const hasName = has("name");
const hasTitle = has("title");
const hasSrc = has("src");
const hasPages = has("pages");
const hasComponent = has("component");
const hasContent = has("content");
const hasEither = (...matchers) => o => {
  const matchCount = matchers.reduce(
    (count, match) => count + (match(o) ? 1 : 0),
    0
  );
  return matchCount === 1;
};

const flattenPageTree = pageTree => {
  return pageTree
    .reduce(
      (pages, page) =>
        pages.concat(page.pages ? [page, ...page.pages] : [page]),
      []
    )
    .filter(page => page.src || page.component)
    .map((page, index) => ({
      ...page,
      ...(page.hideFromMenu ? undefined : { index })
    }));
};

const getPublicUrl = () =>
  typeof process !== "undefined" && process.env.PUBLIC_URL
    ? process.env.PUBLIC_URL
    : "/";

export default config => {
  let pageId = 0;
  const publicUrl = stripTrailingSlashes(config.publicUrl || getPublicUrl());
  const basePath = config.useBrowserHistory
    ? addLeadingSlash(
        stripTrailingSlashes(
          config.basePath || urlParse(publicUrl).pathname || ""
        )
      )
    : addLeadingSlash(stripTrailingSlashes(config.basePath || ""));

  const pageReducer = (pages, page) => {
    const configStyles = config.styles || [];
    const pageStyles = page.styles || [];
    const configScripts = config.scripts || [];
    const pageScripts = page.scripts || [];

    warning(
      !hasName(page),
      "The page configuration property `name` is deprecated; use `path` instead.",
      page
    );

    warning(
      hasTitle(page),
      "The page configuration property `title` is missing.",
      page
    );

    warning(
      !hasSrc(page) || typeof page.src === "string",
      "The page configuration property `src` must be a string.",
      page
    );

    warning(
      !hasComponent(page) ||
        typeof requireModuleDefault(page.component) === "function",
      "The page configuration property `component` must be a React component.",
      page
    );

    warning(
      !hasContent(page) ||
        typeof requireModuleDefault(page.content) === "function",
      "The page configuration property `content` must be a React component.",
      page
    );

    warning(
      hasEither(hasSrc, hasComponent, hasPages, hasContent)(page),
      "The page configuration should (only) have one of these properties: `src`, `component`, `content` or `pages`.",
      page
    );

    return [
      ...pages,
      {
        ...page,
        id: ++pageId,
        // Alias page.content to page.component
        ...(page.content
          ? { component: page.content, content: undefined }
          : undefined),
        // Currently, catalog can't be nested inside other page routes, it messes up <Link> matching. Use `basePath`
        path: page.pages
          ? null
          : parsePath(page.path || page.name, { basePath }).pathname,
        pages: page.pages
          ? page.pages
              .reduce(pageReducer, [])
              .map(p => ({ ...p, superTitle: page.title }))
          : null,
        styles: Array.from(new Set([...configStyles, ...pageStyles])),
        scripts: Array.from(new Set([...configScripts, ...pageScripts])),
        imports: { ...config.imports, ...page.imports }
      }
    ];
  };

  const pageTree = config.pages
    .reduce(pageReducer, [])
    .map(p => ({ ...p, superTitle: config.title }))
    .concat({
      path: parsePath("/*", { basePath }).pathname,
      id: ++pageId,
      component: NotFound,
      title: "Page Not Found",
      superTitle: config.title,
      scripts: [],
      styles: [],
      imports: {},
      hideFromMenu: true
    });
  const pages = flattenPageTree(pageTree);

  return {
    ...config,
    // Used to check in configureRoutes() if input is already configured
    __catalogConfig: true,
    theme: { ...DefaultTheme, ...config.theme },
    responsiveSizes: config.responsiveSizes || DefaultResponsiveSizes,
    specimens: { ...specimens, ...config.specimens },
    basePath,
    publicUrl,
    pages,
    pageTree
  };
};
