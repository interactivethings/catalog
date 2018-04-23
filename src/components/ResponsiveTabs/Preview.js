import PropTypes from "prop-types";
import React from "react";
import { css } from "../../emotion";

/**
 * Generates a small preview showing the aspect ratio
 */

const Preview = ({ proportion }) => {
  if (!proportion) null;
  return (
    <div
      className={css({
        width: "30px",
        height: "30px",
        display: "inline-block",
        marginRight: 5
      })}
    >
      <svg viewBox={`0 0 2 2`}>
        <rect
          className={css({ fill: "#ccc" })}
          width={proportion}
          height={1}
          x={(2 - proportion) * 0.5}
          y="0.5"
        />
      </svg>
    </div>
  );
};

Preview.propTypes = {
  proportion: PropTypes.number.isRequired
};

export default Preview;
