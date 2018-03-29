import React from "react";
import { catalogShape } from "../CatalogPropTypes";
import PropTypes from "prop-types";
import { css } from "../emotion";
import Specimen from "../components/Specimen/Specimen";
import renderMarkdown from "../markdown/renderMarkdown";
import * as srcset from "srcset";
import { getPublicPath } from "../utils/path";

import { text, heading } from "../styles/typography";

class Image extends React.Component {
  render() {
    const {
      catalog,
      src,
      title,
      overlay,
      description,
      ...options
    } = this.props;
    const { theme } = catalog;
    const { scale = true, imageContainerStyle = {} } = options;

    const styles = {
      container: {
        position: "relative",
        width: "100%"
      },
      imageContainer: {
        boxSizing: "border-box",
        padding: "20px",
        background: `url(${theme.checkerboardPatternLight})`,
        color: theme.textColor,
        overflowX: "auto",
        ...imageContainerStyle
      },
      image: {
        display: "block",
        ...(scale ? { maxWidth: "100%" } : {})
      },
      overlay: {
        boxSizing: "border-box",
        opacity: 0,
        width: "100%",
        position: "absolute",
        padding: 20,
        top: 0,
        left: 0,
        ":hover": {
          opacity: 1
        }
      },
      meta: {
        margin: `20px 0 0 0`
      },
      title: {
        ...heading(theme, 0),
        color: theme.textColor,
        fontWeight: 700,
        margin: `0 0 8px 0`
      },
      description: {
        ...text(theme, -1),
        ":first-child": {
          marginTop: 0
        },
        ":last-child": {
          marginBottom: 0
        }
      },
      light: {
        background: `url(${theme.checkerboardPatternLight})`
      },
      dark: {
        background: `url(${theme.checkerboardPatternDark})`
      },
      plain: {
        background: "transparent",
        padding: 0
      },
      plain_light: {
        background: theme.bgLight,
        padding: "20px"
      },
      plain_dark: {
        background: theme.bgDark,
        padding: "20px"
      }
    };

    const backgroundStyle = {
      ...(options.plain ? styles.plain : null),
      ...(options.light ? styles.light : null),
      ...(options.dark ? styles.dark : null),
      ...(options.plain && options.light ? styles.plain_light : null),
      ...(options.plain && options.dark ? styles.plain_dark : null)
    };

    // Deconstruct srcset strings
    const imageSrcset = srcset
      .parse(src)
      .map(img => ({ ...img, url: getPublicPath(img.url, catalog) }));
    const overlaySrcset = overlay
      ? srcset
          .parse(overlay)
          .map(img => ({ ...img, url: getPublicPath(img.url, catalog) }))
      : [];

    const fallbackSrc = imageSrcset[0].url;
    const fallbackOverlay = overlay ? overlaySrcset[0].url : undefined;

    return (
      <div className={css(styles.container)}>
        <div className={css({ ...styles.imageContainer, ...backgroundStyle })}>
          <img
            className={css(styles.image)}
            srcSet={srcset.stringify(imageSrcset)}
            src={fallbackSrc}
          />
          {overlay && (
            <div
              className={css({
                ...styles.overlay,
                ...(options.plain && !options.light && !options.dark
                  ? { padding: 0 }
                  : null)
              })}
            >
              <img
                className={css(styles.image)}
                srcSet={srcset.stringify(overlaySrcset)}
                src={fallbackOverlay}
              />
            </div>
          )}
        </div>
        {(title || description) && (
          <div className={css(styles.meta)}>
            {title && <div className={css(styles.title)}>{title}</div>}
            {description && (
              <div className={css(styles.description)}>
                {renderMarkdown({ text: description })}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

Image.propTypes = {
  catalog: catalogShape.isRequired,
  src: PropTypes.string.isRequired,
  title: PropTypes.string,
  overlay: PropTypes.string,
  description: PropTypes.string,
  plain: PropTypes.bool,
  light: PropTypes.bool,
  dark: PropTypes.bool,
  scale: PropTypes.bool,
  imageContainerStyle: PropTypes.object
};

export default Specimen()(Image);
