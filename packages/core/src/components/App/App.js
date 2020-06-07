import React, { useEffect } from "react";
import PropTypes from "prop-types";

import AppLayout from "./AppLayout";
import Menu from "../Menu/Menu";
import { useCatalog } from "../CatalogContext";
import { useRouter } from "../Router";

const getDocumentTitle = ({ title, page }) =>
  title === page.superTitle
    ? `${page.superTitle} – ${page.title}`
    : `${title} – ${page.superTitle} – ${page.title}`;

const App = ({ children }) => {
  const catalog = useCatalog();
  const { page } = useRouter();
  const documentTitle = getDocumentTitle({ title: catalog.title, page });
  useEffect(() => {
    document.title = documentTitle;
  }, [documentTitle]);

  return (
    <AppLayout {...catalog} page={page} sideNav={<Menu {...catalog} />}>
      {children}
    </AppLayout>
  );
};

App.propTypes = {
  children: PropTypes.element.isRequired,
};

export default App;
