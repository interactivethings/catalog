import React, {Component, PropTypes} from 'react';
import {Router, useRouterHistory, applyRouterMiddleware, browserHistory} from 'react-router';
import {createHashHistory} from 'history';
import useScroll from 'react-router-scroll';
import seqKey from '../utils/seqKey';

import configureRoutes from '../configureRoutes';

const hashHistory = useRouterHistory(createHashHistory)({queryKey: false});

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
    const {useBrowserHistory, history, ...configuration} = this.props;
    const createHistory = () => {
      if (history) {
        return history;
      } else if (useBrowserHistory) {
        // DEPRECATED
        console.warn('DEPRECATED: useBrowserHistory is no longer supported, pass in an history instance instead.');
        return browserHistory;
      } else {
        return hashHistory;
      }
    }

    const {routerKey} = this.state;
    return (
      <Router
        key={routerKey}
        history={createHistory()}
        routes={configureRoutes(configuration)}
        render={applyRouterMiddleware(useScroll())}
      />
    );
  }
}

Catalog.propTypes = {
  history: PropTypes.object,
  useBrowserHistory: PropTypes.bool // DEPRECATED
};
