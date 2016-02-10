import React, {Component, PropTypes, Children} from 'react';
import App from './App/App';
import CatalogPropTypes from '../CatalogPropTypes';

class CatalogContext extends Component {
  getChildContext() {
    const {title, theme, logoSrc, pages, pageTree, specimens} = this.props.configuration;
    const {router} = this.context;
    return {
      page: pages.find((p) => router.isActive(p.path)),
      getSpecimen: (specimen) => specimens[specimen],
      theme,
      title,
      pages,
      pageTree,
      logoSrc
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
  title: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  pages: CatalogPropTypes.pages.isRequired,
  pageTree: CatalogPropTypes.pages.isRequired,
  page: CatalogPropTypes.page.isRequired,
  logoSrc: PropTypes.string,
  getSpecimen: PropTypes.func.isRequired
};

export default function createCatalogContext(config) {
  const ConfiguredCatalogContext = ({children}) => (
    <CatalogContext configuration={config}>
      <App>{children}</App>
    </CatalogContext>
  );

  return ConfiguredCatalogContext;
}
