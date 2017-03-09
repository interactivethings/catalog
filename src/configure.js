import warning from './utils/warning';
import {parsePath, addLeadingSlash} from './utils/path';
import DefaultTheme from './DefaultTheme';
import DefaultResponsiveSizes from './DefaultResponsiveSizes';
import specimens from './specimens';
import requireModuleDefault from './utils/requireModuleDefault';
import NotFound from './components/Page/NotFound';

const has = (key) => (o) => o.hasOwnProperty(key);
const hasName = has('name');
const hasTitle = has('title');
const hasSrc = has('src');
const hasPages = has('pages');
const hasComponent = has('component');
const hasContent = has('content');

const flattenPageTree = (pageTree) => {
  return pageTree
    .reduce((pages, page) => pages.concat(page.pages ? [page, ...page.pages] : [page]), [])
    .filter((page) => page.src || page.component || page.content)
    .map((page, index) => ({...page, ...(page.hideFromMenu ? undefined : {index})}));
};

export default (config) => {
  let pageId = 0;
  const basePath = addLeadingSlash(config.basePath || '/');

  const pageReducer = (pages, page) => {
    const configStyles = config.styles || [];
    const pageStyles = page.styles || [];
    const configScripts = config.scripts || [];
    const pageScripts = page.scripts || [];

    warning(
      !hasName(page),
      'The page configuration property `name` is deprecated; use `path` instead.',
      page
    );

    warning(
      hasTitle(page),
      'The page configuration property `title` is missing.',
      page
    );

    warning(
      !hasSrc(page) || typeof page.src === 'string',
      'The page configuration property `src` must be a string.',
      page
    );

    warning(
      !hasComponent(page) || typeof requireModuleDefault(page.component) === 'function',
      'The page configuration property `component` must be a React component.',
      page
    );

    const isDirectory = !hasSrc(page) && !hasComponent(page) && hasPages(page) && !hasContent(page);
    const isSrc = hasSrc(page) && !hasComponent(page) && !hasPages(page) && !hasContent(page);
    const isComponent = !hasSrc(page) && hasComponent(page) && !hasPages(page) && !hasContent(page);
    const isContent = !hasSrc(page) && !hasComponent(page) && !hasPages(page) && hasContent(page);

    warning(
      (isDirectory || isSrc || isComponent || isContent),
      'The page configuration should (only) have one of these properties: `src`, `component`, `pages` or `content`.',
      page
    );


    return [
      ...pages,
      {
        ...page,
        id: ++pageId,
        // Currently, catalog can't be nested inside other page routes, it messes up <Link> matching. Use `basePath`
        path: page.pages ? null : parsePath(page.path || page.name, {basePath}).pathname,
        pages: page.pages ? page.pages.reduce(pageReducer, []).map((p) => ({...p, superTitle: page.title})) : null,
        styles: Array.from(new Set([...configStyles, ...pageStyles])),
        scripts: Array.from(new Set([...configScripts, ...pageScripts])),
        imports: {...config.imports, ...page.imports}
      }
    ];
  };

  const pageTree = config.pages.reduce(pageReducer, []).map((p) => ({...p, superTitle: config.title}))
    .concat({
      path: parsePath('/*', {basePath}).pathname,
      id: ++pageId,
      component: NotFound,
      title: 'Page Not Found',
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
    theme: {...DefaultTheme, ...config.theme},
    responsiveSizes: config.responsiveSizes || DefaultResponsiveSizes,
    specimens: {...specimens, ...config.specimens},
    basePath,
    pages,
    pageTree
  };
};
