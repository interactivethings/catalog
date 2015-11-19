import React, {Component, PropTypes} from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-markdown';
import {text} from '../../scaffold/typography';

const getStyle = (theme) => {
  return {
    pre: {
      ...text(theme, {level: 3}),
      background: '#fff',
      border: 'none',
      boxSizing: 'border-box',
      color: theme.textColor,
      display: 'block',
      height: 'auto',
      margin: 0,
      padding: 20,
      whiteSpace: 'pre-wrap',
      width: '100%',
      resize: 'vertical'
    },
    code: {
      fontFamily: theme.fontMono,
      fontWeight: 400
    }
  };
};

const isToken = (t) => t instanceof Prism.Token;

const renderPrismTokens = (tokens, styles) => {
  return tokens.map((t, i) => {
    if (isToken(t)) {
      return <span key={`${t.type}-${i}`} style={styles[t.type]}>{Array.isArray(t.content) ? renderPrismTokens(t.content, styles) : t.content}</span>;
    }

    if (typeof t === 'string') {
      return t;
    }

    throw Error('wat');
  });
};

export default class HighlightedCode extends Component {
  render() {
    const {language, theme, code} = this.props;
    const styles = getStyle(theme);

    return (
      <pre style={styles.pre}>
        <code style={styles.code}>
          {renderPrismTokens(Prism.tokenize(code, Prism.languages[language], language), theme.codeStyles)}
        </code>
      </pre>
    );
  }
}

HighlightedCode.propTypes = {
  language: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  code: PropTypes.string.isRequired
};

HighlightedCode.defaultProps = {
  language: 'markup'
};

