import React from "react";
import PropTypes from "prop-types";
import { css, cx } from "./emotion";

const styled = (tag, styles) => {
  const Styled = (props, { catalog }) =>
    React.createElement(tag, {
      ...props,
      className: cx(
        props.className,
        css(typeof styles === "function" ? styles(props, catalog) : styles, {
          label: tag
        })
      )
    });

  Styled.displayName = `Styled.${tag}`;
  Styled.contextTypes = { catalog: PropTypes.object.isRequired };

  return Styled;
};

export default styled;
