import React, {PropTypes, Component} from 'react';
import {catalogShape} from '../../CatalogPropTypes';
import Radium from 'radium';
import Frame from '../../components/Frame/Frame';
import Specimen from '../../components/Specimen/Specimen';
import HighlightedCode from '../../components/HighlightedCode/HighlightedCode';
import ResponsiveTabs from '../../components/ResponsiveTabs/ResponsiveTabs';
import Hint from '../../specimens/Hint';
import reactElementToString from './reactElementToString';
import transformJSX from '../../utils/transformJSX';
import validateSizes from '../../utils/validateSizes';

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
    }
  };
}

class ReactSpecimen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elementState: props.state,
      parentWidth: null,
      screenSize: validateSizes(props.responsive, props.catalog.devices)[0] || null
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
    const validSizes = validateSizes(options.responsive, devices);

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

    if (options.responsive && !validSizes) {
      return <Hint warning>Please check that the responsive parameters match an existing entry.</Hint>;
    }

    if (error) return error;

    return (
      <section style={styles.container} ref='specimen'>
        {device &&
          <ResponsiveTabs theme={theme} deviceList={validSizes} action={this.setSize} activeDevice={device} parentWidth={parentWidth}/>
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
