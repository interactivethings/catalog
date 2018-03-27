import PropTypes from "prop-types";
import React from "react";
import Link from "./Link";
import { catalogShape } from "../../CatalogPropTypes";
import { css } from "../../emotion";

const style = theme => ({
  headingLink: {
    color: theme.lightColor,
    textDecoration: "none",
    ":hover": {
      color: theme.linkColor
    }
  }
});

const HeadingLink = ({ slug, ...rest }, { catalog }) => {
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
  slug: PropTypes.string.isRequired
};

HeadingLink.contextTypes = {
  catalog: catalogShape.isRequired
};

export default HeadingLink;
