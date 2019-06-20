import PropTypes from "prop-types";
import React, { Component } from "react";
import { Router } from "./Router";

import configure from "../configure";
import { CatalogContextProvider } from "./CatalogContextProvider";
import App from "./App/App";

export default class Catalog extends Component {
  render() {
    const config = configure(this.props);
    const { pages, useBrowserHistory } = config;
    return (
      <Router useBrowserHistory={useBrowserHistory} pages={pages}>
        {({ page }) => (
          <CatalogContextProvider configuration={config}>
            <App>{React.createElement(page.component)}</App>
          </CatalogContextProvider>
        )}
      </Router>
    );
  }
}

Catalog.propTypes = {
  useBrowserHistory: PropTypes.bool
};
