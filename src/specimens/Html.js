import React, {PropTypes} from 'react';
import {catalogShape} from '../CatalogPropTypes';
import Radium from 'radium';
import Frame from '../components/Frame/Frame';
import Hint from '../specimens/Hint';
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
    device: {
      background: `url(${theme.checkerboardPatternLight})`,
      boxSizing: 'border-box',
      overflow: 'hidden',
      padding: '15px',
      textAlign: 'center'
    },
    tabContainer: {
      alignItems: 'center',
      background: 'white',
      borderBottom: `1px solid #eee`,
      display: 'flex',
      overflowX: 'scroll',
      width: '100%'
    },
    tab: {
      boxSizing: 'border-box',
      alignItems: 'center',
      background: '#eee',
      color: theme.bgDark,
      cursor: 'pointer',
      display: 'flex',
      flexGrow: 1,
      opacity: 0.3,
      padding: '12px',
      transitionDuration: '.2s, .4s',
      transitionProperty: 'width, background-color, border, opacity',
      ':hover': {
        color: 'red'
      }
    },
    tabActive: {
      background: 'white',
      color: theme.textColor,
      cursor: 'auto',
      flexGrow: 2,
      opacity: 1
    },
    tabDimension: {
      color: theme.bgDark,
      display: 'inline',
      fontFamily: theme.fontMono,
      marginLeft: 5,
      opacity: 0.3
    }
  };
}

/**
 * Generates a small preview to show the aspect ratio
 */
const Preview = ({proportion}) => {
  if ( !proportion ) null;  return (
    <div style={{width: '30px', height: '30px', display: 'inline-block', marginRight: 5}}>
      <svg viewBox={`0 0 2 2`}>
        <rect style={{fill: '#ccc'}} width={proportion} height={1} x={(2 - proportion) * 0.5} y='0.5'/>
      </svg>
    </div>);
};


/**
 * Checks if the delivered props are valid, returns false if not, otherwise a filtered Array
 */
const validateDevices = (input, catalogDevices) => {
  const isArray = Array.isArray(input);
  if (input === true) {
    return catalogDevices;
  } else if (typeof input === 'string') {
    const foundInList = catalogDevices.find(val => input === val.name);
    return foundInList ? [].concat(foundInList) : false;
  } else if (isArray && input.length === input.filter((item=> typeof item === 'string')).length) {
    const filtered = catalogDevices.filter( val => {
      return input.find( d=> d === val.name);
    });
    return filtered.length === input.length ? filtered : false;
  }
  return false;
};


const ResponsiveTabs = ( {deviceList, action, activeDevice, styles, parentWidth} ) => {
  return (<div style={styles.tabContainer}>
    {deviceList.map((val, i)=>{
      const isTabActive = activeDevice.name === val.name;
      const activeStyles = isTabActive && styles.tabActive;
      return (<div key={i} style={{...styles.tab, ...activeStyles}} onClick={action.bind(this, val)}>
        <Preview proportion={val.width / val.height}/>
        {val.name}{isTabActive &&
          <div style={styles.tabDimension}>
            {activeDevice.width}×{activeDevice.height}
            {isTabActive && parentWidth <= val.width && ', scaled'}
          </div>}
      </div>);
    })}
  </div>);
};

class Html extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewSource: false,
      parentWidth: 0,
      screenSize: validateDevices(props.responsive, props.catalog.devices)[0] || null
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
    const validDevices = validateDevices(options.responsive, devices);

    // const deviceFoundInList = devices.find(sc=>sc.name === device) !== undefined;

    const exampleStyles = {
      ...(options.plain ? styles.plain : null),
      ...(options.light ? styles.light : null),
      ...(options.dark ? styles.dark : null),
      ...(options.plain && options.light ? styles.plain_light : null),
      ...(options.plain && options.dark ? styles.plain_dark : null),
      ...(options.responsive ? styles.device : null)
    };

    const source = viewSource
      ? <div style={styles.source} ><HighlightedCode language='markup' code={children} theme={theme} /></div>
      : null;

    const toggle = !options.noSource
      ? <div style={styles.toggle} onClick={this.toggleSource.bind(this)}>&lt;&gt;</div>
      : null;

    // eslint-disable-next-line
    const content = <div dangerouslySetInnerHTML={{__html: children}} />;

    if (options.responsive && !validDevices) {
      return <Hint warning>Please check that the responsive parameters match an existing entry.</Hint>;
    }

    return (
      <div ref='specimen' style={styles.container} className='cg-Specimen-Html'>
        {toggle}
        {device &&
          <ResponsiveTabs styles={styles} deviceList={validDevices} action={this.setSize} activeDevice={device} parentWidth={parentWidth}/>
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

Preview.propTypes = {
  proportion: PropTypes.number.isRequired
};
ResponsiveTabs.propTypes = {
  deviceList: PropTypes.array,
  action: PropTypes.func,
  activeDevice: PropTypes.object,
  styles: PropTypes.object,
  parentWidth: PropTypes.number
};

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
