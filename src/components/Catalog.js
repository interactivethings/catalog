import React, {Component, PropTypes} from 'react';
import {Router, useRouterHistory, applyRouterMiddleware} from 'react-router';
import {createHashHistory} from 'history';
import useScroll from 'react-router-scroll';
import seqKey from '../utils/seqKey';

import configureRoutes from '../configureRoutes';

const history = useRouterHistory(createHashHistory)({queryKey: false});

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
    const {configuration} = this.props;
    const {routerKey} = this.state;
    return (
      <Router key={routerKey} history={history} routes={configureRoutes(configuration)} render={applyRouterMiddleware(useScroll())} />
    );
  }
}

Catalog.propTypes = {
  configuration: PropTypes.object.isRequired
};
