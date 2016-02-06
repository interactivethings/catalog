import React, { PropTypes } from 'react';
import {Style} from 'radium';
import renderMarkdown from '../utils/renderMarkdown';
import Specimen from '../components/Specimen/Specimen';
import {text} from '../styles/typography';

function getStyle(theme) {
  return {
    container: {
      ...text(theme),
      fontFamily: theme.fontFamily,
      background: '#fff6dd',
      color: '#ffb400',
      flexBasis: '100%',
      border: '1px solid #ffefaa',
      padding: '10px 20px 8px',
      borderRadius: '2px'
    },
    neutral: {
      background: '#f9f9f9',
      color: '#999',
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
    const {theme, children, warning, neutral, directive} = this.props;
    const styles = getStyle(theme);

    const warningStyle = warning ? styles.warning : null;
    const directiveStyle = directive ? styles.directive : null;
    const neutralStyle = neutral ? styles.neutral : null;

    return (
      <section style={{...styles.container, ...warningStyle, ...directiveStyle, ...neutralStyle}} className='cg-Hint'>
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
            }
          }}/>
          <div>{renderMarkdown({text: children})}</div>
        </section>
      );
  }
}

Hint.propTypes = {
  children: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  warning: PropTypes.bool,
  neutral: PropTypes.bool,
  directive: PropTypes.bool
};

export default Specimen()(Hint);
