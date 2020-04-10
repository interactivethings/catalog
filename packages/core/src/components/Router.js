import React, { useMemo, useState, useEffect, useContext } from "react";
import {
  createHashHistory,
  createBrowserHistory,
  createMemoryHistory,
  createLocation,
  createPath,
} from "history";
import NotFound from "./Page/NotFound";

const RouterContext = React.createContext();

export const useRouter = () => {
  return useContext(RouterContext);
};

export const Router = ({ useBrowserHistory, pages, children }) => {
  const isBrowser = typeof window !== "undefined";

  const history = useMemo(() => {
    if (!isBrowser) {
      return createMemoryHistory();
    }
    return useBrowserHistory ? createBrowserHistory() : createHashHistory();
  }, [isBrowser, useBrowserHistory]);

  const [location, setLocation] = useState(history.location);

  useEffect(() => {
    return history.listen((location) => setLocation(location));
  }, [history]);

  const page = pages.find((p) => p.path === location.pathname) || {
    path: "/*",
    id: pages.length + 1,
    component: NotFound,
    title: "Page Not Found",
    superTitle: "Hello",
    scripts: [],
    styles: [],
    imports: {},
    hideFromMenu: true,
  };

  console.log(
    pages.map((p) => p.path),
    page,
    location.pathname
  );

  const ctxValue = useMemo(() => {
    return { history, location, page };
  }, [history, location, page]);

  return (
    <RouterContext.Provider value={ctxValue}>
      {children({
        page,
      })}
    </RouterContext.Provider>
  );
};

export const Route = ({ path, children }) => {
  const routeLocation = createLocation(path);
  const { location } = useRouter();

  return routeLocation.pathname === location.pathname ? (
    <div>
      {JSON.stringify(location)}
      {children}
    </div>
  ) : null;
};

const shouldNavigate = (event, target) =>
  !event.defaultPrevented && // onClick prevented default
  event.button === 0 && // Ignore everything but left clicks
  (!target || target === "_self") && // Let browser handle "target=_blank" etc.
  !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

export const Link = ({ getProps, href, ...props }) => {
  const linkLocation = createLocation(href);
  const { history, location } = useRouter();

  const isCurrent = location.pathname === linkLocation.pathname;
  const linkProps =
    typeof getProps === "function" ? getProps({ isCurrent }) : {};

  return (
    <a
      onClick={(e) => {
        if (shouldNavigate(e, props.target)) {
          e.preventDefault();
          history.push(linkLocation);
        }
      }}
      href={createPath(linkLocation)}
      {...props}
      {...linkProps}
    />
  );
};
