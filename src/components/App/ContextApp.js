import React, { PropTypes, Children } from 'react';
import CatalogPropTypes from 'core/PropTypes';

import AppLayout from './AppLayout';
import Menu from 'components/Menu/Menu';

class App extends React.Component {
  render() {
    return (
      <AppLayout
        {...this.context}
        sideNav={<Menu {...this.context} />}
      >
        {
         Children.only(this.props.children)
        }
      </AppLayout>
    );
  }
}

App.contextTypes = {
  title: PropTypes.string.isRequired,
  page: CatalogPropTypes.page.isRequired,
  pages: CatalogPropTypes.pages.isRequired,
  pageTree: CatalogPropTypes.pages.isRequired,
  theme: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  logoSrc: PropTypes.string
};

App.propTypes = {
  children: PropTypes.element.isRequired
};

export default App;
