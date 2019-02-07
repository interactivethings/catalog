import PropTypes from "prop-types";
import React from "react";
import Link from "./Link";
import { css } from "../../emotion";
import { CatalogContext } from "../CatalogContext";

const style = theme => ({
  headingLink: {
    color: theme.lightColor,
    textDecoration: "none",
    ":hover": {
      color: theme.linkColor
    }
  }
});

const HeadingLink = ({ slug, ...rest }) => {
  return (
    <CatalogContext.Consumer>
      {({ catalog }) => (
        <Link
          className={"HeadingLink " + css(style(catalog.theme).headingLink)}
          title={"Link to this section"}
          to={`#${slug}`}
          aria-hidden
          {...rest}
        >
          #
        </Link>
      )}
    </CatalogContext.Consumer>
  );
};

HeadingLink.propTypes = {
  slug: PropTypes.string.isRequired
};

export default HeadingLink;
