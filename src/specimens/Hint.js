import React, { PropTypes } from 'react';
import { Style as RadiumStyle } from 'radium';
import MarkdownRenderer from '../utils/MarkdownRenderer';
import Specimen from '../components/Specimen/Specimen';
import {text} from '../scaffold/typography';

function getStyle(theme) {
  return {
    container: {
      ...text(theme, {level: 2}),
      fontFamily: theme.fontFamily,
      background: '#fff6dd',
      color: '#ffb400',
      flexBasis: '100%',
      border: '1px solid #ffefaa',
      padding: '10px 20px 8px',
      borderRadius: '2px',
      marginTop: 10,
      height: '100%'
    },
    neutral: {
      background: '#f9f9f9',
      color: '#999',
      border: '1px solid #eee',
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
    const {theme, body, ...options} = this.props;
    let styles = getStyle(theme);

    let warning = options.warning ? styles.warning : null;
    let directive = options.directive ? styles.directive : null;
    let neutral = options.neutral ? styles.neutral : null;

    return (
      <section style={{...styles.container, ...warning, ...directive, ...neutral}} className='cg-Hint'>
        <RadiumStyle
          scopeSelector='.cg-Hint'
          rules={{
            code: {
              display: 'inline',
              borderRadius: '2px',
              background: 'rgba(0,0,0,.03)',
              fontFamily: theme.fontMono,
              padding: '4px 5px',
              whiteSpace: 'pre-wrap'
            }
          }}/>
          <div>{MarkdownRenderer({text: body})}</div>
        </section>
      );
  }
}

Hint.propTypes = {
  body: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  warning: PropTypes.bool,
  directive: PropTypes.bool
};

export default Specimen(Hint);
