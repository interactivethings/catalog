import PropTypes from "prop-types";
import React from "react";
const CatalogContext = React.createContext();

export const useCatalog = () => {
  const catalogContext = React.useContext(CatalogContext);
  return catalogContext;
};

export const CatalogContextProvider = ({ children, configuration }) => {
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
    useBrowserHistory,
  } = configuration;

  return (
    <CatalogContext.Provider
      value={{
        catalog: {
          page: pages[0], // FIXME
          getSpecimen: (specimen) => specimens[specimen],
          theme,
          responsiveSizes,
          title,
          pages: pages.filter((p) => !p.hideFromMenu),
          pagePaths: new Set(pages.map((p) => p.path)), // Used for internal link lookup
          pageTree,
          basePath,
          publicUrl,
          logoSrc,
          useBrowserHistory,
        },
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
};

CatalogContextProvider.propTypes = {
  configuration: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
};
