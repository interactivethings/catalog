import PropTypes from "prop-types";
import React, { Component } from "react";
import { catalogShape } from "../../CatalogPropTypes";
import FrameComponent from "./FrameComponent";
import { css } from "../../emotion";

const frameStyle = {
  width: "100%",
  height: "100%",
  lineHeight: 0,
  margin: 0,
  padding: 0,
  border: "none"
};

const renderStyles = styles => {
  return styles.map((src, i) => (
    <link key={i} href={src} rel="stylesheet" type="text/css" />
  ));
};

export default class Frame extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { children, width, parentWidth, scrolling, background } = this.props;
    const { catalog: { page: { styles } } } = this.context;
    const height = this.state.height || this.props.height;
    const autoHeight = !this.props.height;
    const scale = Math.min(1, parentWidth / width);
    const scaledHeight = autoHeight ? height : height * scale;

    return (
      <div
        className={css({
          lineHeight: 0,
          width: parentWidth,
          height: scaledHeight
        })}
      >
        <div
          style={{
            width: width,
            height: height,
            transformOrigin: "0% 0%",
            transform: `scale( ${scale} )`,
            overflow: "hidden"
          }}
        >
          <FrameComponent
            style={{
              ...frameStyle,
              background: background,
              overflow: scrolling ? "auto" : "hidden"
            }}
            head={[
              <style key="stylereset">
                {"html,body{margin:0;padding:0;}"}
              </style>,
              ...renderStyles(styles)
            ]}
            onRender={
              autoHeight
                ? content => {
                    const contentHeight = content.offsetHeight;
                    if (contentHeight !== height) {
                      this.setState({ height: contentHeight });
                    }
                  }
                : () => null
            }
          >
            {children}
          </FrameComponent>
        </div>
      </div>
    );
  }
}

Frame.propTypes = {
  children: PropTypes.element,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  parentWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  scrolling: PropTypes.bool,
  background: PropTypes.string
};

Frame.contextTypes = {
  catalog: catalogShape.isRequired
};
