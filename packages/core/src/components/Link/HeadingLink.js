import PropTypes from "prop-types";
import React from "react";
import Link from "./Link";
import { css } from "../../emotion";
import { useCatalog } from "../CatalogContext";

const style = (theme) => ({
  headingLink: {
    color: theme.lightColor,
    textDecoration: "none",
    ":hover": {
      color: theme.linkColor,
    },
  },
});

const HeadingLink = ({ slug, ...rest }) => {
  const { catalog } = useCatalog();
  return (
    <Link
      className={"HeadingLink " + css(style(catalog.theme).headingLink)}
      title={"Link to this section"}
      to={`#${slug}`}
      aria-hidden
      {...rest}
    >
      #
    </Link>
  );
};

HeadingLink.propTypes = {
  slug: PropTypes.string.isRequired,
};

export default HeadingLink;
