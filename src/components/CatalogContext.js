import React, {Component, PropTypes, Children} from 'react';
import DefaultTheme from 'DefaultTheme';
import parseConfiguration from 'core/parseConfiguration';
import ContextApp from 'components/App/ContextApp';
import CatalogPropTypes from 'core/PropTypes';

class CatalogContext extends Component {
  getChildContext() {
    const {title, theme, logoSrc, pages, pageList, pageNames, pageIndex} = this.props.configuration;
    const {location} = this.context;
    return {
      page: pageIndex[location.pathname],
      theme,
      title,
      pages,
      pageList,
      pageNames,
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
  pages: PropTypes.array.isRequired,
  pageList: PropTypes.arrayOf(CatalogPropTypes.page).isRequired,
  pageNames: PropTypes.arrayOf(PropTypes.string).isRequired,
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
    <CatalogContext
      configuration={configuration}
    >
      <ContextApp>{children}</ContextApp>
    </CatalogContext>
  );

  return ConfiguredCatalogContext;
}
