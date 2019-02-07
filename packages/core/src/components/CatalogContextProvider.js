import PropTypes from "prop-types";
import React, { Component } from "react";
import App from "./App/App";
import { CatalogContext } from "./CatalogContext";

const fallbackPathRe = /\*$/;

class CatalogContextProvider extends Component {
  render() {
    const { children } = this.props;
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
    const { router } = this.context;

    return (
      <CatalogContext.Provider
        value={{
          catalog: {
            page: pages.find(
              p => router.isActive(p.path) || fallbackPathRe.test(p.path)
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
        }}
      >
        {children}
      </CatalogContext.Provider>
    );
  }
}

CatalogContextProvider.propTypes = {
  configuration: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired
};

CatalogContextProvider.contextTypes = {
  // From react-router
  router: PropTypes.object.isRequired
};

export default function createCatalogContext(config) {
  const ConfiguredCatalogContext = ({ children }) => (
    <CatalogContextProvider configuration={config}>
      <App>{children}</App>
    </CatalogContextProvider>
  );

  ConfiguredCatalogContext.propTypes = {
    children: PropTypes.element.isRequired
  };

  return ConfiguredCatalogContext;
}
