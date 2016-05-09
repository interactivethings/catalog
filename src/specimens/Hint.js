import React, { PropTypes } from 'react';
import {catalogShape} from '../CatalogPropTypes';
import {Style} from 'radium';
import renderMarkdown from '../utils/renderMarkdown';
import Specimen from '../components/Specimen/Specimen';
import {text} from '../styles/typography';

function getStyle(theme) {
  return {
    container: {
      flexBasis: '100%'
    },
    hint: {
      ...text(theme),
      background: '#fff6dd',
      border: '1px solid #ffefaa',
      borderRadius: '2px',
      color: '#ffb400',
      padding: '20px'
    },
    neutral: {
      background: '#f9f9f9',
      color: '#666666',
      border: '1px solid #eee'
    },
    warning: {
      background: '#fff5f5',
      border: '1px solid #ffdddd',
      color: '#ee4040'
    },
    directive: {
      background: '#eafaea',
      border: '1px solid #bbebc8',
      color: '#2fbf62'
    }
  };
}

class Hint extends React.Component {
  render() {
    const {catalog: {theme}, children, warning, neutral, directive} = this.props;
    const styles = getStyle(theme);

    const warningStyle = warning ? styles.warning : null;
    const directiveStyle = directive ? styles.directive : null;
    const neutralStyle = neutral ? styles.neutral : null;

    return (
      <div style={styles.container}>
        <section style={{...styles.hint, ...warningStyle, ...directiveStyle, ...neutralStyle}} className='cg-Hint'>
          <Style
            scopeSelector='.cg-Hint'
            rules={{
              code: {
                display: 'inline',
                borderRadius: '2px',
                background: 'rgba(0,0,0,.03)',
                fontFamily: theme.fontMono,
                padding: '4px 5px',
                whiteSpace: 'pre-wrap'
              },
              ':first-child': {
                marginTop: 0
              },
              ':last-child': {
                marginBottom: 0
              }
            }}/>
            <div>{renderMarkdown({text: children})}</div>
          </section>
      </div>
      );
  }
}

Hint.propTypes = {
  children: PropTypes.string.isRequired,
  catalog: catalogShape.isRequired,
  warning: PropTypes.bool,
  neutral: PropTypes.bool,
  directive: PropTypes.bool
};

export default Specimen()(Hint);
