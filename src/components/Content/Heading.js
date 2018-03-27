import React, { Component } from "react";
import PropTypes from "prop-types";
import HeadingLink from "../Link/HeadingLink";

class HeadingWithLink extends Component {
  constructor() {
    super();
    this.state = { hovered: false };
    this.hover = () => this.setState({ hovered: true });
    this.unHover = () => this.setState({ hovered: false });
  }

  render() {
    const { level, text, slug } = this.props;
    const tag = "h" + level;
    const link = this.state.hovered ? <HeadingLink slug={slug} /> : null;

    return React.createElement(
      tag,
      { id: slug, onMouseEnter: this.hover, onMouseLeave: this.unHover },
      text,
      " ",
      link
    );
  }
}

const PlainHeading = ({ level, text }) => {
  const tag = "h" + level;
  return React.createElement(tag, null, text);
};

const Heading = ({ level, text, slug }) =>
  slug ? (
    <HeadingWithLink level={level} text={text} slug={slug} />
  ) : (
    <PlainHeading level={level} text={text} />
  );

Heading.propTypes = HeadingWithLink.propTypes = PlainHeading.propTypes = {
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]).isRequired,
  text: PropTypes.array.isRequired,
  slug: PropTypes.string
};

export default Heading;
