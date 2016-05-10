import React, { PropTypes, Component } from 'react';
import CatalogPropTypes from '../../CatalogPropTypes';
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
      position: 'relative',
      width: '100%',
      border: '1px solid #eee',
      margin: '0 0 20px 0'
    },
    content: {
      background: `url(${theme.checkerboardPatternLight})`,
      borderRadius: '2px',
      border: 'none',
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


class ReactSpecimen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elementState: props.state
    };
    this.setElementState = this.setElementState.bind(this);
  }

  setElementState(nextState) {
    if (typeof nextState === 'function') {
      this.setState(({elementState}) => ({elementState: {...elementState, ...nextState(elementState)}}));
    } else {
      this.setState({elementState: {...this.state.elementState, ...nextState}});
    }
  }

  render() {
    const {theme, children, noSource, frame, ...options} = this.props;
    const {page: {imports}} = this.context;
    const styles = getStyle(theme);

    const exampleStyles = {
      ...(options.plain ? styles.plain : null),
      ...(options.light ? styles.light : null),
      ...(options.dark ? styles.dark : null),
      ...(options.plain && options.light ? styles.plain_light : null),
      ...(options.plain && options.dark ? styles.plain_dark : null)
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

    return (
      <section style={styles.container}>
        <div style={{...styles.content, ...exampleStyles}}>
          {error}
          {!error && frame ? <Frame>{element}</Frame> : element }
        </div>
        {!noSource && <HighlightedCode language='jsx' code={code} theme={theme} />}
      </section>
    );
  }
}

ReactSpecimen.propTypes = {
  theme: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  noSource: PropTypes.bool,
  plain: PropTypes.bool,
  light: PropTypes.bool,
  dark: PropTypes.bool,
  frame: PropTypes.bool,
  state: PropTypes.object
};

ReactSpecimen.contextTypes = {
  page: CatalogPropTypes.page.isRequired
};

export default Specimen(undefined, undefined, {withChildren: true})(Radium(ReactSpecimen));
