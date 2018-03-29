import PropTypes from "prop-types";
import React, { Component, Children } from "react";
import { withRouter, matchPath } from "react-router-dom";
import App from "./App/App";
import { catalogShape } from "../CatalogPropTypes";

class CatalogContext extends Component {
  getChildContext() {
    const {
      title,
      theme,
      responsiveSizes,
      logoSrc,
      pages,
      pageTree,
      specimens,
      basePath,
      publicUrl,
      useBrowserHistory
    } = this.props.configuration;
    const { location } = this.props;
    return {
      catalog: {
        page: pages.find(
          p =>
            matchPath(location.pathname, { path: p.path, exact: true }) ||
            p.path === undefined
        ),
        getSpecimen: specimen => specimens[specimen],
        theme,
        responsiveSizes,
        title,
        pages: pages.filter(p => !p.hideFromMenu),
        pagePaths: new Set(pages.map(p => p.path)), // Used for internal link lookup
        pageTree,
        basePath,
        publicUrl,
        logoSrc,
        useBrowserHistory
      }
    };
  }

  render() {
    const { children } = this.props;
    return Children.only(children);
  }
}

CatalogContext.propTypes = {
  configuration: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
  // From react-router
  location: PropTypes.object.isRequired
};

CatalogContext.childContextTypes = {
  catalog: catalogShape.isRequired
};

const CatalogContextWithRouter = withRouter(CatalogContext);

export default function createCatalogContext(config) {
  const ConfiguredCatalogContext = ({ children }) => (
    <CatalogContextWithRouter configuration={config}>
      <App>{children}</App>
    </CatalogContextWithRouter>
  );

  ConfiguredCatalogContext.propTypes = {
    children: PropTypes.element.isRequired
  };

  return ConfiguredCatalogContext;
}
