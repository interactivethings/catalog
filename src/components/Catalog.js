import PropTypes from "prop-types";
import React, { Component } from "react";
import { BrowserRouter, HashRouter, withRouter } from "react-router-dom";

import configureRoutes from "../configureRoutes";

class _ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

_ScrollToTop.propTypes = {
  location: PropTypes.object.isRequired,
  children: PropTypes.element
};

const ScrollToTop = withRouter(_ScrollToTop);

// eslint-disable-next-line react/no-multi-comp
export default class Catalog extends Component {
  render() {
    const configuration = this.props;

    const Router = configuration.useBrowserHistory ? BrowserRouter : HashRouter;
    const routes = configureRoutes(configuration);
    return (
      <Router>
        <ScrollToTop>{routes}</ScrollToTop>
      </Router>
    );
  }
}

Catalog.propTypes = {
  useBrowserHistory: PropTypes.bool
};
