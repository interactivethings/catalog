import React from "react";
import PropTypes from "prop-types";
import Radium from "radium";
import { Link as RouterLink } from "react-router";
import { catalogShape } from "../../CatalogPropTypes";
import { parsePath, isInternalPath, getPublicPath } from "../../utils/path";

const RadiumRouterLink = Radium(RouterLink);

const Link = ({ to, ...rest }, { catalog }) => {
  const parsedTo = parsePath(to, catalog);
  return isInternalPath(parsedTo, catalog) ? (
    <RadiumRouterLink to={parsedTo} {...rest} />
  ) : (
    <a href={getPublicPath(to, catalog)} {...rest} />
  );
};

Link.propTypes = {
  to: PropTypes.string.isRequired
};

Link.contextTypes = {
  catalog: catalogShape.isRequired
};

export default Link;
