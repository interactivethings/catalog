import React from "react";
import { Route, Switch } from "react-router-dom";
import configure from "./configure";
import warning from "./utils/warning";
import requireModuleDefault from "./utils/requireModuleDefault";
import CatalogContext from "./components/CatalogContext";
import pageLoader from "./pageLoader";

// eslint-disable-next-line react/prop-types
const pageToJSXRoute = ({ path, component, src }) => (
  <Route
    key={`route-${path}`}
    exact
    path={path}
    component={component ? requireModuleDefault(component) : pageLoader(src)}
  />
);

const autoConfigure = config => {
  warning(
    !config.__catalogConfig,
    "The `configure` function is deprecated; use `configureRoutes` or `configureJSXRoutes` directly."
  );

  return config.__catalogConfig ? config : configure(config);
};

// export default config => {
//   const finalConfig = autoConfigure(config);
//   return {
//     component: CatalogContext(finalConfig),
//     childRoutes: finalConfig.pages.map(pageToRoute)
//   };
// };

export const configureJSXRoutes = config => {
  const finalConfig = autoConfigure(config);

  const Ctx = CatalogContext(finalConfig);
  return (
    <Ctx>
      <Switch>{finalConfig.pages.map(pageToJSXRoute)}</Switch>
    </Ctx>
  );
};

export default configureJSXRoutes;
