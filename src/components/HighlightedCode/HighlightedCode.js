import PropTypes from "prop-types";
import React, { Component } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-markdown";
import { css } from "../../emotion";
import { text } from "../../styles/typography";

const getStyle = theme => {
  return {
    pre: {
      ...text(theme, -0.5),
      background: "#fff",
      border: "none",
      boxSizing: "border-box",
      color: theme.codeColor,
      display: "block",
      height: "auto",
      margin: 0,
      overflow: "auto",
      WebkitOverflowScrolling: "touch",
      padding: 20,
      whiteSpace: "pre",
      width: "100%"
    },
    code: {
      fontFamily: theme.fontMono,
      fontWeight: 400
    }
  };
};

const isToken = t => t instanceof Prism.Token;

const renderPrismTokens = (tokens, styles) => {
  return tokens.map((t, i) => {
    if (isToken(t)) {
      return (
        <span key={`${t.type}-${i}`} className={css(styles[t.type])}>
          {Array.isArray(t.content)
            ? renderPrismTokens(t.content, styles)
            : t.content}
        </span>
      );
    }

    if (typeof t === "string") {
      return t;
    }

    throw Error("wat");
  });
};

export default class HighlightedCode extends Component {
  render() {
    const { language, theme, code } = this.props;
    const styles = getStyle(theme);
    const lang = Prism.languages.hasOwnProperty(language) ? language : null;

    return (
      <pre className={css(styles.pre)}>
        <code className={css(styles.code)}>
          {lang
            ? renderPrismTokens(
                Prism.tokenize(code, Prism.languages[lang], lang),
                theme.codeStyles
              )
            : code}
        </code>
      </pre>
    );
  }
}

HighlightedCode.propTypes = {
  language: PropTypes.string,
  theme: PropTypes.object.isRequired,
  code: PropTypes.string.isRequired
};
