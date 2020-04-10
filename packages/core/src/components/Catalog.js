import PropTypes from "prop-types";
import React, { Component } from "react";
import { Router } from "./Router";

import configure from "../configure";
import { CatalogContextProvider } from "./CatalogContext";
import App from "./App/App";

export default class Catalog extends Component {
  render() {
    const config = configure(this.props);
    const { pages, useBrowserHistory } = config;
    return (
      <CatalogContextProvider configuration={config}>
        <Router useBrowserHistory={useBrowserHistory} pages={pages}>
          {({ page }) => <App>{React.createElement(page.component)}</App>}
        </Router>
      </CatalogContextProvider>
    );
  }
}

Catalog.propTypes = {
  useBrowserHistory: PropTypes.bool,
};
