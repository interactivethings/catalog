import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Router, applyRouterMiddleware, browserHistory, hashHistory} from 'react-router';
import {useScroll} from 'react-router-scroll';
import seqKey from '../utils/seqKey';

import configureRoutes from '../configureRoutes';

export default class Catalog extends Component {
  constructor() {
    super();
    this.getKey = seqKey('CatalogRouter');
    this.state = {
      routerKey: this.getKey()
    };
  }
  componentWillReceiveProps() {
    this.setState({
      routerKey: this.getKey()
    });
  }
  render() {
    const configuration = this.props;
    const {routerKey} = this.state;
    const history = configuration.useBrowserHistory ?
      browserHistory : useRouterHistory(createHashHistory)({queryKey: false});
    return (
      <Router
        key={routerKey}
        history={history}
        routes={configureRoutes(configuration)}
        render={applyRouterMiddleware(useScroll())}
      />
    );
  }
}

Catalog.propTypes = {
  useBrowserHistory: PropTypes.bool
};
