import React from "react";
import { catalogShape } from "../CatalogPropTypes";
import PropTypes from "prop-types";
import { css } from "../emotion";
import Specimen from "../components/Specimen/Specimen";
import { getPublicPath } from "../utils/path";

import { heading } from "../styles/typography";

class Audio extends React.Component {
  render() {
    const {
      src,
      title,
      loop,
      autoplay,
      catalog,
      catalog: { theme }
    } = this.props;
    const parsedSrc = getPublicPath(src, catalog);

    const styles = {
      section: {
        display: "flex",
        flexFlow: "row wrap",
        minWidth: "calc(100% + 10px)"
      },
      title: {
        ...heading(theme, 1),
        margin: 0
      },
      container: {
        width: "100%",
        background: theme.background
      }
    };

    const audioTitle =
      title !== undefined ? title : parsedSrc.split("/").slice(-1)[0];

    return (
      <div className={css(styles.container)}>
        <div className={css(styles.title)}>{audioTitle}</div>
        <audio
          className={css({ width: "100%" })}
          src={parsedSrc}
          autoPlay={autoplay}
          loop={loop}
          controls
        />
      </div>
    );
  }
}

Audio.propTypes = {
  catalog: catalogShape.isRequired,
  src: PropTypes.string.isRequired,
  title: PropTypes.string,
  loop: PropTypes.bool,
  autoplay: PropTypes.bool
};

Audio.defaultProps = {
  loop: false,
  autoplay: false
};

export default Specimen()(Audio);
