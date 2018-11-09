import React from "react";
import PropTypes from "prop-types";
import { css, cx } from "./emotion";

const styled = (tag, styles) => {
  // eslint-disable-next-line react/prop-types
  const Styled = ({ className, ...props }, { catalog }) =>
    React.createElement(tag, {
      ...props,
      className: cx(
        css(typeof styles === "function" ? styles(props, catalog) : styles, {
          label: tag
        }),
        className
      )
    });

  Styled.displayName = `Styled.${tag}`;
  Styled.contextTypes = { catalog: PropTypes.object.isRequired };

  return Styled;
};

export default styled;
