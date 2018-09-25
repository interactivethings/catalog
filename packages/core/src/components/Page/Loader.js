import React from "react";
import { css, keyframes } from "../../emotion";

const SHOW_AFTER_MS = 500;

const loaderKeyframes = keyframes(
  {
    "0%": { transform: "rotate(0deg)" },
    "50%": { transform: "rotate(180deg)" },
    "100%": { transform: "rotate(360deg)" }
  },
  "Loader"
);

const styles = {
  spinner: {
    borderColor: "#EEEEEE #D3D3D3 #B6B6B6 #999999",
    borderRadius: "50px",
    borderStyle: "solid",
    borderWidth: "3px",
    height: "50px",
    margin: "calc(50% - 25px) auto 0 auto",
    width: "50px",
    animation: `${loaderKeyframes} 2s linear infinite`
  },
  hidden: {
    display: "none"
  }
};

class Loader extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: false
    };
  }

  componentDidMount() {
    this.interval = setTimeout(
      () => this.setState({ visible: true }),
      SHOW_AFTER_MS
    );
  }

  componentWillUnmount() {
    if (this.interval) {
      clearTimeout(this.interval);
    }
  }

  render() {
    const loader = this.state.visible ? styles.spinner : styles.hidden;

    return <div className={css(loader)} />;
  }
}

export default Loader;
