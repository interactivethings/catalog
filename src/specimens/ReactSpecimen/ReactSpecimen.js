import React, { PropTypes, Component } from 'react';
import Specimen from '../../components/Specimen/Specimen';
import {text} from '../../scaffold/typography';
import reactElementToString from './reactElementToString';

function getStyle(theme) {
  return {
    container: {
      position: 'relative',
      flexBasis: '100%',
      border: '1px solid #eee',
      margin: '0 0 20px 0'
    },
    content: {
      background: `url(${theme.checkerboardPatternLight})`,
      borderRadius: '2px',
      border: 'none',
      boxSizing: 'border-box',
      display: 'block',
      padding: 20,
      position: 'relative',
      width: '100%'
    },
    code: {
      ...text(theme, {level: 3}),
      background: '#fff',
      borderTop: '1px solid #eee',
      boxSizing: 'border-box',
      color: theme.textColor,
      display: 'block',
      fontFamily: theme.fontMono,
      fontWeight: 400,
      height: 'auto',
      margin: 0,
      padding: 20,
      whiteSpace: 'pre-wrap',
      width: '100%',
      resize: 'vertical',
      ':focus': {
        outline: 'none',
        color: theme.brandColor
      }
    },
  };
}

class ReactSpecimen extends Component {
  render() {
    const {theme, children} = this.props;
    const styles = getStyle(theme);

    return (
      <section style={styles.container}>
        <div style={styles.content}>
          {children}
        </div>
        <pre style={styles.code}><code>{reactElementToString(children)}</code></pre>
      </section>
    );
  }
}

ReactSpecimen.propTypes = {
  theme: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired
};

export default Specimen(ReactSpecimen);
