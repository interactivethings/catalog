import React, {PropTypes} from 'react';
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
    hint: { // Contrast: AAA / AA
      ...text(theme),
      background: '#fff6dd',
      border: '1px solid #ffefaa',
      borderRadius: '2px',
      color: '#966900',
      padding: '20px'
    },
    neutral: { // Contrast: AAA / AA
      background: '#f9f9f9',
      color: '#666666',
      border: '1px solid #eee'
    },
    important: { // Contrast: AAA / AAA
      background: '#ffffff',
      color: '#333333',
      border: '1px solid #eee'
    },
    warning: { // Contrast: AAA / AA
      background: '#fff5f5',
      border: '1px solid #ffdddd',
      color: '#ce3737'
    },
    directive: { // Contrast: AAA / AA
      background: '#eafaea',
      border: '1px solid #bbebc8',
      color: '#1d7d3f'
    }
  };
}

class Hint extends React.Component {
  render() {
    const {catalog: {theme}, children, warning, neutral, important, directive} = this.props;
    const styles = getStyle(theme);

    const warningStyle = warning ? styles.warning : null;
    const directiveStyle = directive ? styles.directive : null;
    const neutralStyle = neutral ? styles.neutral : null;
    const importantStyle = important ? styles.important : null;

    return (
      <div style={styles.container}>
        <section style={{...styles.hint, ...warningStyle, ...directiveStyle, ...neutralStyle, ...importantStyle}} className='cg-Hint'>
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
            <div>
              {
                typeof children === 'string'
                ? renderMarkdown({text: children})
                : children
              }
            </div>
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

export default Specimen(undefined, undefined, {withChildren: true})(Hint);
