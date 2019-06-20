import React from "react";
import PropTypes from "prop-types";
import DocumentTitle from "react-document-title";

import AppLayout from "./AppLayout";
import Menu from "../Menu/Menu";
import { CatalogContext } from "../CatalogContext";

const getDocumentTitle = ({ title, page }) =>
  title === page.superTitle
    ? `${page.superTitle} – ${page.title}`
    : `${title} – ${page.superTitle} – ${page.title}`;

class App extends React.Component {
  render() {
    // const { catalog } = this.context;

    // console.log(this.context, catalog);
    return (
      <CatalogContext.Consumer>
        {({ catalog }) => (
          <AppLayout {...catalog} sideNav={<Menu {...catalog} />}>
            <DocumentTitle title={getDocumentTitle(catalog)} />
            {this.props.children}
          </AppLayout>
        )}
      </CatalogContext.Consumer>
    );
  }
}

// App.contextType = CatalogContext;

App.propTypes = {
  children: PropTypes.element.isRequired
};

export default App;
