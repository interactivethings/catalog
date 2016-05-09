import React, { PropTypes, Children } from 'react';
import {StyleRoot} from 'radium';
import {catalogShape} from '../../CatalogPropTypes';

import AppLayout from './AppLayout';
import Menu from '../Menu/Menu';

class App extends React.Component {
  render() {
    const {catalog, history, location} = this.context;
    return (
      <StyleRoot>
        <AppLayout
          {...catalog}
          sideNav={<Menu {...catalog} history={history} />}
        >
          {
           Children.only(this.props.children)
          }
        </AppLayout>
      </StyleRoot>
    );
  }
}

App.contextTypes = {
  catalog: catalogShape.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

App.propTypes = {
  children: PropTypes.element.isRequired
};

export default App;
