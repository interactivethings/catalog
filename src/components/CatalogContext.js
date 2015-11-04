import React, {Component, PropTypes, Children} from 'react';
import DefaultTheme from 'DefaultTheme';
import parseConfiguration from 'core/parseConfiguration';
import ContextApp from 'components/App/ContextApp';
import CatalogPropTypes from 'core/PropTypes';

class CatalogContext extends Component {
  constructor(props, context) {
    super(props, context);
    this.pageConfiguration = parseConfiguration(props.configuration);
  }

  getChildContext() {
    const {title, theme, logoSrc} = this.props.configuration;
    const {pages, pageList, pageNames, pageIndex} = this.pageConfiguration;
    const {location} = this.context;
    return {
      theme: {...DefaultTheme, ...theme},
      page: pageIndex[location.pathname],
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

export default function createCatalogContext(configuration) {
  return class ConfiguredCatalogContext extends Component {
    render() {
      return <CatalogContext configuration={configuration}><ContextApp>{this.props.children}</ContextApp></CatalogContext>;
    }
  };
}
