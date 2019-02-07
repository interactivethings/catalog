import React from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router";
import { parsePath, isInternalPath, getPublicPath } from "../../utils/path";
import { CatalogContext } from "../CatalogContext";

const Link = ({ to, ...rest }) => (
  <CatalogContext.Consumer>
    {({ catalog }) => {
      const parsedTo = parsePath(to, catalog);
      return isInternalPath(parsedTo, catalog) ? (
        <RouterLink to={parsedTo} {...rest} />
      ) : (
        <a href={getPublicPath(to, catalog)} {...rest} />
      );
    }}
  </CatalogContext.Consumer>
);

Link.propTypes = {
  to: PropTypes.string.isRequired
};

export default Link;
