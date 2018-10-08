import PropTypes from "prop-types";
import React from "react";
import Preview from "./Preview";
import { css } from "../../emotion";
import { text } from "../../styles/typography";

function getStyle(theme) {
  return {
    tabContainer: {
      background: "white",
      display: "flex",
      overflowX: "auto",
      width: "100%",
      flexShrink: 0
    },
    tab: {
      ...text(theme),
      alignItems: "center",
      background: "#eee",
      boxSizing: "border-box",
      color: "#777",
      cursor: "pointer",
      display: "flex",
      lineHeight: theme.msRatio,
      flexBasis: "100%",
      flexDirection: "row",
      padding: "10px",
      transition: ".2s background-color, .4s color"
    },
    tabActive: {
      background: "white",
      fontWeight: "bold",
      color: theme.brandColor,
      cursor: "auto"
    },
    description: {
      paddingLeft: 5
    },
    tabDimension: {
      color: "#777",
      display: "block",
      fontFamily: theme.fontMono,
      fontSize: "smaller",
      fontWeight: "normal",
      marginTop: 2,
      opacity: 0.6
    }
  };
}

const ResponsiveTabs = ({ sizes, action, activeSize, theme, parentWidth }) => {
  const styles = getStyle(theme);
  return (
    <div className={css(styles.tabContainer)}>
      {sizes.map((val, i) => {
        const isTabActive = activeSize.name === val.name;
        const activeStyles = isTabActive && styles.tabActive;
        return (
          <div
            key={i}
            className={css({ ...styles.tab, ...activeStyles })}
            onClick={() => action(val)}
          >
            <Preview proportion={val.width / val.height} />
            <div className={css(styles.description)}>
              {val.name}
              <div className={css(styles.tabDimension)}>
                {val.width}×{val.height}
                &thinsp;
                {parentWidth <= val.width && "(scaled)"}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

ResponsiveTabs.propTypes = {
  sizes: PropTypes.array,
  action: PropTypes.func,
  activeSize: PropTypes.object,
  theme: PropTypes.object,
  parentWidth: PropTypes.number
};

export default ResponsiveTabs;
