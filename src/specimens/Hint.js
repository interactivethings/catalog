import React from 'react';
import {catalogShape} from '../CatalogPropTypes';
import PropTypes from 'prop-types';
import {Style} from 'radium';
import renderMarkdown from '../markdown/renderMarkdown';
import Specimen from '../components/Specimen/Specimen';
import {text, heading} from '../styles/typography';

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
    const mergedStyle = {...styles.hint, ...warningStyle, ...directiveStyle, ...neutralStyle, ...importantStyle};

    const markdownRenderer = {
      heading(textParts, level, raw) {
        const slug = this.slugger.slug(raw);
        return React.createElement('h' + level, {key: slug, id: slug, style: {...heading(theme, Math.max(0, 3 - level)), color: mergedStyle.color}}, textParts);
      }
    };

    return (
      <div style={styles.container}>
        <section style={mergedStyle} className='cg-Hint'>
          <Style
            scopeSelector='.cg-Hint'
            rules={{
              code: {
                display: 'inline-block',
                border: '1px solid rgba(0,0,0,.035)',
                borderRadius: 1,
                background: 'rgba(0,0,0,.03)',
                fontFamily: theme.fontMono,
                fontSize: `${Math.pow(theme.msRatio, -0.5)}em`,
                lineHeight: 1,
                padding: '0.12em 0.2em',
                textIndent: 0
              },
              ':first-child': {
                marginTop: 0
              },
              ':last-child': {
                marginBottom: 0
              },
              a: {
                color: mergedStyle.color
              }
            }}/>
            <div>
              {
                typeof children === 'string'
                ? renderMarkdown({text: children, renderer: markdownRenderer})
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
