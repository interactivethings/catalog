import React, {PropTypes, Component} from 'react';
import {catalogShape} from '../../CatalogPropTypes';
import Radium from 'radium';
import Frame from '../../components/Frame/Frame';
import Specimen from '../../components/Specimen/Specimen';
import HighlightedCode from '../../components/HighlightedCode/HighlightedCode';
import Hint from '../../specimens/Hint';
import reactElementToString from './reactElementToString';
import transformJSX from '../../utils/transformJSX';

function getStyle(theme) {
  return {
    container: {
      border: '1px solid #eee',
      boxSizing: 'border-box',
      fontFamily: theme.fontFamily,
      margin: '0 0 20px 0',
      position: 'relative',
      width: '100%'
    },
    content: {
      background: `url(${theme.checkerboardPatternLight})`,
      border: 'none',
      borderRadius: '2px',
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

class ReactSpecimen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elementState: props.state,
      parentWidth: null,
      screenSize: validateDevices(props.responsive, props.catalog.devices)[0] || null
    };
    this.setElementState = this.setElementState.bind(this);
    this.setSize = this.setSize.bind(this);
    this.updateParentWidth = this.updateParentWidth.bind(this);
  }

  componentDidMount() {
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

  render() {
    const {catalog: {page: {imports}, theme, devices}, children, noSource, frame, ...options} = this.props;
    const {screenSize: device, parentWidth} = this.state;
    const styles = getStyle(theme);
    const validDevices = validateDevices(options.responsive, devices);

    const exampleStyles = {
      ...(options.plain ? styles.plain : null),
      ...(options.light ? styles.light : null),
      ...(options.dark ? styles.dark : null),
      ...(options.plain && options.light ? styles.plain_light : null),
      ...(options.plain && options.dark ? styles.plain_dark : null),
      ...(options.responsive ? styles.device : null)
    };

    const jsx = typeof children === 'string';
    let element = null;
    let error = null;
    let code = '';

    if (jsx) {
      const transformed = transformJSX(children, {
        ...imports,
        state: this.state.elementState,
        setState: this.setElementState
      });
      element = transformed.element;
      error = transformed.error ? <Hint warning>{`Couldn't render specimen: ${transformed.error}`}</Hint> : null;
      code = children;
    } else {
      element = children;
      code = reactElementToString(children);
    }

    if (options.responsive && !validDevices) {
      return <Hint warning>Please check that the responsive parameters match an existing entry.</Hint>;
    }

    if (error) return error;

    return (
      <section style={styles.container} ref='specimen'>
        {device &&
          <ResponsiveTabs styles={styles} deviceList={validDevices} action={this.setSize} activeDevice={device} parentWidth={parentWidth}/>
        }
        <div style={{...styles.content, ...exampleStyles}}>
          {frame || device
            ? <Frame width={device && device.width} parentWidth={parentWidth ? parentWidth : '100%'} height={device && device.height}>
                {element}
              </Frame>
            : element }
        </div>
        {!noSource && <HighlightedCode language='jsx' code={code} theme={theme} />}
      </section>
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
ReactSpecimen.propTypes = {
  catalog: catalogShape.isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  responsive: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  noSource: PropTypes.bool,
  plain: PropTypes.bool,
  light: PropTypes.bool,
  dark: PropTypes.bool,
  frame: PropTypes.bool,
  state: PropTypes.object
};

export default Specimen(undefined, undefined, {withChildren: true})(Radium(ReactSpecimen));
