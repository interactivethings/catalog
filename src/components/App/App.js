import React, { PropTypes } from 'react';
import CatalogPropTypes from 'core/PropTypes';

import AppLayout from './AppLayout';
import Menu from 'components/Menu/Menu';

class App extends React.Component {
  render() {
    return (
      <AppLayout
        {...this.props}
        sideNav={<Menu {...this.props} />}
      >
        {
         this.props.children
        }
      </AppLayout>
    );
  }
}

App.defaultProps = {
  styles: [],
  scripts: []
};

App.propTypes = {
  title: PropTypes.string.isRequired,
  pages: CatalogPropTypes.pages.isRequired,
  page: CatalogPropTypes.page.isRequired,
  styles: PropTypes.arrayOf(PropTypes.string),
  scripts: PropTypes.arrayOf(PropTypes.string),
  theme: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired
};

export default App;
