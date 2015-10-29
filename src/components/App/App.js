import React, { PropTypes } from 'react';
import CatalogPropTypes from 'core/PropTypes';

import AppLayout from './AppLayout';
import Menu from 'components/Menu/Menu';

class App extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    pages: CatalogPropTypes.pages.isRequired,
    pageNames: PropTypes.arrayOf(PropTypes.string),
    page: CatalogPropTypes.page.isRequired,
    styles: PropTypes.arrayOf(PropTypes.string),
    scripts: PropTypes.arrayOf(PropTypes.string),
    theme: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired
  }
  static defaultProps = {
    styles: [],
    scripts: []
  }
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

export default App;
