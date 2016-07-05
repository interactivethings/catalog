import React, {Component, PropTypes, Children} from 'react';
import App from './App/App';
import {catalogShape} from '../CatalogPropTypes';

const fallbackPathRe = /\*$/;

class CatalogContext extends Component {
  getChildContext() {
    const {inject, title, theme, logoSrc, pages, pageTree, specimens, basePath} = this.props.configuration;
    const {router} = this.context;
    return {
      catalog: {
        page: pages.find((p) => router.isActive(p.path) || fallbackPathRe.test(p.path)),
        getSpecimen: (specimen) => specimens[specimen],
        theme,
        inject,
        title,
        pages: pages.filter((p) => !p.hideFromMenu),
        pageTree,
        basePath,
        logoSrc
      }
    };
  }

  render() {
    const {children} = this.props;
    return Children.only(children);
  }
}

CatalogContext.propTypes = {
  configuration: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired
};

CatalogContext.contextTypes = {
  // From react-router
  router: PropTypes.object.isRequired
};

CatalogContext.childContextTypes = {
  catalog: catalogShape.isRequired
};

export default function createCatalogContext(config) {
  const ConfiguredCatalogContext = ({children}) => (
    <CatalogContext configuration={config}>
      <App>{children}</App>
    </CatalogContext>
  );

  ConfiguredCatalogContext.propTypes = {
    children: PropTypes.element.isRequired
  };

  return ConfiguredCatalogContext;
}
