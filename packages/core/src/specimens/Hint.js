import React from "react";
import { catalogShape } from "../CatalogPropTypes";
import { css, cx } from "../emotion";
import PropTypes from "prop-types";
import renderMarkdown from "../markdown/renderMarkdown";
import Specimen from "../components/Specimen/Specimen";
import { text, heading } from "../styles/typography";

function getStyle(theme) {
  return {
    container: {
      flexBasis: "100%"
    },
    hint: {
      // Contrast: AAA / AA
      ...text(theme),
      background: "#fff6dd",
      border: "1px solid #ffefaa",
      borderRadius: "2px",
      color: "#966900",
      padding: "20px",
      "& code": {
        display: "inline-block",
        border: "1px solid rgba(0,0,0,.035)",
        borderRadius: 1,
        background: "rgba(0,0,0,.03)",
        fontFamily: theme.fontMono,
        fontSize: `${Math.pow(theme.msRatio, -0.5)}em`,
        lineHeight: 1,
        padding: "0.12em 0.2em",
        textIndent: 0
      },
      "& :first-child": {
        marginTop: 0
      },
      "& :last-child": {
        marginBottom: 0
      },
      "& a, & a:hover, & a:visited": {
        color: "currentColor",
        textDecoration: "underline"
      },
      "& a:focus": {
        color: theme.linkColor
      },
      "& p, & ul, & ol, & li, & blockquote": {
        color: `currentColor`
      }
    },
    neutral: {
      // Contrast: AAA / AA
      background: "#f9f9f9",
      color: "#666666",
      border: "1px solid #eee"
    },
    important: {
      // Contrast: AAA / AAA
      background: "#ffffff",
      color: "#333333",
      border: "1px solid #eee"
    },
    warning: {
      // Contrast: AAA / AA
      background: "#fff5f5",
      border: "1px solid #ffdddd",
      color: "#ce3737"
    },
    directive: {
      // Contrast: AAA / AA
      background: "#eafaea",
      border: "1px solid #bbebc8",
      color: "#1d7d3f"
    }
  };
}

class Hint extends React.Component {
  render() {
    const {
      catalog: { theme },
      children,
      warning,
      neutral,
      important,
      directive
    } = this.props;
    const styles = getStyle(theme);

    const hintStyle = cx(css(styles.hint), {
      [css(styles.warning)]: warning,
      [css(styles.directive)]: directive,
      [css(styles.neutral)]: neutral,
      [css(styles.important)]: important
    });

    const markdownRenderer = {
      heading(textParts, level, raw) {
        const slug = this.slugger.slug(raw);
        return React.createElement(
          "h" + level,
          {
            key: slug,
            id: slug,
            className: css({
              ...heading(theme, Math.max(0, 3 - level)),
              color: "currentColor",
              margin: `48px 0 0 0`,
              "blockquote + &, h1 + &, h2 + &, h3 + &, h4 + &, h5 + &, h6 + &": {
                margin: `16px 0 0 0`
              }
            })
          },
          textParts
        );
      }
    };

    return (
      <div className={css(styles.container)}>
        <section className={hintStyle}>
          {typeof children === "string"
            ? renderMarkdown({
                text: children,
                renderer: markdownRenderer
              })
            : children}
        </section>
      </div>
    );
  }
}

Hint.propTypes = {
  children: PropTypes.node.isRequired,
  catalog: catalogShape.isRequired,
  warning: PropTypes.bool,
  neutral: PropTypes.bool,
  important: PropTypes.bool,
  directive: PropTypes.bool
};

export default Specimen(undefined, undefined, { withChildren: true })(Hint);
