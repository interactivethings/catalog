import React, {PropTypes} from 'react';
import Radium from 'radium';
import {Router} from 'react-router';

import configureRoutes from '../configureRoutes';


class CatalogRootComponent extends React.Component {
  render() {
    const {reactRouterHistory, reactRouterRender, catalogConfig} = this.props;
    const routes = configureRoutes(catalogConfig);

    return (
      <Router
        history={reactRouterHistory}
        routes={routes}
        render={reactRouterRender} />
    );
  }
}

const CatalogRoot = Radium(CatalogRootComponent);
export default CatalogRoot;


CatalogRootComponent.propTypes = {
  reactRouterHistory: PropTypes.object.isRequired,
  reactRouterRender: PropTypes.func,
  radiumConfig: PropTypes.object,
  catalogConfig: PropTypes.object.isRequired
};
