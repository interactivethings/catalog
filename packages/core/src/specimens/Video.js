import React from "react";
import { catalogShape } from "../CatalogPropTypes";
import PropTypes from "prop-types";
import { css } from "../emotion";
import Specimen from "../components/Specimen/Specimen";
import { getPublicPath } from "../utils/path";

import { heading } from "../styles/typography";

class Video extends React.Component {
  render() {
    const {
      src,
      title,
      muted,
      loop,
      autoplay,
      catalog,
      catalog: { theme }
    } = this.props;
    const parsedSrc = getPublicPath(src, catalog);
    let styles = {
      section: {
        display: "flex",
        flexFlow: "row wrap",
        width: "100%"
      },
      container: {
        boxSizing: "border-box",
        margin: "0 10px 10px 0",
        padding: 0,
        position: "relative"
      },
      title: {
        ...heading(theme, 1),
        margin: 0
      }
    };

    return (
      <section className={css(styles.section)}>
        <video
          src={parsedSrc}
          autoPlay={autoplay}
          loop={loop}
          muted={muted}
          controls
          className={css({ width: "100%", height: "100%" })}
        >
          Open{" "}
          <a href={parsedSrc} target="_blank" rel="noopener noreferrer">
            video
          </a>{" "}
          in a new Tab
        </video>
        {title && <div className={css(styles.title)}>{title}</div>}
      </section>
    );
  }
}

Video.propTypes = {
  catalog: catalogShape.isRequired,
  src: PropTypes.string.isRequired,
  title: PropTypes.string,
  muted: PropTypes.bool,
  loop: PropTypes.bool,
  autoplay: PropTypes.bool
};

export default Specimen()(Video);
