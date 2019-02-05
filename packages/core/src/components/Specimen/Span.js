import React from "react";
import PropTypes from "prop-types";
import { css } from "../../emotion";

const Span = ({ span = 6, children }) => {
  const style = {
    boxSizing: "border-box",
    display: "flex",
    flexBasis: "100%",
    // Bug fix for Firefox; width and flexBasis don't work on horizontally scrolling code blocks
    maxWidth: "100%",
    flexWrap: "wrap",
    margin: "24px 0 0 0",
    padding: 0,
    position: "relative",
    "@media (min-width: 640px)": {
      flexBasis: `calc(${(span / 6) * 100}% - 10px)`,
      // Bug fix for Firefox; width and flexBasis don't work on horizontally scrolling code blocks
      maxWidth: `calc(${(span / 6) * 100}% - 10px)`,
      margin: "24px 10px 0 0"
    }
  };
  return <div className={css(style)}>{children}</div>;
};

Span.propTypes = {
  span: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  children: PropTypes.node
};

export default Span;
