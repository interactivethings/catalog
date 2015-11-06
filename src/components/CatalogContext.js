import React, {Component, PropTypes, Children} from 'react';
import DefaultTheme from 'DefaultTheme';
import parseConfiguration from 'utils/parseConfiguration';
import ContextApp from 'components/App/ContextApp';
import CatalogPropTypes from 'CatalogPropTypes';

class CatalogContext extends Component {
  getChildContext() {
    const {title, theme, logoSrc, pages, pageTree} = this.props.configuration;
    const {location} = this.context;
    return {
      page: pages.find((p) => p.path === location.pathname),
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
  logoSrc: PropTypes.string
};

export default function createCatalogContext(config) {
  const configuration = {
    ...config,
    ...parseConfiguration(config),
    theme: {...DefaultTheme, ...config.theme}
  };

  const ConfiguredCatalogContext = ({children}) => (
    <CatalogContext configuration={configuration}>
      <ContextApp>{children}</ContextApp>
    </CatalogContext>
  );

  return ConfiguredCatalogContext;
}
