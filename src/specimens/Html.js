import React, {PropTypes} from 'react';
import {catalogShape} from '../CatalogPropTypes';
import Radium from 'radium';
import Frame from '../components/Frame/Frame';
import Specimen from '../components/Specimen/Specimen';
import HighlightedCode from '../components/HighlightedCode/HighlightedCode';
import runscript from '../utils/runscript';

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
      fontWeight: 700,
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
      padding: 0
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

  componentDidMount() {
    const {runScript} = this.props;
    if (runScript) {
      Array.from(this.refs.specimen.querySelectorAll('script'))
        .forEach(runscript);
    }
  }

  toggleSource() {
    this.setState({viewSource: !this.state.viewSource});
  }

  render() {
    const {catalog: {theme}, children, frame, ...options} = this.props;
    const styles = getStyle(theme);
    const exampleStyles = {
      ...(options.plain ? styles.plain : null),
      ...(options.light ? styles.light : null),
      ...(options.dark ? styles.dark : null),
      ...(options.plain && options.light ? styles.plain_light : null),
      ...(options.plain && options.dark ? styles.plain_dark : null)
    };

    let source = this.state.viewSource
      ? <div style={styles.source} ><HighlightedCode language='markup' code={children} theme={theme} /></div>
      : null;

    let toggle = !options.noSource
      ? <div style={styles.toggle} onClick={this.toggleSource.bind(this)}>&lt;&gt;</div>
      : null;

    const content = <div dangerouslySetInnerHTML={{__html: children}} />; // eslint-disable-line react/no-danger

    return (
      <div ref='specimen' style={styles.container} className='cg-Specimen-Html'>
        {toggle}
        <div style={{...styles.content, ...exampleStyles}}>
          {frame ? <Frame>{content}</Frame> : content }
        </div>
        {source}
      </div>
    );
  }
}

Html.propTypes = {
  children: PropTypes.string.isRequired,
  catalog: catalogShape.isRequired,
  runScript: PropTypes.bool,
  plain: PropTypes.bool,
  light: PropTypes.bool,
  dark: PropTypes.bool,
  noSource: PropTypes.bool,
  frame: PropTypes.bool
};


export default Specimen(undefined, undefined, {withChildren: true})(Radium(Html));
