import React, { Component } from "react";
import PropTypes from "prop-types";
import HeadingLink from "../Link/HeadingLink";
import { catalogShape } from "../../CatalogPropTypes";
import { headingBlock } from "../../styles/typography";
import { css } from "../../emotion";

class HeadingWithLink extends Component {
  constructor() {
    super();
    this.state = { hovered: false };
    this.hover = () => this.setState({ hovered: true });
    this.unHover = () => this.setState({ hovered: false });
  }

  render() {
    const { level, text, slug, catalog: { theme } } = this.props;
    const tag = "h" + level;
    const link = this.state.hovered ? <HeadingLink slug={slug} /> : null;

    console.log(headingBlock(theme, "", 5 - level));
    const linkCls = css`
      display: none;
    `;
    const className = css({
      ...headingBlock(theme, "xyz", 5 - level).xyz,
      "h1 + &": {
        margin: "0 0 0 0"
      },
      [`&:hover .${linkCls}`]: {
        display: "inline"
      }
    });

    return React.createElement(
      tag,
      { id: slug, className },
      text,
      " ",
      <span className={linkCls}>
        <HeadingLink slug={slug} />
      </span>
    );
  }
}

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
