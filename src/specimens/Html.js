import React, {PropTypes} from 'react';
import {catalogShape} from '../CatalogPropTypes';
import Radium from 'radium';
import Frame from '../components/Frame/Frame';
import Hint from '../specimens/Hint';
import Specimen from '../components/Specimen/Specimen';
import HighlightedCode from '../components/HighlightedCode/HighlightedCode';
import ResponsiveTabs from '../components/ResponsiveTabs/ResponsiveTabs';
import runscript from '../utils/runscript';
import validateSizes from '../utils/validateSizes';

const PADDING = 3;
const SIZE = 20;

function getStyle(theme) {
  return {
    container: {
      border: '1px solid #eee',
      borderRadius: '2px',
      boxSizing: 'border-box',
      position: 'relative',
      flexBasis: '100%',
      marginTop: '40px',
      fontFamily: theme.fontFamily
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
    },
    responsive: {
      background: `url(${theme.checkerboardPatternLight})`,
      boxSizing: 'border-box',
      overflow: 'hidden',
      padding: '15px',
      textAlign: 'center'
    }
  };
}

class Html extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewSource: false,
      parentWidth: 0,
      screenSize: validateSizes(props.responsive, props.catalog.devices)[0] || null
    };
    this.setSize = this.setSize.bind(this);
    this.updateParentWidth = this.updateParentWidth.bind(this);
  }

  componentDidMount() {
    const {runScript} = this.props;
    runScript && Array.from(this.refs.specimen.querySelectorAll('script')).forEach(runscript);

    if (this.state.screenSize) {
      window.addEventListener('resize', this.updateParentWidth);
      setTimeout(this.updateParentWidth);
    }
  }

  componentWillUnmount() {
    if (this.state.screenSize) {
      window.removeEventListener('resize', this.updateParentWidth);
    }
  }

  setElementState(nextState) {
    if (typeof nextState === 'function') {
      this.setState(({elementState}) => ({elementState: {...elementState, ...nextState(elementState)}}));
    } else {
      this.setState({elementState: {...this.state.elementState, ...nextState}});
    }
  }

  updateParentWidth() {
    const nextParentWidth = this.refs.specimen.getBoundingClientRect().width - 30;
    if (nextParentWidth !== this.state.parentWidth) {
      this.setState({parentWidth: nextParentWidth});
    }
  }

  setSize(screenSize) {
    this.setState({screenSize: screenSize});
  }

  toggleSource() {
    this.setState(({viewSource}) => ({viewSource: !viewSource}));
  }

  render() {
    const {catalog: {theme, devices}, children, frame, ...options} = this.props;
    const {screenSize: device, parentWidth, viewSource} = this.state;
    const styles = getStyle(theme);
    const validSizes = validateSizes(options.responsive, devices);

    const exampleStyles = {
      ...(options.plain ? styles.plain : null),
      ...(options.light ? styles.light : null),
      ...(options.dark ? styles.dark : null),
      ...(options.plain && options.light ? styles.plain_light : null),
      ...(options.plain && options.dark ? styles.plain_dark : null),
      ...(options.responsive ? styles.responsive : null)
    };

    const source = viewSource
      ? <div style={styles.source} ><HighlightedCode language='markup' code={children} theme={theme} /></div>
      : null;

    const toggle = !options.noSource
      ? <div style={styles.toggle} onClick={this.toggleSource.bind(this)}>&lt;&gt;</div>
      : null;

    // eslint-disable-next-line
    const content = <div dangerouslySetInnerHTML={{__html: children}} />;

    if (options.responsive && !validSizes) {
      return <Hint warning>Please check that the responsive parameters match an existing entry.</Hint>;
    }

    return (
      <div ref='specimen' style={styles.container} className='cg-Specimen-Html'>
        {toggle}
        {device &&
          <ResponsiveTabs theme={theme} deviceList={validSizes} action={this.setSize} activeDevice={device} parentWidth={parentWidth}/>
        }
        <div style={{...styles.content, ...exampleStyles}}>
          {frame || device
            ? <Frame width={device && device.width} parentWidth={parentWidth ? parentWidth : '100%'} height={device && device.height}>
                {content}
              </Frame>
            : content
          }
        </div>
        {source}
      </div>
    );
  }
}

Html.propTypes = {
  children: PropTypes.string.isRequired,
  catalog: catalogShape.isRequired,
  responsive: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  runScript: PropTypes.bool,
  plain: PropTypes.bool,
  light: PropTypes.bool,
  dark: PropTypes.bool,
  noSource: PropTypes.bool,
  frame: PropTypes.bool
};

export default Specimen(undefined, undefined, {withChildren: true})(Radium(Html));
