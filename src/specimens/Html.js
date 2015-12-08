import React, { PropTypes } from 'react';
import Radium from 'radium';
import Specimen from '../components/Specimen/Specimen';
import HighlightedCode from '../components/HighlightedCode/HighlightedCode';
import {text} from '../scaffold/typography';

const PADDING = 3;
const SIZE = 20;

function getStyle(theme) {
  return {
    container: {
      border: '1px solid #eee',
      borderRadius: '2px',
      boxSizing: 'border-box',
      position: 'relative',
      flexBasis: '100%'
    },
    toggle: {
      border: PADDING + 'px solid transparent',
      color: theme.lightColor,
      cursor: 'pointer',
      display: 'inline-block',
      fontFamily: theme.fontMono,
      fontSize: '16px',
      fontStyle: 'normal',
      fontWeight: 600,
      height: SIZE + 'px',
      lineHeight: SIZE + 'px',
      padding: PADDING + 'px',
      position: 'absolute',
      right: -PADDING + 'px',
      top: -(SIZE + 2 * PADDING) + 'px',
      userSelect: 'none',
      ':hover': {
        color: theme.textColor
      }
    },
    source: {
      borderTop: '1px solid #eee',
      boxSizing: 'border-box',
      width: '100%',
      height: 'auto'
    },
    content: {
      background: `url(${theme.checkerboardPatternLight})`,
      boxSizing: 'border-box',
      display: 'block',
      padding: 20,
      position: 'relative',
      width: '100%'
    },
    light: {
      background: `url(${theme.checkerboardPatternLight})`
    },
    dark: {
      background: `url(${theme.checkerboardPatternDark})`
    },
    plain: {
      background: 'transparent',
      padding: '0'
    },
    plain_light: {
      background: theme.bgLight,
      padding: '20px'
    },
    plain_dark: {
      background: theme.bgDark,
      padding: '20px'
    }
  };
}

class Html extends React.Component {
  constructor() {
    super();
    this.state = {
      viewSource: false
    };
  }

  render() {
    const {theme, text, ...options} = this.props;
    const styles = getStyle(theme);
    const exampleStyles = {
      ...(options.plain ? styles.plain : null),
      ...(options.light ? styles.light : null),
      ...(options.dark ? styles.dark : null),
      ...(options.plain && options.light ? styles.plain_light : null),
      ...(options.plain && options.dark ? styles.plain_dark : null)
    };

    let source = this.state.viewSource
      ? <div style={styles.source} ><HighlightedCode language='markup' code={text} theme={theme} /></div>
      : null;

    let toggle = !options.noSource
      ? <div style={styles.toggle} onClick={this.toggleSource.bind(this)}>&lt;&gt;</div>
      : null;

    return (
      <div style={styles.container} className='cg-Specimen-Html'>
        {toggle}
        <div style={{...styles.content, ...exampleStyles}} dangerouslySetInnerHTML={{__html: text}} />
        {source}
      </div>
    );
  }

  toggleSource() {
    this.setState({viewSource: !this.state.viewSource});
  }
}

Html.propTypes = {
  text: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  plain: PropTypes.bool,
  light: PropTypes.bool,
  dark: PropTypes.bool,
  noSource: PropTypes.bool
};

export default Specimen((_, raw) => ({text: raw}))(Radium(Html));
