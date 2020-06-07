import React from "react";
import PropTypes from "prop-types";
import { Link as RouterLink, useRouter } from "../Router";
import { parsePath, isInternalPath, getPublicPath } from "../../utils/path";
import { useCatalog } from "../CatalogContext";

const Link = ({ to, ...rest }) => {
  const catalog = useCatalog();
  const { page } = useRouter();
  const parsedTo = parsePath(to, { ...catalog, page });

  return isInternalPath(parsedTo, catalog) ? (
    <RouterLink href={parsedTo} {...rest} />
  ) : (
    <a href={getPublicPath(to, catalog)} {...rest} />
  );
};

Link.propTypes = {
  to: PropTypes.string.isRequired,
};

export default Link;
