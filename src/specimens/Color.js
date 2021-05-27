import React from "react";
import { catalogShape } from "../CatalogPropTypes";
import PropTypes from "prop-types";
import { css } from "../emotion";
import { text } from "../styles/typography";
import Specimen from "../components/Specimen/Specimen";

class Color extends React.Component {
  render() {
    const {
      catalog: { theme },
      value,
      altValue,
      name
    } = this.props;
    const styles = {
      text: {
        ...text(theme),
        boxSizing: "border-box",
        padding: "8px 0",
        background: theme.background
      }
    };

    return (
      <div className={css({ width: "100%" })}>
        <div className={css({ height: 120, background: value })} />
        <div className={css(styles.text)}>
          {name}{" "}
          <div className={css({ fontFamily: theme.fontMono })}>{value}</div>
          <div className={css({ fontFamily: theme.fontMono })}>{altValue}</div>
        </div>
      </div>
    );
  }
}

Color.propTypes = {
  catalog: catalogShape.isRequired,
  value: PropTypes.string.isRequired,
  altValue: PropTypes.string,
  name: PropTypes.string
};

export default Specimen()(Color);
