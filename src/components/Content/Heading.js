import React from "react";
import PropTypes from "prop-types";
import HeadingLink from "../Link/HeadingLink";
import { catalogShape } from "../../CatalogPropTypes";
import { heading } from "../../styles/typography";
import { css } from "../../emotion";

const HeadingWithLink = ({ level, text, slug, catalog: { theme } }) => {
  const tag = "h" + level;

  const linkStyle = css({ display: "none" });

  const headingStyle = css(
    {
      ...heading(theme, 5 - level),
      flexBasis: "100%",
      margin: `48px 0 0 0`,
      "blockquote + &, h1 + &, h2 + &, h3 + &, h4 + &, h5 + &, h6 + &": {
        margin: `16px 0 0 0`
      },
      [`&:hover .${linkStyle}`]: { display: "inline" }
    },
    { label: tag }
  );

  return React.createElement(
    tag,
    { id: slug, className: headingStyle },
    text,
    " ",
    <span className={linkStyle}>
      <HeadingLink slug={slug} />
    </span>
  );
};

const PlainHeading = ({ level, text }) => {
  const tag = "h" + level;
  return React.createElement(tag, null, text);
};

const Heading = ({ level, text, slug }, { catalog }) =>
  slug ? (
    <HeadingWithLink level={level} text={text} slug={slug} catalog={catalog} />
  ) : (
    <PlainHeading level={level} text={text} catalog={catalog} />
  );

Heading.propTypes = HeadingWithLink.propTypes = PlainHeading.propTypes = {
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]).isRequired,
  text: PropTypes.array.isRequired,
  slug: PropTypes.string
};

Heading.contextTypes = {
  catalog: catalogShape.isRequired
};

export default Heading;
