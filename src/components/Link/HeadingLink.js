import PropTypes from "prop-types";
import React from "react";
import Link from "./Link";
import { catalogShape } from "../../CatalogPropTypes";

const style = theme => ({
  headingLink: {
    color: theme.lightColor,
    fill: theme.lightColor,
    ":hover": {
      color: theme.linkColor,
      fill: theme.linkColor,
      textDecoration: "none"
    }
  }
});

const HeadingLink = ({ slug, ...rest }, { catalog }) => {
  return (
    <Link
      className="HeadingLink"
      title={"Link to this section"}
      to={`#${slug}`}
      aria-hidden
      style={style(catalog.theme).headingLink}
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
