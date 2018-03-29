import React from "react";
import PropTypes from "prop-types";
import { Link as RouterLink, NavLink as RouterNavLink } from "react-router-dom";
import { catalogShape } from "../../CatalogPropTypes";
import { parsePath, isInternalPath, getPublicPath } from "../../utils/path";

const Link = ({ to, nav, ...rest }, { catalog }) => {
  const parsedTo = parsePath(to, catalog);
  // eslint-disable-next-line no-nested-ternary
  return isInternalPath(parsedTo, catalog) ? (
    nav ? (
      <RouterNavLink exact to={parsedTo} {...rest} />
    ) : (
      <RouterLink to={parsedTo} {...rest} />
    )
  ) : (
    <a href={getPublicPath(to, catalog)} {...rest} />
  );
};

Link.propTypes = {
  to: PropTypes.string.isRequired,
  nav: PropTypes.bool
};

Link.contextTypes = {
  catalog: catalogShape.isRequired
};

export default Link;
