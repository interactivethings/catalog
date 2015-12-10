import React, {Component, PropTypes, Children} from 'react';
import ContextApp from './App/ContextApp';
import CatalogPropTypes from '../CatalogPropTypes';

const matchPagePath = (pagePath, pathname) => {
  const re = new RegExp(`${pagePath}/?$`);
  return re.test(pathname);
}

class CatalogContext extends Component {
  getChildContext() {
    const {title, theme, logoSrc, pages, pageTree, specimens} = this.props.configuration;
    const {location} = this.context;
    return {
      page: pages.find((p) => matchPagePath(p.path, location.pathname)),
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
  location: PropTypes.object.isRequired
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
      <ContextApp>{children}</ContextApp>
    </CatalogContext>
  );

  return ConfiguredCatalogContext;
}
