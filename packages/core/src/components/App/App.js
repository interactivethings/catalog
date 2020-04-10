import React from "react";
import PropTypes from "prop-types";
import DocumentTitle from "react-document-title";

import AppLayout from "./AppLayout";
import Menu from "../Menu/Menu";
import { useCatalog } from "../CatalogContext";

const getDocumentTitle = ({ title, page }) =>
  title === page.superTitle
    ? `${page.superTitle} – ${page.title}`
    : `${title} – ${page.superTitle} – ${page.title}`;

const App = ({ children }) => {
  const { catalog } = useCatalog();

  return (
    <AppLayout {...catalog} sideNav={<Menu {...catalog} />}>
      <DocumentTitle title={getDocumentTitle(catalog)} />
      {children}
    </AppLayout>
  );
};

App.propTypes = {
  children: PropTypes.element.isRequired,
};

export default App;
